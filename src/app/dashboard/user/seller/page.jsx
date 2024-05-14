"use client";
import { seller_column } from "@/components/dashboard/table/column/seller-columns";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const Seller = () => {
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
      columns={seller_column}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      exportedData={exportedData}
      searchBy="email"
    />
  );
};

export default Seller;
