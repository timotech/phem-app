"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/app/lib/courseData";

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <div className="flex-1">
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No courses found</p>
          <p className="text-gray-400">
            Try adjusting your filters to see more courses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Grid Header */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600 font-medium">
          Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
        </p>
        <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="relevance">Sort by: Relevance</option>
          <option value="popular">Most Popular</option>
          <option value="rated">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/home/courses/${course.id}`}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300">
              {/* Course Image */}
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Course Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-3">
                  {course.instructor}
                </p>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-semibold text-gray-900">
                      4.8
                    </span>
                    <span className="text-sm text-gray-500">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {course.description}
                </p>

                {/* Level Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full capitalize">
                    {course.level}
                  </span>
                </div>

                {/* Price */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-lg font-bold text-gray-900">Free</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination or Load More */}
      {courses.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
