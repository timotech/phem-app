"use client"; // Add this directive since we're using client-side features

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import DataTable from "./DataTable";
import type { Column } from "./DataTable";
import Link from "next/link";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { API_URL } from "@/app/lib/config";

interface InfoProps {
  pageName: string;
  url: string;
  id?: string | null; // Optional id prop for editing existing items
}

type AdminItem = {
  _id: string;
  title: string;
  imageSrc: string;
  createdAt: Date;
  updatedAt: Date;
  action: string;
};

// type Column<T> = {
//   key: keyof T | string;
//   header: string;
//   render?: (item: T) => React.ReactNode;
// };

export default function Gallery({ pageName, url, id }: InfoProps) {
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // State for the uploaded image
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [allData, setAllData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 3).join("/");
  const apiName = pathname.split("/").filter(Boolean).pop() ?? "";

  const fetchPageData = useCallback(async () => {
    setIsLoading2(true);
    const res = await fetch(url);

    if (!res.ok) {
      setIsLoading2(false);
      return;
    }

    const data = await res.json();
    if (data) {
      setAllData(data);
      setIsLoading2(false);
    }
  }, [url]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

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
        setIsLoading(false);
      }
    };

    fetchSpecificData();
  }, [url, id]);

  useEffect(() => {
    if (profilePicture && typeof profilePicture !== "string") {
      const url2 = URL.createObjectURL(profilePicture);
      setObjectUrl(url2);

      return () => {
        URL.revokeObjectURL(url2);
        setObjectUrl(null);
      };
    }
  }, [profilePicture]);

  const columns: Column<AdminItem>[] = [
    { key: "title", header: "Title" },
    {
      key: "imageSrc",
      header: "Image",
      render: (item) => (
        <div className="relative h-12 w-12">
          <Image
            src={item.imageSrc || "/placeholder.png"}
            alt="Item image"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Date Added",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "action",
      header: "Action",
      render: (item) => (
        <div className="flex gap-2">
          <Link href={`${basePath}/${item._id}`}>
            <EditButton />
          </Link>
          <DeleteButton id={item._id} apiName={apiName} />
        </div>
      ),
    },
  ];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !profilePicture) {
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

      const res = await fetch(requestUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageSrc: imageUrl,
          title,
        }),
      });

      if (res.ok) {
        setTitle("");
        setProfilePicture(null);
        setIsLoading(false);
        await fetchPageData();
        const basePath = pathname.split("/").slice(0, 3).join("/");
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

  // Handle image upload
  const getImageDimensions = (
    file: File,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new window.Image(); // Use window.Image instead
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

  return (
    <div className="flex flex-col space-y-4 mt-10">
      <h2 className="text-3xl font-bold text-center text-green-600">
        {pageName}
      </h2>
      <form
        className="flex flex-col space-y-4 border border-slate-200 p-10"
        onSubmit={handleSubmit}
      >
        {/* Title Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Title"
          required
        />

        {/* Image Upload for Picture */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-slate-500 px-8 py-2"
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
        <h1 className="text-2xl font-bold mb-6">All Items</h1>
        {isLoading2 && <div className="loader"></div>}
        <DataTable
          data={allData}
          columns={columns}
          isLoading={isLoading}
          emptyMessage={"No Item"}
        />
      </div>
    </div>
  );
}
