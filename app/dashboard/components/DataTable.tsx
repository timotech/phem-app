// components/DataTable.tsx

import React from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[] | null;
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
};

export default function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data available",
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded"></div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 hidden sm:table-header-group">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.width || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={index}
              className="block sm:table-row mb-4 sm:mb-0"
              onClick={() => onRowClick?.(item)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {columns.map((column) => (
                <td
                  key={`${index}-${String(column.key)}`}
                  className="block sm:table-cell px-6 py-4 whitespace-normal break-words
      before:content-[attr(data-label)] sm:before:content-none
      before:block before:font-medium before:text-gray-500
      before:mb-1 sm:before:mb-0"
                  data-label={column.header}
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
