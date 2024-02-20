"use client";
import React from "react";
import { menuItems } from "../home/navbar/custom-sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CategoryList = () => {
  const currentUrl = usePathname().split("/")[1];
  return (
    <div className=" bg-card text-card-foreground  rounded-md h-fit  ">
      <h2 className=" bg-primary text-xl font-semibold text-white rounded-t-md  p-2">
        Categories
      </h2>
      <h3 className=" uppercase p-2">{currentUrl}</h3>

      {menuItems.map((category) => {
        if (currentUrl === category.category) {
          return category.typeName.map((cat, index) => (
            <div key={index} className="flex flex-col px-5 gap-1">
              <Link href={`/${category.category}`}>
                <span
                  className={` ${
                    type === cat ? "text-blue-900 text-lg  font-bold" : ""
                  }`}
                >
                  {cat} | 132
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
