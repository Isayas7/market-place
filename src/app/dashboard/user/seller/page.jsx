"use client";
import { seller_column } from "@/components/dashboard/table/column/seller-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const Seller = () => {
  const { data: userData } = useUserQuery();

  return (
    <DataTable
      userGroup="user"
      columns={seller_column}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      searchBy="email"
    />
  );
};

export default Seller;
