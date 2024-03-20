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

  if (buyers) {
    return (
      <div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Buyer</TabsTrigger>
            <TabsTrigger value="password">Seller</TabsTrigger>
            <TabsTrigger value="personnel">Pesonnel Delivery</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <DataTable columns={columns} data={buyers?.data} myparams="email" />
          </TabsContent>
          <TabsContent value="password">
            <DataTable
              columns={seller_column}
              data={sellers?.data}
              myparams="email"
            />
          </TabsContent>
          <TabsContent value="personnel">
            <DataTable
              columns={delivery_columns}
              rendered="delivery_personnel"
              data={delivery_personnels?.data}
              myparams="email"
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
};

export default Users;
