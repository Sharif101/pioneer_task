"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import Select, { SingleValue } from "react-select";
import { categories } from "../../utils/static";

export default function Searchbar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedCategory(selected?.value || "");
  };
  console.log({ selectedCategory });

  return (
    <div className="px-6 py-3 border-b bg-white">
      <div className="flex items-center gap-6">
        <div className="flex flex-1 border rounded-md overflow-hidden">
          <div className="min-w-[180px]">
            <Select
              options={categories}
              placeholder="Categories"
              classNamePrefix="react-select"
              menuPortalTarget={
                typeof window !== "undefined" ? document.body : null
              }
              onChange={handleCategoryChange}
            />
          </div>

          <div className="w-px h-6 bg-gray-300 my-auto"></div>

          <div className="flex items-center p-3">
            <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by product, brand, or keyword"
              className="w-full text-sm bg-transparent placeholder:text-gray-400 outline-none border-none focus:outline-none focus:border-none focus:ring-0"
            />
          </div>
        </div>

        <Button variant="primary">Search</Button>
      </div>
    </div>
  );
}
