"use client";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { menuItems } from "../home/list";

const CategoryList = ({ category, currentCategory, currentType }) => {
  return (
    <Card>
      <div className="  bg-primary text-card-foreground text-xl font-semibold text-white rounded-t-md  p-4 mb-2">
        <CardTitle className="text-card-foreground"> Categories</CardTitle>
      </div>
      <Link
        href={{
          pathname: "/products",
          query: {
            categoryName: currentCategory,
          },
        }}
        className={`capitalize px-4 ${
          currentType === undefined ? " font-bold" : ""
        }`}
      >
        {currentCategory}
      </Link>

      {category?.map((cat) => {
        if (currentCategory === cat.categoryName) {
          return cat.productType?.map((product, index) => (
            <div key={index} className=" pl-8 mt-1">
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    categoryName: currentCategory,
                    productType: product.name,
                  },
                }}
              >
                <span
                  className={` ${
                    decodeURIComponent(currentType) === product.name
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
