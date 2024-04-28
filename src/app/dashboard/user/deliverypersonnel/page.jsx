"use client";
import { delivery_columns } from "@/components/dashboard/table/column/delivery-personnel-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const DeliveryPersonnel = () => {
  const { data: userData } = useUserQuery();

  return (
    <DataTable
      userGroup="user"
      columns={delivery_columns}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      searchBy="email"
    />
  );
};

export default DeliveryPersonnel;
