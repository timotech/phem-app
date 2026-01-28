"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ncdicCategories } from "@/app/lib/categoriesData";
import { courseData } from "@/app/lib/courseData";
import CategoryHeader from "@/app/ui/CategoryHeader";
import FilterSidebar from "@/app/ui/FilterSidebar";
import CourseGrid from "@/app/ui/CourseGrid";

export default function CategoriesPage() {
  const params = useParams();
  const categoryIdFromUrl = useMemo(
    () => (params?.id as string | undefined) || null,
    [params?.id],
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryIdFromUrl,
  );
  const [filters, setFilters] = useState({
    level: [] as string[],
    price: "all" as string,
    rating: 0 as number,
  });

  const filteredCourses = useMemo(() => {
    const courses = selectedCategory
      ? ncdicCategories.find((cat) => cat.id === selectedCategory)?.courses ||
        []
      : courseData.slice(0, 10); // Show first 10 courses for "All Courses"

    return courses.filter((course) => {
      if (filters.level.length > 0 && !filters.level.includes(course.level)) {
        return false;
      }
      if (filters.price !== "all") {
        if (filters.price === "free" && course.price !== 0) return false;
        if (filters.price === "paid" && course.price === 0) return false;
      }
      if (filters.rating > 0 && (course.rating || 0) < filters.rating) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader
        categories={ncdicCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
        <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        <CourseGrid courses={filteredCourses} />
      </div>
    </div>
  );
}
