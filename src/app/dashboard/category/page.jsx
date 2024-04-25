"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import { category_columns } from "@/components/dashboard/table/column/category-column";
import {
  UseCategoryQuery,
  useCategoryDataQuery,
} from "@/hooks/use-product-category-query";

const Category = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();
  const { data: category_data, isFetching } = useCategoryDataQuery();

  return (
    <div>
      <DataTable
        columns={category_columns}
        rendered="category"
        data={product_category?.data}
        dataInfo={category_data?.data}
        searchBy="categoryName"
      />
    </div>
  );
};

export default Category;
