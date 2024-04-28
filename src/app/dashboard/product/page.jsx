"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import {
  UseCategoryQuery,
  useAllCategoryDataQuery,
} from "@/hooks/use-product-category-query";

import { product_columns } from "@/components/dashboard/table/column/product-column";

const Products = () => {
  const { data: category_data, isFetching } = useAllCategoryDataQuery();
  const { data: product_category, isLoading } = UseCategoryQuery();

  const allVariants = product_category?.data?.productCategories.flatMap(
    (item) =>
      item.variants.map((product) => ({
        ...product,
        categoryName: item.categoryName,
        categoryId: item._id,
      }))
  );

  return (
    <div>
      <DataTable
        rendered="product"
        columns={product_columns}
        data={allVariants}
        dataInfo={category_data?.data}
        isLoading={isLoading}
        totalPage={product_category?.data?.totalPage}
        currentPage={product_category?.data?.currentPage}
        searchBy={"name"}
      />
    </div>
  );
};

export default Products;
