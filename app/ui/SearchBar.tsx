"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ className }: { className?: string }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    // Navigate to courses page with query param
    router.push(
      trimmed ? `/courses?q=${encodeURIComponent(trimmed)}` : `/courses`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-md ${className ?? ""}`}
    >
      {/* Input with icon inside */}
      <div className="relative flex-grow">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-900" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 bg-white text-green-900 font-bold placeholder-green-900 border border-gray-300 focus:border-green-700 
                     rounded-l-md focus:outline-none"
        />
      </div>

      {/* Go button, perfectly fused */}
      <button
        type="submit"
        className="bg-green-700 text-white font-bold px-5 rounded-r-md hover:bg-gray-100 transition"
        aria-label="Search"
      >
        Go
      </button>
    </form>
  );
}
