"use client";

import { columns } from "@/components/dashboard/table/column/buyer-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserQuery } from "@/hooks/use-users-query";
import { delivery_columns } from "@/components/dashboard/table/column/delivery-personnel-column";
import { seller_column } from "@/components/dashboard/table/column/seller-column";
import Link from "next/link";
import { roleData } from "@/utils/permission";

const Users = () => {
  const { data: userData } = useUserQuery();
  let tab;
  if (typeof localStorage !== "undefined") {
    tab = localStorage.getItem("tab");
  }

  return (
    <div>
      <Tabs defaultValue={tab || roleData.Buyer} className="w-full">
        <TabsList>
          <Link
            href={{
              query: {
                role: roleData.Buyer,
              },
            }}
            onClick={() => {
              localStorage.setItem("tab", roleData.Buyer);
            }}
          >
            <TabsTrigger value={roleData.Buyer}>Buyer</TabsTrigger>
          </Link>
          <Link
            href={{
              query: {
                role: roleData.Seller,
              },
            }}
            onClick={() => {
              localStorage.setItem("tab", roleData.Seller);
            }}
          >
            <TabsTrigger value={roleData.Seller}>Seller</TabsTrigger>
          </Link>
          <Link
            href={{
              query: {
                role: roleData.Personnel_Delivery,
              },
            }}
            onClick={() => {
              localStorage.setItem("tab", roleData.Personnel_Delivery);
            }}
          >
            <TabsTrigger value={roleData.Personnel_Delivery}>
              Pesonnel Delivery
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value={roleData.Buyer}>
          <DataTable
            userGroup="user"
            columns={columns}
            data={userData?.data}
            searchBy="email"
          />
        </TabsContent>
        <TabsContent value={roleData.Seller}>
          <DataTable
            columns={seller_column}
            userGroup="user"
            data={userData?.data}
            searchBy="email"
          />
        </TabsContent>
        <TabsContent value={roleData.Personnel_Delivery}>
          <DataTable
            columns={delivery_columns}
            userGroup="user"
            rendered="delivery_personnel"
            data={userData?.data}
            searchBy="email"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
