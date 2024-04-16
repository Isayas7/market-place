"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import {
  UseCategoryQuery,
  UseSingleCategoryQuery,
} from "@/hooks/use-product-category-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { product_columns } from "@/components/dashboard/table/column/product-column";

const Products = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();

  const allproductType = product_category?.data.flatMap((item) =>
    item.productType.map((product) => ({
      ...product,
      categoryName: item.categoryName,
    }))
  );

  if (allproductType) {
    return (
      <div>
        <DataTable
          columns={product_columns}
          data={allproductType}
          searchBy={"name"}
        />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
};

export default Products;
