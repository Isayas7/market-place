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
import { CustomCard } from "@/components/home/custom-card";
import Image from "next/image";
import { UseSingleCategoryQuery } from "@/hooks/use-product-category-query";
import { Card } from "@/components/ui/card";

export const listenNowAlbums = [
  {
    category: "electronics",
    type: "tablet",
    productName: "tablet-1",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "tablet",
    productName: "tablet-2",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "t-shirt",
    productName: "t-shirt-1",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "t-shirt",
    productName: "t-shirt-2",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "coat",
    productName: "coat-1",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "coat",
    productName: "coat-2",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "apple-1",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "apple-2",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-1",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-2",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-3",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-4",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ViewCategory = ({ params }) => {
  const { data: product_category, isLoading } = UseSingleCategoryQuery(
    params.id
  );

  console.log(product_category);

  return (
    <div>
      <div>
        <div className="text-xl m-2 font-bold "> Detail</div>
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
      <div className="mt-2">
        <Card className="flex justify-between items-center p-10 my-2">
          <div className="text-jade text-2xl">
            {product_category?.data.categoryName}
            511 ads
          </div>
          <div>
            <div>Products</div>
            {product_category?.data.productNames.map((product) => (
              <div key={product.name}>
                <div> {product.name}</div>
              </div>
            ))}
          </div>

          <div>
            <Image
              src={product_category?.data.image.url || "/nullid.jpg"}
              className="size-64 w-full rounded-sm "
              width={400}
              height={200}
              alt="id"
            />
          </div>
        </Card>
        <div className=" grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 ">
          {product_category?.data.productNames.map((product) => (
            <Card key={product.name} className="cursor-pointer p-4">
              <Image
                src={product?.image.url || "/nullid.jpg"}
                className="size-96 w-full object-cover"
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
