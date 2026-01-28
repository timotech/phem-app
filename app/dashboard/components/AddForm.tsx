"use client"; // Add this directive since we're using client-side features

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import Image from "next/image";
import DataTable from "./DataTable";
import type { Column } from "./DataTable";
import Link from "next/link";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { API_URL } from "@/app/lib/config";

type Dimension = {
  width: number;
  height: number;
};

type AdminItem = {
  _id: string;
  slug: string;
  name: string;
  title: string;
  content?: string;
  imageUrl: string;
  action: string;
};

export default function AddForm({
  pageName,
  url,
}: {
  pageName: string;
  url: string;
}) {
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // State for the uploaded image
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [admins, setAdmins] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchAdmins() {
      try {
        setIsLoading2(true);
        const response = await fetch(`${url}`);
        const data = await response.json();
        setAdmins(data);
        console.log("Fetched data: ", data);
        setIsLoading2(false);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      } finally {
        setIsLoading2(false);
      }
    }

    fetchAdmins();
  }, [url]);

  const columns: Column<AdminItem>[] = [
    { key: "slug", header: "Admin Category" },
    { key: "name", header: "Name" },
    { key: "title", header: "Title" },
    {
      key: "content",
      header: "Description",
      render: (item) => {
        const content = item.content || ""; // Handle undefined/null
        return content.length > 100
          ? `${content.substring(0, 100)}...`
          : content;
      },
    },
    {
      key: "imageUrl",
      header: "Profile Picture",
      render: (item) => (
        <div className="relative h-12 w-12">
          <Image
            src={item.imageUrl}
            alt="Item image"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    // {
    //   key: "createdAt",
    //   header: "Date Added",
    //   render: (admin) => new Date(admin.createdAt).toLocaleDateString(),
    // },
    {
      key: "action",
      header: "Action",
      render: (admin) => (
        <div className="flex gap-2">
          <Link href={`/dashboard/administration/${pageName}/${admin._id}`}>
            <EditButton />
          </Link>
          <DeleteButton id={admin._id} apiName={"admin"} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(URL.createObjectURL(profilePicture));
      }
    };
  }, [profilePicture]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    let imageUrl = null;

    // Upload image if it exists
    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      try {
        const uploadResponse = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      } catch (error) {
        setIsLoading(false);
        console.error("Image upload failed:", error);
        return;
      }
    }

    const body = {
      slug: pageName,
      name,
      title,
      content: description,
      imageUrl, // Use the uploaded URL
    };

    try {
      const response = await fetch(`${API_URL}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setIsLoading(false);

      if (response.ok) {
        router.refresh();
        //router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to save page:", error);
    }
  };

  // Handle image upload
  const getImageDimensions = (
    file: File,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dimensions = await getImageDimensions(file);
      setProfilePicture(file);
      setDimensions(dimensions);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-10">
      <h2 className="text-3xl font-bold text-center text-green-600">
        {pageName}
      </h2>
      <form
        className="flex flex-col space-y-4 border border-slate-200 p-10"
        onSubmit={handleSubmit}
      >
        {/* Name Input */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Name"
          required
        />

        {/* Title Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Title"
          required
        />

        {/* Tiptap Rich Text Editor for Description */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Description</label>
          <RichTextEditor
            content={description}
            onChange={(html) => setDescription(html)}
            editable={true}
          />
        </div>

        {/* Image Upload for Profile Picture */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-slate-500 px-8 py-2"
            required
          />
          {profilePicture && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Selected file: {profilePicture.name}
              </p>
              <Image
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Preview"
                width={dimensions.width || 200}
                height={dimensions.height || 200}
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit hover:cursor-pointer hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : pageName}
        </button>
        {isLoading && <div className="loader"></div>}
      </form>

      <div className="p-6 mt-5">
        <h1 className="text-2xl font-bold mb-6">All {pageName}</h1>
        {isLoading2 && <div className="loader"></div>}
        <DataTable
          data={admins}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No administrator found"
        />
      </div>
    </div>
  );
}
