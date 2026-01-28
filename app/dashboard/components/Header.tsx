"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import { API_URL } from "@/app/lib/config";

export default function Header({ user }: { user: string }) {
  //const [greeting, setGreeting] = useState("");
  const router = useRouter();
  //const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) setGreeting("Good Morning");
  //   else if (hour < 18) setGreeting("Good Afternoon");
  //   else setGreeting("Good Evening");
  // }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  // Close mobile menu when route changes
  // useEffect(() => {
  //   if (mobileOpen) {
  //     setMobileOpen(false);
  //   }
  // }, [pathname, mobileOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <>
      <header className="flex items-center justify-between bg-white shadow-md p-4 md:p-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XMarkIcon className="w-6" />
            ) : (
              <Bars3Icon className="w-6" />
            )}
          </button>

          <Link
            href="/"
            className="text-green-600 hover:underline"
            title="Back Home"
          >
            <HomeIcon className="w-6" />
          </Link>

          <h1 className="text-lg font-semibold hidden sm:block">
            {greeting}, {user}!
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <Image
            src="/placeholder.png"
            width={0}
            height={0}
            alt="User Profile"
            className="w-10 h-10 rounded-full border"
          />
          <form onSubmit={handleLogOut}>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-[70] sm:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed top-16 left-0 right-0 bg-white z-[70] p-4 shadow sm:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.png"
                  width={0}
                  height={0}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-medium">{user}</p>
                  <p className="text-sm text-gray-500">{greeting}</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogOut();
                  setMobileOpen(false);
                }}
              >
                <button className="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-red-600">
                  Logout
                </button>
              </form>
            </div>

            <div className="mt-4">
              <NavLinks showTextMobile />
            </div>
          </div>
        </>
      )}
    </>
  );
}
