"use client";
import CategoryList from "@/components/products/category-list";
import { CustomCard } from "@/components/custom-card";
import React, { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import {
  useAllProductDataQuery,
  useProductQuery,
} from "@/hooks/use-product-query";
import { useAllCategoryDataQuery } from "@/hooks/use-product-category-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import ProductListSkeleton from "@/components/skeleton/product-list";

const Variants = ({ searchParams }) => {
  const [sortBy, setSortBy] = useState("Newest");
  const { data: categorydata } = useAllCategoryDataQuery();
  const { data: variants, isLoading } = useProductQuery();
  const { data: allVariantData, isLoading: loading } = useAllProductDataQuery();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  let currentBrands;
  let uniqueColors = new Set();
  let uniqueSizes = new Set();
  const params = new URLSearchParams(search.toString());

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

  allVariantData?.data?.forEach((product) => {
    product.color.forEach((color) => uniqueColors.add(color.toLowerCase()));
    product.size.forEach((size) => uniqueSizes.add(size));
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(search.toString());
      params.set(name, value);
      // if (params.has("page")) {
      //   params.set("page", 1);
      // }

      return params.toString();
    },
    [search]
  );

  return (
    <div className=" flex gap-5  ">
      <div className="w-80 hidden lg:flex flex-col gap-2">
        <CategoryList
          category={categorydata?.data}
          currentCategory={searchParams.categoryName}
          currentVariants={searchParams.variants}
        />
        {loading ? (
          <div className="flex items-center justify-center h-1/2">
            <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
          </div>
        ) : (
          <Card className=" p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-start justify-between mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 self-end"
                onClick={() => {
                  router.replace(
                    `${pathname}?categoryName=${params.get(
                      "categoryName"
                    )}&variants=${params.get("variants")}`
                  );
                }}
              >
                <XIcon className="w-5 h-5" />
                <span className="sr-only">Clear Filters</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Price</h3>
                <Slider
                  className="w-full "
                  defaultValue={[100, 10000]}
                  onValueChange={(value) => {
                    params.set("minPrice", value[0]);
                    params.set("maxPrice", value[1]);

                    router.push(pathname + "?" + params.toString());
                  }}
                  max={10000}
                  min={0}
                  step={10}
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    {params.get("minPrice") ? params.get("minPrice") : 0} ETB
                  </span>
                  <span>
                    {params.get("maxPrice") ? params.get("maxPrice") : 10000}{" "}
                    ETB
                  </span>
                </div>
              </div>
              {search.get("variants") !== null && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Color</h3>
                  <RadioGroup>
                    {Array.from(uniqueColors).map((color, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={color}
                          id={color}
                          className=""
                          onClick={() =>
                            router.push(
                              pathname + "?" + createQueryString("color", color)
                            )
                          }
                        />
                        <Label htmlFor={color}>{color}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {search.get("variants") !== null && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    <RadioGroup>
                      {Array.from(uniqueSizes).map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={size}
                            id={size}
                            className=""
                            onClick={() =>
                              router.push(
                                pathname + "?" + createQueryString("size", size)
                              )
                            }
                          />
                          <Label htmlFor={size}>{size}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className=" w-full lg:ml-auto  xl:w-[70%]">
        {currentBrands?.length > 0 && (
          <div className="bg-jade rounded-md  ">
            <div className="container mx-auto flex flex-wrap items-center gap-8  py-2 mb-2 ">
              {currentBrands?.map((brand, index) => (
                <Button
                  key={index}
                  className={`flex flex-col items-center space-y-1 bg-none hover:bg-jade-200 py-3 px-5 hover:rounded-md size-20 ${
                    params.get("brand") === brand.name ? "bg-jade-200" : ""
                  }`}
                  onClick={() =>
                    router.push(
                      pathname + "?" + createQueryString("brand", brand.name)
                    )
                  }
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={250}
                    height={330}
                    className="aspect-square size-10 rounded-md  "
                  />
                  <span className="text-white">{brand.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="w-full flex justify-between py-3">
          <div className="flex items-center gap-2"></div>
          <div className="flex gap-3 items-center">
            <h3 className="text-lg font-semibold text-nowrap">Sort By:</h3>
            <Select
              onValueChange={(value) =>
                router.push(pathname + "?" + createQueryString("sort", value))
              }
            >
              <SelectTrigger className="w-full justify-between">
                <SelectValue placeholder={sortBy} />
              </SelectTrigger>
              <SelectContent className="w-56">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-1/2">
            <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
          </div>
        ) : variants?.data.length < 1 ? (
          <div className="flex items-center justify-center h-1/2">
            There is no product currently
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Variants;

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
