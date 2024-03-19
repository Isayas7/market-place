"use client";
import React from "react";
import { menuItems } from "../home/navbar/custom-sheet";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const CategoryList = ({ currentCategory, currentType }) => {
  return (
    <Card>
      <div className="  bg-primary text-card-foreground text-xl font-semibold text-white rounded-t-md  p-4 mb-2">
        <CardTitle className="text-card-foreground"> Categories</CardTitle>
      </div>
      <Link
        href={`/${currentCategory}`}
        className={`capitalize px-4 ${
          currentType === undefined ? " font-bold" : ""
        }`}
      >
        {currentCategory}
      </Link>

      {menuItems.map((category) => {
        if (currentCategory === category.category) {
          return category.items.map((cat, index) => (
            <div key={index} className=" pl-8 mt-1">
              <Link href={`/${category.category}/${cat.title}`}>
                <span
                  className={` ${
                    decodeURIComponent(currentType) === cat.title
                      ? " font-bold"
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
    </Card>
  );
};

export default CategoryList;
