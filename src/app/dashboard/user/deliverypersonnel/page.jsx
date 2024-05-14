"use client";
import { delivery_columns } from "@/components/dashboard/table/column/delivery-personnel-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { useUserQuery } from "@/hooks/use-users-query";

const DeliveryPersonnel = () => {
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
      columns={delivery_columns}
      data={userData?.data?.users}
      totalPage={userData?.data?.totalPage}
      currentPage={userData?.data?.currentPage}
      exportedData={exportedData}
      searchBy="email"
    />
  );
};

export default DeliveryPersonnel;
