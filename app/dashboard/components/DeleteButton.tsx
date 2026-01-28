// components/DeleteButton.js
"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/lib/config";

interface DeleteButtonProps {
  id: string | number;
  apiName: string;
}

export default function DeleteButton({ id, apiName }: DeleteButtonProps) {
  const router = useRouter();

  const removeMenu = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`${API_URL}/${apiName}?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        router.push("/dashboard");
      }
    }
  };

  return (
    <button
      onClick={removeMenu}
      style={{ color: "#ff4d4d", marginLeft: "10px", cursor: "pointer" }}
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
}
