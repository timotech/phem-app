"use client";
import { useState } from "react";
import Link from "next/link";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

interface Role {
  _id: string;
  rolename: string;
}

export default function RolesPage() {
  const [rolename, setRolename] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [roles, setRoles] = useState<Array<{ _id: string; rolename: string }>>(
  //   [],
  // );

  const {
    data: roles = [],
    error,
    isLoading,
    mutate,
  } = useSWR<Role[]>("/api/auth/roles", fetcher);

  if (isLoading && roles.length === 0) {
    return <p className="text-sm text-gray-500">Loading roles...</p>;
  }

  if (error && roles.length === 0) {
    return (
      <p className="text-sm text-red-500">
        Error fetching roles: {error.message}
      </p>
    );
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setFormError(null);

    try {
      const res = await fetch("/api/auth/roles", {
        method: "POST",
        body: JSON.stringify({ rolename, description }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setRolename("");
        setDescription("");
        mutate(); // Refresh the roles list
      } else {
        setFormError(data.error as string);
      }
    } catch (err) {
      setFormError(
        "Error logging in: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  };

  return (
    <div className="mt-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-600">Roles Management</h2>

      <p className="mt-2 text-gray-700">
        Manage user roles and permissions within the admin dashboard.
      </p>

      {/* GRID: Form (left) and Roles list (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* LEFT — Add Role Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            Add New Role
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="bg-red-500 text-white p-2 rounded">
                {formError}
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Role Name</label>
              <input
                value={rolename}
                onChange={(e) => setRolename(e.target.value)}
                type="text"
                placeholder="Enter role name"
                className="w-full border border-gray-400 px-3 py-2 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter role description"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition cursor-pointer"
            >
              {isLoading ? "Adding Role..." : "Add Role"}
            </button>

            {isLoading && <div className="loader mt-3"></div>}
          </form>
        </div>

        {/* RIGHT — Roles Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            Roles Overview
          </h3>

          {isLoading && <div className="loader"></div>}

          <div className="space-y-4">
            {roles && roles.length > 0 ? (
              roles.map((role, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <strong className="text-green-700">{role.rolename}</strong>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/roles/${role._id}`}>
                      <EditButton />
                    </Link>
                    <DeleteButton id={role._id} apiName="roles" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No roles added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
