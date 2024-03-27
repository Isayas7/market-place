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
import { UseSingleCategoryQuery } from "@/hooks/use-product-category-query";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CategoryUpdateForm from "@/components/dashboard/category/category-update-form";

const UpdateCategory = ({ params }) => {
  const { data: product_category, isLoading } = UseSingleCategoryQuery(
    params.id
  );

  return (
    <div>
      <div className="mb-2">
        <div className="text-xl my-2 font-bold "> Update Category</div>
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
              <BreadcrumbPage>Category Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4 w-1/2">
          <Card className=" text-jade text-2xl font-semibold p-4 bg-swansdown">
            {product_category?.data.categoryName}
          </Card>

          <div>
            <Image
              src={product_category?.data.image.url || "/nullid.jpg"}
              className="size-64 w-full rounded-sm "
              width={400}
              height={200}
              alt="id"
            />
          </div>
          <Card className="p-4">
            <div className="text-primary">Products</div>
            {product_category?.data.productNames.map((product) => (
              <div key={product.name} className="flex w-full justify-between">
                <div> {product.name}</div>
                <div>123</div>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <CategoryUpdateForm categoryId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
