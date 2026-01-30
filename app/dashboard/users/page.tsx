"use client";

import { useState } from "react";
import Link from "next/link";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { API_URL } from "@/app/lib/config";

interface User {
  _id: string;
  username: string;
}

interface Role {
  _id: string;
  rolename: string;
}

interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  roleId: string; // Store as string initially
}

export default function Page() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    roleId: "",
  });

  const {
    data: roles = [],
    isLoading: rolesLoading,
    error: rolesError,
  } = useSWR<Role[]>(`${API_URL}/auth/roles`, fetcher);

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
    mutate: mutateUsers,
  } = useSWR<User[]>(`${API_URL}/auth/users`, fetcher);

  if (usersLoading || rolesLoading) {
    return <p className="text-sm text-gray-500">Loading data...</p>;
  }

  if (usersError || rolesError) {
    return <p className="text-sm text-red-500">Failed to load data</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        setFormError("Passwords do not match");
        return;
      }

      if (!formData.roleId) {
        alert("Please select a role");
        setIsLoading(false);
        return;
      }

      const userData = {
        ...formData,
        email: formData.username.trim(),
        // roleId is already a string from the form
      };

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          roleId: "",
        });
        mutateUsers(); // Refresh the users list
        setIsLoading(false);
      } else {
        setFormError(data.error as string);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setFormError(
        "Error adding user: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-green-600">Users</h2>
      <p className="mt-2 text-gray-600">
        This is the users page. You can manage users here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* LEFT — Add Role Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            Add New User
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="bg-red-500 text-white p-2 rounded">
                {formError}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Confirm Password
              </label>
              <input
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your password again"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="roleId" className="block mb-2">
                Role Access
              </label>
              <select
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                className="w-full border border-gray-400 p-3 bg-white rounded-lg text-gray-800"
                required
                disabled={roles.length === 0}
              >
                <option value="">Select Role...</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.rolename}
                  </option>
                ))}
              </select>
              {roles.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Loading roles...</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition cursor-pointer"
            >
              {isLoading ? "Adding User..." : "Add User"}
            </button>

            {isLoading && <div className="loader mt-3"></div>}
          </form>
        </div>

        {/* RIGHT — Roles Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-500 mb-4">
            Users Overview
          </h3>

          {usersLoading && <div className="loader"></div>}

          <div className="space-y-4">
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <strong className="text-green-700">{user.username}</strong>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/users/${user._id}`}>
                      <EditButton />
                    </Link>
                    <DeleteButton id={user._id} apiName="users" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No users yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
