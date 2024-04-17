"use client";

import { columns } from "@/components/dashboard/table/column/user-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UseDPsQuery,
  UseSellersQuery,
  UseBuyersQuery,
} from "@/hooks/use-users-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { delivery_columns } from "@/components/dashboard/table/column/delivery-personnel-column";
import { seller_column } from "@/components/dashboard/table/column/seller-column";

const Users = () => {
  const { data: buyers } = UseBuyersQuery();
  const { data: sellers } = UseSellersQuery();
  const { data: delivery_personnels } = UseDPsQuery();
  console.log(buyers?.data);

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Buyer</TabsTrigger>
          <TabsTrigger value="password">Seller</TabsTrigger>
          <TabsTrigger value="personnel">Pesonnel Delivery</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {buyers ? (
            <DataTable columns={columns} data={buyers?.data} searchBy="email" />
          ) : (
            <div className="flex items-center justify-center h-1/2">
              <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
            </div>
          )}
        </TabsContent>
        <TabsContent value="password">
          {sellers ? (
            <DataTable
              columns={seller_column}
              data={sellers?.data}
              searchBy="email"
            />
          ) : (
            <div className="flex items-center justify-center h-1/2">
              <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
            </div>
          )}
        </TabsContent>
        <TabsContent value="personnel">
          {delivery_personnels ? (
            <DataTable
              columns={delivery_columns}
              rendered="delivery_personnel"
              data={delivery_personnels?.data}
              searchBy="email"
            />
          ) : (
            <div className="flex items-center justify-center h-1/2">
              <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
