"use client";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
import { API_URL } from "@/app/lib/config";

export default function SideNav() {
  const router = useRouter();

  const handleLogOut = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      router.replace("/");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div className="hidden sm:flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Image
            src="/logo.jpg"
            alt="Logo"
            className="mr-3"
            width={302}
            height={97}
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form onSubmit={handleLogOut}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block cursor-pointer">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
