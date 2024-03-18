"use client";
import React from "react";
import { menuItems } from "../home/navbar/custom-sheet";
import Link from "next/link";

const CategoryList = ({ currentCategory, currentType }) => {
  return (
    <div className=" bg-card text-card-foreground  rounded-md h-fit  ">
      <h2 className=" bg-primary text-xl font-semibold text-white rounded-t-md  p-2">
        Categories
      </h2>
      <Link
        href={`/${currentCategory}`}
        className={`capitalize p-2 ${
          currentType === undefined ? "text-blue-900 text-lg  font-bold" : ""
        }`}
      >
        {currentCategory}
      </Link>

      {menuItems.map((category) => {
        if (currentCategory === category.category) {
          return category.items.map((cat, index) => (
            <div key={index} className="flex flex-col px-5 gap-1">
              <Link href={`/${category.category}/${cat.title}`}>
                <span
                  className={` ${
                    decodeURIComponent(currentType) === cat.title
                      ? "text-blue-900 text-lg  font-bold"
                      : ""
                  }`}
                >
                  {cat.title} | 132
                </span>
              </Link>
            </div>
          ));
        }
        return null;
      })}

      <div className="py-1 px-5">
        <span className="  text-green-500 border-b border-dashed inline  border-green-600 ">
          show all | 5
        </span>
      </div>
    </div>
  );
};

export default CategoryList;
