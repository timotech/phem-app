"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlayCircle,
  Clock,
  CheckCircle,
  Star,
  ChevronRight,
  Menu,
  Grid,
} from "lucide-react";

interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  progressPercentage: number;
}

interface SubscribedCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "beginner" | "intermediate" | "advanced";
  students: number;
  categories: string[];
  image: string;
  enrolledDate: string;
  progress: CourseProgress;
  rating: number;
  totalHours: number;
  completed: boolean;
  featured: boolean;
}

const subscribedCourses: SubscribedCourse[] = [
  {
    id: "1",
    title: "Disease Surveillance and Epidemiology",
    description:
      "Learn about monitoring, detecting, and responding to disease outbreaks in Nigeria.",
    instructor: "Dr. Ifeanyi Okafor",
    level: "beginner",
    students: 1250,
    categories: ["Public Health", "Surveillance", "Disease Control"],
    image: "/55.jpg",
    enrolledDate: "2026-01-15",
    progress: {
      completedLessons: 8,
      totalLessons: 24,
      lastAccessed: "2026-01-20",
      progressPercentage: 33,
    },
    rating: 4.7,
    totalHours: 12.5,
    completed: false,
    featured: true,
  },
  {
    id: "2",
    title: "Infection Prevention and Control (IPC)",
    description:
      "Master infection prevention strategies in healthcare settings across Nigeria.",
    instructor: "Dr. Chioma Adeyemi",
    level: "intermediate",
    students: 890,
    categories: ["Healthcare", "Infection Control", "Safety"],
    image: "/51.png",
    enrolledDate: "2026-01-10",
    progress: {
      completedLessons: 15,
      totalLessons: 18,
      lastAccessed: "2026-01-22",
      progressPercentage: 83,
    },
    rating: 4.9,
    totalHours: 8.5,
    completed: false,
    featured: false,
  },
  {
    id: "3",
    title: "Immunization Programs and Vaccination",
    description:
      "Comprehensive guide to Nigeria's immunization programs and vaccine management.",
    instructor: "Prof. Emeka Nwosu",
    level: "intermediate",
    students: 1520,
    categories: ["Immunization", "Public Health", "Prevention"],
    image: "/52.jpg",
    enrolledDate: "2026-01-15",
    progress: {
      completedLessons: 20,
      totalLessons: 20,
      lastAccessed: "2026-01-20",
      progressPercentage: 100,
    },
    rating: 4.8,
    totalHours: 10,
    completed: true,
    featured: false,
  },
  {
    id: "4",
    title: "Laboratory Diagnosis and Testing",
    description:
      "Advanced techniques in laboratory diagnosis for infectious diseases.",
    instructor: "Dr. Oluwatoyin Adebayo",
    level: "advanced",
    students: 630,
    categories: ["Laboratory", "Diagnostics", "Testing"],
    image: "/53.jpg",
    enrolledDate: "2026-01-12",
    progress: {
      completedLessons: 2,
      totalLessons: 16,
      lastAccessed: "2026-01-15",
      progressPercentage: 12,
    },
    rating: 4.6,
    totalHours: 14,
    completed: false,
    featured: false,
  },
  {
    id: "5",
    title: "Community Health Education",
    description:
      "Strategies for effective health communication and community engagement.",
    instructor: "Mrs. Zainab Hassan",
    level: "beginner",
    students: 945,
    categories: ["Community Health", "Education", "Public Health"],
    image: "/54.jpg",
    enrolledDate: "2026-01-21",
    progress: {
      completedLessons: 6,
      totalLessons: 12,
      lastAccessed: "2026-01-21",
      progressPercentage: 50,
    },
    rating: 4.5,
    totalHours: 6,
    completed: false,
    featured: false,
  },
];

const MyCourses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState<string>("recent");

  const filteredCourses = subscribedCourses.filter((course) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in-progress")
      return !course.completed && course.progress.progressPercentage > 0;
    if (activeFilter === "completed") return course.completed;
    if (activeFilter === "not-started")
      return course.progress.progressPercentage === 0;
    return true;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "recent") {
      return (
        new Date(b.progress.lastAccessed).getTime() -
        new Date(a.progress.lastAccessed).getTime()
      );
    }
    if (sortBy === "progress") {
      return b.progress.progressPercentage - a.progress.progressPercentage;
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 50) return "bg-green-500";
    if (percentage > 0) return "bg-yellow-500";
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My learning</h1>
              <p className="text-gray-600 mt-1">
                {subscribedCourses.length} course
                {subscribedCourses.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded cursor-pointer ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <Menu size={20} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 cursor-pointer rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <Grid size={20} />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="recent">Recently accessed</option>
                <option value="progress">Progress</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-6 border-b">
            {[
              { id: "all", label: "All courses" },
              { id: "in-progress", label: "In progress" },
              { id: "completed", label: "Completed" },
              { id: "not-started", label: "Not started" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-3 text-sm font-medium relative cursor-pointer ${
                  activeFilter === filter.id
                    ? "text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "list" ? (
          // List View
          <div className="space-y-6">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Course Image */}
                  <div className="md:w-64 lg:w-80 flex-shrink-0">
                    <div className="relative w-full h-48 md:h-full">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover rounded-l-lg"
                      />
                      {course.featured && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          FEATURED
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle className="text-white w-12 h-12" />
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 cursor-pointer">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {course.instructor}
                            </p>
                          </div>
                          {course.completed && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle size={20} className="mr-1" />
                              <span className="text-sm font-medium">
                                Completed
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-500 mr-1" />
                            <span>{course.rating}</span>
                            <span className="mx-1">•</span>
                            <span>
                              {course.students.toLocaleString()} students
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{course.totalHours} total hours</span>
                          </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {course.categories.slice(0, 3).map((category) => (
                            <span
                              key={category}
                              className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Progress Section */}
                        <div className="mt-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Your progress</span>
                            <span className="text-gray-600">
                              {course.progress.completedLessons} of{" "}
                              {course.progress.totalLessons} lessons (
                              {course.progress.progressPercentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress.progressPercentage)}`}
                              style={{
                                width: `${course.progress.progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>
                              Enrolled {formatDate(course.enrolledDate)}
                            </span>
                            <span>
                              Last accessed{" "}
                              {formatDate(course.progress.lastAccessed)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2 min-w-[160px]">
                        <button
                          onClick={() =>
                            (window.location.href = `/home/courses/${course.id}/learn`)
                          }
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
                        >
                          {course.completed
                            ? "Review course"
                            : "Continue learning"}
                        </button>
                        <button
                          onClick={() =>
                            (window.location.href = `/home/courses/${course.id}`)
                          }
                          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer"
                        >
                          Go to course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {course.featured && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      FEATURED
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white w-12 h-12" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white bg-opacity-90 text-xs font-medium px-2 py-1 rounded">
                      {course.totalHours}h
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 hover:text-green-600 cursor-pointer line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.instructor}
                  </p>

                  <div className="flex items-center mt-2">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-xs text-gray-600">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {course.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">
                        {course.progress.progressPercentage}% complete
                      </span>
                      <span className="text-gray-600">
                        {course.progress.completedLessons}/
                        {course.progress.totalLessons}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getProgressColor(course.progress.progressPercentage)}`}
                        style={{
                          width: `${course.progress.progressPercentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Last accessed {formatDate(course.progress.lastAccessed)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/home/courses/${course.id}/learn`)
                      }
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                    >
                      {course.completed ? "Review course" : "Continue learning"}
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/home/courses/${course.id}`)
                      }
                      className="w-full flex items-center justify-center text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer"
                    >
                      Go to course
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              No courses match your current filter selection.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View all courses
            </button>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-12 bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Learning statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {subscribedCourses.length}
              </div>
              <div className="text-sm text-gray-600">Total courses</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {subscribedCourses.filter((c) => c.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  subscribedCourses.reduce(
                    (acc, c) => acc + c.progress.progressPercentage,
                    0,
                  ) / subscribedCourses.length,
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Average progress</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {subscribedCourses.reduce((acc, c) => acc + c.totalHours, 0)}
              </div>
              <div className="text-sm text-gray-600">Total hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
