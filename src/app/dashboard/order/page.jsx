"use client";
import { order_columns } from "@/components/dashboard/table/column/order-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useOrderQuery } from "@/hooks/use-order-query";

const Orders = () => {
  const { data: order_product, isLoading } = useOrderQuery();

  return (
    <div>
      <DataTable columns={order_columns} data={order_product?.data} />
    </div>
  );
};

export default Orders;
