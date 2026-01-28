import React from "react";
import Link from "next/link";
import { ncdicCategories } from "@/app/lib/categoriesData";

const Categories: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Learning Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ncdicCategories.map((category) => (
          <Link
            href={`/home/categories/${category.id}`}
            key={category.id}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
