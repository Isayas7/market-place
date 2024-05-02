"use client";
import CategoryList from "@/components/products/category-list";
import { CustomCard } from "@/components/custom-card";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useProductQuery } from "@/hooks/use-product-query";
import { useAllCategoryDataQuery } from "@/hooks/use-product-category-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Variants = ({ searchParams }) => {
  const { data: categorydata } = useAllCategoryDataQuery();
  let currentBrands;

  if (categorydata?.data) {
    categorydata?.data?.find((category) =>
      category.variants.find((product) => {
        if (product.name === searchParams.variants) {
          currentBrands = product.brands;
          return true;
        }
      })
    );
  }

  const { data: variants, isLoading } = useProductQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
  if (variants?.data) {
    return (
      <div className=" flex gap-5  ">
        <div className="w-80 hidden lg:flex flex-col gap-2">
          <CategoryList
            category={categorydata?.data}
            currentCategory={searchParams.categoryName}
            currentVariants={searchParams.variants}
          />
        </div>
        <div className=" w-full lg:ml-auto  xl:w-[70%]">
          {currentBrands?.length > 0 && (
            <div className="bg-swansdown dark:bg-headercolor-default rounded-md  ">
              <div className="container mx-auto flex flex-wrap items-center gap-8  py-2 mb-2 ">
                {currentBrands?.map((brand) => (
                  <Link
                    href={{
                      pathname: "/products",
                      query: {
                        categoryName: searchParams.categoryName,
                        variants: searchParams.variants,
                        brand: brand.name,
                      },
                    }}
                    className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={250}
                      height={330}
                      className="aspect-square size-10 rounded-md  "
                    />
                    <span>{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5">
            {variants?.data.map((product, index) => (
              <CustomCard
                key={index}
                product={product}
                className="cursor-pointer"
                aspectRatio="portrait"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Variants;
