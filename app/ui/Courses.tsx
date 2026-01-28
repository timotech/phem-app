"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { courseData } from "@/app/lib/courseData";

interface CoursesProps {
  limit?: number;
}

const Courses: React.FC<CoursesProps> = ({ limit }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const displayedCourses = limit ? courseData.slice(0, limit) : courseData;
  const [popoverPosition, setPopoverPosition] = useState<"left" | "right">(
    "right",
  );
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterCard = (courseId: string, index: number) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    setHoveredCard(courseId);
    const columnIndex = index % 5;
    setPopoverPosition(columnIndex >= 3 ? "left" : "right");
  };

  const handleMouseLeaveCard = () => {
    // Set a timeout to hide the popover, but only if we're not hovering over the popover
    hideTimeoutRef.current = setTimeout(() => {
      if (!isPopoverHovered) {
        setHoveredCard(null);
      }
    }, 100); // Small delay to allow mouse to move to popover
  };

  const handleMouseEnterPopover = () => {
    // Clear any pending hide timeout when entering popover
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsPopoverHovered(true);
  };

  const handleMouseLeavePopover = () => {
    setIsPopoverHovered(false);
    // Set a timeout to hide the popover when leaving it
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredCard(null);
    }, 150); // Slightly longer delay when leaving popover
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold mb-8">Featured Courses</h1> */}
      <div className="grid grid-cols-5 gap-6">
        {displayedCourses.map((course, index) => (
          <div
            key={course.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnterCard(course.id, index)}
            onMouseLeave={handleMouseLeaveCard}
          >
            {/* Course Card */}
            <div className="h-84 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
              {/* Image */}
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 h-[calc(24rem-56.25%)] flex flex-col">
                <h2 className="text-sm font-semibold line-clamp-2 mb-2">
                  {course.title}
                </h2>

                <div className="flex flex-wrap gap-1 mb-2 line-clamp-1">
                  {course.categories.map((category) => (
                    <span
                      key={category}
                      className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Push instructor to bottom */}
                <div className="mt-auto text-xs text-gray-500 space-y-1">
                  <span className="block">{course.instructor}</span>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
                    {course.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Popover */}
            {hoveredCard === course.id && (
              <div
                className={clsx(
                  "popover-container absolute z-50 top-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4 transition-all duration-200 flex flex-col",
                  popoverPosition === "left"
                    ? "right-full mr-3 -translate-x-1"
                    : "left-full ml-3 translate-x-1",
                )}
                onMouseEnter={handleMouseEnterPopover}
                onMouseLeave={handleMouseLeavePopover}
                style={{
                  top: "0px",
                  pointerEvents: "auto",
                  maxHeight: "28rem", // Optional: Set a max height if needed
                  minHeight: "22rem", // Optional: Set a min height if needed
                }}
              >
                {/* Arrow */}
                <div
                  className={clsx(
                    "absolute top-6 w-3 h-3 bg-white transform rotate-45",
                    popoverPosition === "left"
                      ? "right-[-6px] border-r border-t border-gray-200"
                      : "left-[-6px] border-l border-b border-gray-200",
                  )}
                />

                {/* Arrow outline for better visibility */}
                <div
                  className={clsx(
                    "absolute top-[22px] w-3 h-3 bg-white",
                    popoverPosition === "left" ? "right-[-7px]" : "left-[-7px]",
                  )}
                  style={{
                    clipPath:
                      popoverPosition === "left"
                        ? "polygon(100% 0, 0 50%, 100% 100%)"
                        : "polygon(0 0, 100% 50%, 0 100%)",
                  }}
                />

                {/* Content section that can grow */}
                <div className="flex-grow overflow-hidden">
                  <h3 className="text-base font-semibold line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
                      >
                        {category}
                      </span>
                    ))}
                    {course.categories.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{course.categories.length - 2} more
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-4 mb-4">
                    {course.description}
                  </p>

                  <div className="mt-4 text-xs text-gray-500 mb-2">
                    <span className="font-medium text-green-600">
                      Updated recently
                    </span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">{course.level}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      4.7 (1,234 ratings)
                    </span>
                  </div>

                  <div className="text-sm text-gray-700">
                    <span>
                      👥 {course.students.toLocaleString()} students enrolled
                    </span>
                    <span className="mx-2">•</span>
                    <span>⏱️ 12.5 total hours</span>
                  </div>
                </div>

                {/* Button fixed to bottom */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/home/courses/${course.id}`;
                    }}
                    className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded cursor-pointer transition-colors"
                  >
                    View Course
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// const Courses: React.FC = () => {
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [popoverPosition, setPopoverPosition] = useState<"left" | "right">(
//     "right",
//   );
//   const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

//   const handleMouseEnter = (courseId: string, index: number) => {
//     setHoveredCard(courseId);

//     // Determine position based on column index
//     const columnIndex = index % 5;
//     setPopoverPosition(columnIndex >= 3 ? "left" : "right");
//   };

//   const handleMouseLeave = (e: React.MouseEvent) => {
//     const relatedTarget = e.relatedTarget as HTMLElement;

//     // Check if the mouse is moving to the popover
//     if (relatedTarget?.closest(".popover-container")) {
//       return; // Don't hide if moving to popover
//     }

//     setHoveredCard(null);
//   };

//   const handlePopoverMouseLeave = () => {
//     setHoveredCard(null);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-8">Featured Courses</h1>
//       <div className="grid grid-cols-5 gap-6">
//         {courseData.map((course, index) => (
//           <div
//             key={course.id}
//             className="relative group"
//             onMouseEnter={() => handleMouseEnter(course.id, index)}
//             onMouseLeave={handleMouseLeave}
//             ref={(el) => {
//               cardRefs.current[course.id] = el;
//             }}
//           >
//             {/* Course Card */}
//             <div className="h-84 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
//               {/* Image */}
//               <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
//                 <Image
//                   src={course.image}
//                   alt={course.title}
//                   fill
//                   className="object-cover transition-transform duration-300 hover:scale-110"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-4 h-[calc(24rem-56.25%)] flex flex-col">
//                 <h2 className="text-sm font-semibold line-clamp-2 mb-2">
//                   {course.title}
//                 </h2>

//                 <div className="flex flex-wrap gap-1 mb-2 line-clamp-1">
//                   {course.categories.map((category) => (
//                     <span
//                       key={category}
//                       className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded"
//                     >
//                       {category}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Push instructor to bottom */}
//                 <div className="mt-auto text-xs text-gray-500 space-y-1">
//                   <span className="block">{course.instructor}</span>
//                   <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
//                     {course.level}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Popover */}
//             {hoveredCard === course.id && (
//               <div
//                 className={clsx(
//                   "popover-container absolute z-50 top-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4 transition-all duration-200",
//                   popoverPosition === "left"
//                     ? "right-full mr-3 -translate-x-1"
//                     : "left-full ml-3 translate-x-1",
//                 )}
//                 onMouseLeave={handlePopoverMouseLeave}
//                 style={{
//                   top: "0px",
//                 }}
//               >
//                 {/* Arrow */}
//                 <div
//                   className={clsx(
//                     "absolute top-6 w-3 h-3 bg-white transform rotate-45",
//                     popoverPosition === "left"
//                       ? "right-[-6px] border-r border-t border-gray-200"
//                       : "left-[-6px] border-l border-b border-gray-200",
//                   )}
//                 />

//                 {/* Arrow outline for better visibility */}
//                 <div
//                   className={clsx(
//                     "absolute top-[22px] w-3 h-3 bg-white",
//                     popoverPosition === "left" ? "right-[-7px]" : "left-[-7px]",
//                   )}
//                   style={{
//                     clipPath:
//                       popoverPosition === "left"
//                         ? "polygon(100% 0, 0 50%, 100% 100%)"
//                         : "polygon(0 0, 100% 50%, 0 100%)",
//                   }}
//                 />

//                 <h3 className="text-base font-semibold line-clamp-2 mb-2">
//                   {course.title}
//                 </h3>

//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {course.categories.slice(0, 2).map((category) => (
//                     <span
//                       key={category}
//                       className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
//                     >
//                       {category}
//                     </span>
//                   ))}
//                   {course.categories.length > 2 && (
//                     <span className="text-xs text-gray-500">
//                       +{course.categories.length - 2} more
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-700 line-clamp-3">
//                   {course.description}
//                 </p>

//                 <div className="mt-4 text-xs text-gray-500 mb-2">
//                   <span className="font-medium text-green-600">
//                     Updated recently
//                   </span>
//                   <span className="mx-1">•</span>
//                   <span className="capitalize">{course.level}</span>
//                 </div>

//                 <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                   <span>👨‍🏫 {course.instructor}</span>
//                   <span className="flex items-center">
//                     <span className="text-yellow-500 mr-1">★</span>
//                     4.7 (1,234 ratings)
//                   </span>
//                 </div>

//                 <div className="text-sm text-gray-700 mb-4">
//                   <span>
//                     👥 {course.students.toLocaleString()} students enrolled
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span>⏱️ 12.5 total hours</span>
//                 </div>

//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     window.location.href = `/courses/${course.id}`;
//                   }}
//                   className="mt-4 w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded cursor-pointer transition-colors"
//                 >
//                   View Course
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Courses;
