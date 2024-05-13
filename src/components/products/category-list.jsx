"use client";
import React from "react";
import Link from "next/link";
import { Card, CardTitle } from "../ui/card";

const CategoryList = ({ category, currentCategory, currentVariants }) => {
  return (
    <Card>
      <div className="  bg-primary text-card-foreground text-xl font-semibold text-white rounded-t-md  p-4 mb-2">
        <CardTitle className=""> Categories</CardTitle>
      </div>
      <Link
        href={{
          pathname: "/products",
          query: {
            categoryName: currentCategory,
          },
        }}
        className={`capitalize px-4 ${
          currentVariants === undefined ? " font-bold" : ""
        }`}
      >
        {currentCategory}
      </Link>

      {category?.map((cat) => {
        if (currentCategory === cat.categoryName) {
          return cat.variants?.map((product, index) => (
            <div key={index} className=" pl-8 mt-1">
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    categoryName: currentCategory,
                    variants: product.name,
                  },
                }}
              >
                <span
                  className={` ${
                    decodeURIComponent(currentVariants) === product.name
                      ? " font-bold"
                      : ""
                  }`}
                >
                  {product.name} | 132
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
