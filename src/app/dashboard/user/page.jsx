"use client";
import { columns } from "@/components/dashboard/table/column/buyer-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const Buyer = () => {
  const { data: userData } = useUserQuery();

  const exportedData = userData?.data?.users?.map(
    ({
      role,
      otp,
      _id,
      password,
      createdAt,
      updatedAt,
      __v,
      isSeller,
      location,
      profileImage,
      nationalId,
      identificationCard,
      balance,
      bankInfo,
      ...rest
    }) => rest
  );

  return (
    <DataTable
      userGroup="user"
      columns={columns}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      searchBy="email"
      exportedData={exportedData}
    />
  );
};

export default Buyer;
