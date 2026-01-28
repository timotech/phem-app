"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { API_URL } from "@/app/lib/config";

type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/auth/users`);
        if (!response.ok) {
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        if (data) {
          setUsers(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error Occured while fetching Users: ", error);
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="mt-4">
      <div className="flex flex-col space-y-4 mt-4">
        {isLoading && <div className="loader"></div>}
        {users &&
          users.map((user, index) => (
            <div key={index} className="flex justify-between">
              <strong className="text-green-600">{user.username}</strong>
              <div className="flex gap-2">
                <Link href={`/dashboard/users/${user._id}`}>
                  <EditButton />
                </Link>
                <DeleteButton id={user._id} apiName={"users"} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
