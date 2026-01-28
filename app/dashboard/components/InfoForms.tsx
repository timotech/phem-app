"use client"; // Add this directive since we're using client-side features

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";
import DataTable from "./DataTable";
import Link from "next/link";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import type { Column } from "./DataTable";
import { API_URL } from "@/app/lib/config";

interface InfoProps {
  pageName: string;
  url: string;
  id: string | null;
}

type Dimensions = {
  width: number;
  height: number;
};

type AdminItem = {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  action: string | null;
};

export default function InfoForms({ pageName, url, id }: InfoProps) {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 3).join("/");
  const apiName = url.split("/").filter(Boolean).pop() ?? "";

  useEffect(() => {
    if (!id) return;

    const fetchSpecificData = async () => {
      setIsLoading(true);
      const res = await fetch(`${url}/${id}`);

      if (!res.ok) {
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      if (data) {
        setTitle(data.title);
        setProfilePicture(data.imageSrc);
        setDescription(data.description);
        setIsLoading(false);
      }
    };

    fetchSpecificData();
  }, [url, id]);

  // Define fetchAdmins at component level
  const fetchAdmins = useCallback(async () => {
    try {
      setIsLoading2(true);
      const response = await fetch(url);
      const data = await response.json();
      setAdmins(data);
      setIsLoading2(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading2(false);
    }
  }, [url]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!description) {
      setIsLoading(false);
      return;
    }

    let imageUrl = null;

    // Upload image if it exists
    if (profilePicture instanceof File) {
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
    } else if (typeof profilePicture === "string") {
      imageUrl = profilePicture;
    }

    try {
      const method = id ? "PUT" : "POST";
      const requestUrl = id ? `${url}/${id}` : `${url}`;
      const href =
        apiName == "about"
          ? "/home/services"
          : apiName == "utils" && title.toLowerCase() == "about our company"
            ? "/home/about"
            : apiName == "utils" && title.toLowerCase() == "our services"
              ? "/home/services"
              : apiName == "utils" && title.toLowerCase() == "our products"
                ? "/home/products"
                : "/home/contact";

      console.log("apiName: ", apiName);
      console.log("title: ", title.toLowerCase());
      console.log("href: ", href);

      const res = await fetch(requestUrl, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          imageSrc: imageUrl,
          description,
          title,
          href: href,
        }),
      });

      if (res.ok) {
        setProfilePicture(null);
        setObjectUrl(null);
        setDimensions({ width: 0, height: 0 });
        setTitle("");
        setDescription("");
        setIsLoading(false);
        await fetchAdmins(); // Refresh the data after submission
        router.replace(basePath);
      } else {
        setIsLoading(false);
        throw new Error("Unable to save data");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (profilePicture && typeof profilePicture !== "string") {
      const url = URL.createObjectURL(profilePicture);
      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    }
  }, [profilePicture]);

  // Utility function to get image dimensions
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

  // Handler for file input change
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous object URL if exists
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      const newUrl = URL.createObjectURL(file);
      setObjectUrl(newUrl);
      const dimensions = await getImageDimensions(file);
      setProfilePicture(file);
      setDimensions(dimensions);
    }
  };

  const columns: Column<AdminItem>[] = [
    { key: "title", header: "Title" },
    {
      key: "description",
      header: "Description",
      render: (item) => {
        const content = item.description || ""; // Handle undefined/null
        return content.length > 100
          ? `${content.substring(0, 100)}...`
          : content;
      },
    },
    {
      key: "imageSrc",
      header: "Profile Picture",
      render: (item) => (
        <div className="relative h-12 w-12">
          <Image
            src={item.imageSrc}
            alt="Item image"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (admin) => (
        <div className="flex gap-2">
          <Link href={`${basePath}/${admin._id}`}>
            <EditButton />
          </Link>
          <DeleteButton id={admin._id} apiName={apiName} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-4 mt-7">
      <h2 className="text-3xl font-bold text-center text-green-600">
        {pageName}
      </h2>
      <form
        className="flex flex-col space-y-4 border border-slate-200 p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Section Title</label>
          {/* Title Input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Title"
            required
          />
        </div>

        {/* Tiptap Rich Text Editor for Description */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Section Information</label>
          <RichTextEditor
            content={description}
            onChange={(html) => setDescription(html)}
            editable={true}
          />
        </div>

        {/* Image Upload for Profile Picture */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Section Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-slate-500 px-8 py-2"
            required={id == null}
          />
          {profilePicture && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Selected file: {profilePicture.name || "Current Image"}
              </p>
              <Image
                src={
                  typeof profilePicture === "string"
                    ? profilePicture
                    : objectUrl || "" // fallback to empty string if not ready
                }
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
        <h1 className="text-2xl font-bold mb-6">All Records</h1>
        {isLoading2 && <div className="loader"></div>}
        <DataTable
          data={admins}
          columns={columns}
          isLoading={isLoading2}
          emptyMessage="No data yet"
        />
      </div>
    </div>
  );
}
