"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import {
  UseCategoryQuery,
  useCategoryDataQuery,
} from "@/hooks/use-product-category-query";

import { product_columns } from "@/components/dashboard/table/column/product-column";

const Products = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();
  const { data: category_data, isFetching } = useCategoryDataQuery();

  const allVariants = product_category?.data.flatMap((item) =>
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
        searchBy={"name"}
      />
    </div>
  );
};

export default Products;
