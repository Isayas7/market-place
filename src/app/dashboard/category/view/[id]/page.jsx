"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { UseSingleCategoryQuery } from "@/hooks/use-product-category-query";
import { Card } from "@/components/ui/card";

const ViewCategory = ({ params }) => {
  const { data: single_category, isLoading } = UseSingleCategoryQuery(
    params.id
  );

  return (
    <div>
      <div>
        <div className="text-xl my-2 font-bold "> Detail</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/category">Category</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-4 grid  grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Card className=" text-jade text-2xl font-semibold p-4 bg-swansdown">
            {single_category?.data?.categoryName}
          </Card>

          <div>
            <Image
              src={single_category?.data?.categoryImage || "/nullid.jpg"}
              className="size-64 w-full rounded-sm "
              width={400}
              height={200}
              alt="id"
            />
          </div>
          <Card className="p-4">
            <div className="text-primary">Products</div>
            {single_category?.data?.variants?.map((product) => (
              <div key={product.name} className="flex w-full justify-between">
                <div> {product.name}</div>
                <div>123</div>
              </div>
            ))}
          </Card>
        </div>
        <div className=" grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 ">
          {single_category?.data?.variants?.map((product) => (
            <Card
              key={product.name}
              className="cursor-pointer rounded-sm overflow-hidden"
            >
              <Image
                src={product?.image || "/nullid.jpg"}
                className={
                  "h-full w-full object-cover transition-all hover:scale-105 aspect-square rounded-sm "
                }
                width={500}
                height={500}
                alt="id"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
