"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import { category_columns } from "@/components/dashboard/table/column/category-columns";
import {
  UseCategoryQuery,
  useAllCategoryDataQuery,
} from "@/hooks/use-product-category-query";

const Category = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();
  const { data: category_data, isFetching } = useAllCategoryDataQuery();
  const exportedData = product_category?.data?.productCategories?.map(
    ({ _id, createdAt, updatedAt, __v, ...rest }) => rest
  );

  return (
    <div>
      <DataTable
        columns={category_columns}
        rendered="category"
        data={product_category?.data?.productCategories}
        totalPage={product_category?.data?.totalPage}
        currentPage={product_category?.data?.currentPage}
        dataInfo={category_data?.data}
        exportedData={exportedData}
        searchBy="categoryName"
      />
    </div>
  );
};

export default Category;
