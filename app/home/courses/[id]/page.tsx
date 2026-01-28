"use client";

import { useState, use } from "react";
import Image from "next/image";
import { Users, ChevronDown } from "lucide-react";
import { courseData } from "@/app/lib/courseData";

type RouteParams = Promise<{
  id: string;
}>;

interface CourseDetailsPageProps {
  params: RouteParams;
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["section-1"]),
  );
  const resolvedParams = use(params as RouteParams);

  // Find course by ID
  const course = courseData.find((c) => c.id === resolvedParams.id);

  // Sample course content
  const courseContent = [
    {
      id: "section-1",
      title: "Introduction to the Course",
      duration: "45 min",
      lessons: [
        {
          id: "lesson-1",
          title: "Welcome & Course Overview",
          duration: "8 min",
        },
        { id: "lesson-2", title: "What You Will Learn", duration: "12 min" },
        { id: "lesson-3", title: "Course Resources", duration: "5 min" },
        { id: "lesson-4", title: "Getting Started", duration: "20 min" },
      ],
    },
    {
      id: "section-2",
      title: "Fundamentals & Core Concepts",
      duration: "2h 15 min",
      lessons: [
        { id: "lesson-5", title: "Basic Principles", duration: "20 min" },
        {
          id: "lesson-6",
          title: "Understanding the Framework",
          duration: "25 min",
        },
        { id: "lesson-7", title: "Key Terminology", duration: "18 min" },
        { id: "lesson-8", title: "Best Practices", duration: "22 min" },
        { id: "lesson-9", title: "Common Mistakes", duration: "30 min" },
      ],
    },
    {
      id: "section-3",
      title: "Practical Implementation",
      duration: "3h 40 min",
      lessons: [
        {
          id: "lesson-10",
          title: "Setting Up Your Environment",
          duration: "25 min",
        },
        {
          id: "lesson-11",
          title: "Hands-on Project Part 1",
          duration: "45 min",
        },
        {
          id: "lesson-12",
          title: "Hands-on Project Part 2",
          duration: "50 min",
        },
        {
          id: "lesson-13",
          title: "Debugging and Troubleshooting",
          duration: "40 min",
        },
      ],
    },
    {
      id: "section-4",
      title: "Advanced Topics",
      duration: "1h 50 min",
      lessons: [
        { id: "lesson-14", title: "Advanced Techniques", duration: "30 min" },
        {
          id: "lesson-15",
          title: "Optimization Strategies",
          duration: "28 min",
        },
        { id: "lesson-16", title: "Real-world Examples", duration: "32 min" },
        { id: "lesson-17", title: "Q&A and Discussion", duration: "20 min" },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-600">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm mb-2">{course.categories.join(" > ")}</p>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-4">{course.description}</p>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span className="text-sm">
                {course.students.toLocaleString()} students
              </span>
            </div>
            <span className="text-sm capitalize px-3 py-1 bg-green-600 rounded-full">
              {course.level}
            </span>
          </div>
          <p className="text-sm">
            Instructor:{" "}
            <span className="font-semibold">{course.instructor}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Course Preview Image */}
            <div className="mb-8">
              <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={300}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About this course</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {course.description}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                What you&apos;ll learn
              </h2>
              <div className="space-y-3">
                {course.categories.map((category, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="border rounded-lg p-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Level</p>
                  <p className="font-semibold capitalize text-lg">
                    {course.level}
                  </p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Students</p>
                  <p className="font-semibold text-lg">
                    {course.students.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Categories</p>
                  <p className="font-semibold text-sm">
                    {course.categories.length} categories
                  </p>
                </div>
              </div>
            </div>

            {/* Course Content / Curriculum */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div>
                {courseContent.map((section) => (
                  <div key={section.id} className="border overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <ChevronDown
                          size={20}
                          className={`text-gray-600 transition-transform ${
                            expandedSections.has(section.id) ? "rotate-180" : ""
                          }`}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {section.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 ml-2">
                        {section.duration}
                      </span>
                    </button>

                    {/* Section Lessons */}
                    {expandedSections.has(section.id) && (
                      <div className="bg-white">
                        {section.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 px-4 ${
                              index !== section.lessons.length - 1
                                ? "border-b"
                                : ""
                            } hover:bg-gray-50 transition`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-gray-400">▶</span>
                              <span className="text-sm text-gray-700">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-4 bg-white border rounded-lg shadow-lg">
              {/* Course Video Preview */}
              <div className="mb-6">
                <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video mb-3">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/IwV47f1m3G0"
                    title="Course Preview Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-500 pl-3 pr-3">
                  Course preview video
                </p>
              </div>

              <div className="p-3">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Course Fee</p>
                  <span className="text-3xl font-bold text-green-600">
                    Free
                  </span>
                </div>

                <button
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className={`w-full py-3 rounded-lg font-semibold mb-4 transition cursor-pointer ${
                    isEnrolled
                      ? "bg-gray-200 text-gray-800"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isEnrolled ? "Enrolled" : "Enroll Now"}
                </button>

                {/* <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 mb-6">
                Add to Wishlist
              </button> */}

                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    📚 Level:{" "}
                    <span className="font-semibold capitalize">
                      {course.level}
                    </span>
                  </p>
                  <p>
                    👥 Students:{" "}
                    <span className="font-semibold">
                      {course.students.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    👨‍🏫 Instructor:{" "}
                    <span className="font-semibold">{course.instructor}</span>
                  </p>
                  <div className="pt-3 border-t mt-3">
                    <p className="font-semibold mb-2">Categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
