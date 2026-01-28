"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { API_URL } from "../lib/config";

export default function LowerNav() {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${API_URL}/auth/me`);
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    }
    loadUser();
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
      router.push("/");
      router.refresh();
      setUser(null);
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <>
      <nav className="w-full bg-green-900 px-12 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div>
            <Link href="/" className="mx-2 text-white hover:underline">
              Home
            </Link>
            <Link
              href="/home/about"
              className="mx-2 text-white hover:underline"
            >
              About
            </Link>
            <Link
              href="/home/courses"
              className="mx-2 text-white hover:underline"
            >
              Courses
            </Link>
            <Link
              href="/home/contact"
              className="mx-2 text-white hover:underline"
            >
              Contact
            </Link>
            {user && (
              <Link
                href="/home/mycourses"
                className="mx-2 text-white hover:underline"
              >
                My Learning
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />

            {!user ? (
              <>
                {/* Login and Sign Up Buttons */}
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-white hover:underline font-medium transition cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-white text-green-900 rounded-lg hover:bg-gray-100 transition whitespace-nowrap cursor-pointer font-bold"
                >
                  Sign Up
                </Link>

                {/* Language Selector */}
                <div className="relative group">
                  <button className="text-white hover:text-gray-200 text-lg whitespace-nowrap cursor-pointer">
                    🌐 {selectedLanguage}
                  </button>
                  <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg py-2 z-50 w-48">
                    <button
                      onClick={() => setSelectedLanguage("EN")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      English
                    </button>
                    <button
                      onClick={() => setSelectedLanguage("FR")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Yoruba
                    </button>
                    <button
                      onClick={() => setSelectedLanguage("ES")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Hausa
                    </button>
                    <button
                      onClick={() => setSelectedLanguage("ES")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Igbo
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Notification Bell */}
                <button className="text-white hover:text-gray-200 text-2xl relative">
                  🔔
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <button className="w-10 h-10 rounded-full bg-green-100 text-green-900 font-bold flex items-center justify-center hover:bg-green-200 transition">
                    TA
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                      <a
                        href="/home/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                      >
                        👤 Profile
                      </a>
                      <a
                        href="/home/mycourses"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                      >
                        📚 My Learning
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                      >
                        ⚙️ Settings
                      </a>
                      <hr className="my-2" />
                      <button
                        onClick={() => handleLogOut()}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
