"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import { category_columns } from "@/components/dashboard/table/column/category-column";
import { UseCategoryQuery } from "@/hooks/use-product-category-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Category = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();

  if (product_category) {
    return (
      <div>
        <DataTable
          columns={category_columns}
          rendered="category"
          data={product_category?.data}
          searchBy="categoryName"
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

export default Category;
