"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useAllCategoryDataQuery } from "@/hooks/use-product-category-query";

const List = ({ handleClick }) => {
  const { data: product_category, isLoading } = useAllCategoryDataQuery();

  return (
    <>
      {product_category?.data?.map((category, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={category.categoryName}>
            <div className="py-2">
              <AccordionTrigger className="hover:bg-hovered py-3 px-2 rounded-md hover:no-underline">
                {category.categoryName}
              </AccordionTrigger>
            </div>

            {category.variants?.map((cat, index) => (
              <AccordionContent
                key={index}
                className="hover:bg-hovered px-2 w-full rounded-md flex items-center  text-palesky"
              >
                <Link
                  className="w-full"
                  href={{
                    pathname: "/products",
                    query: {
                      categoryName: category.categoryName,
                      variants: cat.name,
                    },
                  }}
                  onClick={handleClick}
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
