"use client";

import { variant_columns } from "@/components/dashboard/table/column/variant-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import {
  UseVariantsQuery,
  useAllCategoryDataQuery,
} from "@/hooks/use-product-category-query";

const Products = () => {
  const { data: category_data, isFetching } = useAllCategoryDataQuery();
  const { data: product_category, isLoading } = UseVariantsQuery();

  const allVariants = product_category?.data?.productCategories.map((item) => ({
    ...item.variants,
    categoryName: item.categoryName,
    categoryId: item._id,
  }));

  console.log(allVariants);

  return (
    <div>
      <DataTable
        rendered="product"
        columns={variant_columns}
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
