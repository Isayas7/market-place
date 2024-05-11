"use client";
import CategoryForm from "@/components/dashboard/category/category-form";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import BrandForm from "@/components/dashboard/product/brand-form";

const NewBrand = ({ searchParams }) => {
  return (
    <div>
      <div className="mb-2">
        <div className="text-xl my-2 font-bold "> Add Brand</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/variant">Variant</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Brand Add</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BrandForm searchParams={searchParams} />
    </div>
  );
};

export default NewBrand;
