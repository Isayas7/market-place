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
import CategoryUpdateForm from "@/components/dashboard/category/category-update-form";
import BrandUpdateForm from "@/components/dashboard/product/brand-update-form";

const UpdateBrand = ({ params }) => {
  return (
    <div>
      <div className="mb-2">
        <div className="text-xl my-2 font-bold "> Update Brand</div>
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
              <BreadcrumbPage>Update Brand</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BrandUpdateForm variantId={params.id} />
    </div>
  );
};

export default UpdateBrand;
