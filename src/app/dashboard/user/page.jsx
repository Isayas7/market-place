"use client";
import { columns } from "@/components/dashboard/table/column/buyer-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const Buyer = () => {
  const { data: userData } = useUserQuery();

  return (
    <DataTable
      userGroup="user"
      columns={columns}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      searchBy="email"
    />
  );
};

export default Buyer;
