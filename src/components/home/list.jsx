"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { UseCategoryQuery } from "@/hooks/use-product-category-query";

export const menuItems = [
  {
    category: "electronics",
    items: [
      { title: "shoes" },
      { title: "T-shirt" },
      { title: "Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
];

export const menuItems2 = [
  {
    category: "electronics",
    items: [
      { title: "shoes" },
      { title: "T-shirt" },
      { title: "Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "clothing",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
];

const List = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();

  return (
    <>
      {product_category?.data.map((category, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={category.categoryName}>
            <div className="py-2">
              <AccordionTrigger className="hover:bg-hovered py-3 px-2 rounded-md hover:no-underline">
                {category.categoryName}
              </AccordionTrigger>
            </div>

            {category.productNames?.map((cat, index) => (
              <AccordionContent
                key={index}
                className="hover:bg-hovered px-2 w-full rounded-md flex items-center  text-palesky"
              >
                <Link
                  className="w-full"
                  href={`/${category.category}/${cat.name}`}
                >
                  {cat.name}
                </Link>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default List;
