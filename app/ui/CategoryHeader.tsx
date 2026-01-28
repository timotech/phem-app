"use client";

import React from "react";
import { Category } from "@/app/lib/categoriesData";

interface CategoryHeaderProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Explore Courses by Category
        </h1>

        <div className="flex gap-3 overflow-x-auto pb-4">
          {/* Show All button */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedCategory === null
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Courses
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
