"use client";

import { product_columns } from "@/components/dashboard/table/column/product-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useAllCategoryDataQuery } from "@/hooks/use-product-category-query";
import { useProductForAdminQuery } from "@/hooks/use-product-query";

const Products = () => {
  const { data: category_data, isFetching } = useAllCategoryDataQuery();
  const { data: product_data, isLoading } = useProductForAdminQuery();

  return (
    <div>
      <DataTable
        rendered="product"
        columns={product_columns}
        data={product_data?.data?.productData}
        dataInfo={category_data?.data}
        isLoading={isLoading}
        totalPage={product_data?.data?.totalPage}
        currentPage={product_data?.data?.currentPage}
        searchBy={"brand"}
      />
    </div>
  );
};

export default Products;
