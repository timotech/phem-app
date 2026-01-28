"use client";

import React from "react";

interface FilterSidebarProps {
  filters: {
    level: string[];
    price: string;
    rating: number;
  };
  onFiltersChange: (filters: {
    level: string[];
    price: string;
    rating: number;
  }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleLevelChange = (level: string) => {
    const newLevels = filters.level.includes(level)
      ? filters.level.filter((l) => l !== level)
      : [...filters.level, level];
    onFiltersChange({ ...filters, level: newLevels });
  };

  const handlePriceChange = (price: string) => {
    onFiltersChange({ ...filters, price });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      level: [],
      price: "all",
      rating: 0,
    });
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Level Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Level</h3>
          <div className="space-y-2">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <label
                key={level}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.level.includes(level)}
                  onChange={() => handleLevelChange(level)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 cursor-pointer"
                />
                <span className="text-gray-700 capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Price</h3>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Prices" },
              { value: "free", label: "Free" },
              { value: "paid", label: "Paid" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  checked={filters.price === option.value}
                  onChange={() => handlePriceChange(option.value)}
                  className="w-4 h-4 text-green-600 cursor-pointer"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[
              { value: 0, label: "All Ratings" },
              { value: 4, label: "4.0 & Up ⭐" },
              { value: 3, label: "3.0 & Up ⭐" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={filters.rating === option.value}
                  onChange={() => handleRatingChange(option.value)}
                  className="w-4 h-4 text-green-600 cursor-pointer"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Summary */}
        {(filters.level.length > 0 ||
          filters.price !== "all" ||
          filters.rating > 0) && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing filtered results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
