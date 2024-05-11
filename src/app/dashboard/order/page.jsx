"use client";
import { columns } from "@/components/dashboard/table/column/buyer-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useOrderQuery } from "@/hooks/use-order-query";

const Orders = () => {
  const { data: order_product, isLoading } = useOrderQuery();

  return (
    <div>
      <DataTable columns={columns} data={order_product?.data} />
    </div>
  );
};

export default Orders;
