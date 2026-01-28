"use client";

import { useState } from "react";
import Courses from "@/app/ui/Courses";

const COURSES_PER_PAGE = 10;

export default function CoursesPage() {
  const [displayedCourses, setDisplayedCourses] = useState(COURSES_PER_PAGE);

  const handleViewMore = () => {
    setDisplayedCourses((prev) => prev + COURSES_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Explore Courses
          </h1>
          <p className="text-lg text-slate-600">
            Discover and learn from our collection of courses
          </p>
        </div>

        <Courses limit={displayedCourses} />

        <div className="flex justify-center mt-12">
          <button
            onClick={handleViewMore}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            View More Courses
          </button>
        </div>
      </div>
    </div>
  );
}
