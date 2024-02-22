"use client";

import { columns } from "@/components/dashboard/table/user-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsebuyersQuery } from "@/hooks/use-users-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { delivery_columns } from "@/components/dashboard/table/delivery-personnel-column";

const data = [
  {
    _id: "new ObjectId('65d230ad0148647e1e72b4d6')",
    firstName: "Elsabet",
    middleName: "Awraris",
    email: "elsabet@gmail.com",
    password: "$2a$05$ICCblNKhf1f.NnbK0uCasOwcWB6zrDuZJuav5x8ZN5CJhwzBaIlDq",
    createdAt: "2024-02-18T16:30:37.274Z",
    updatedAt: "2024-02-18T16:30:37.274Z",
    __v: "0",
  },
];

const Users = () => {
  const { data: buyers, isLoading } = UsebuyersQuery();
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
            <DataTable columns={columns} data={buyers?.data} />
          </TabsContent>
          <TabsContent value="password">
            <DataTable columns={columns} data={buyers?.data} />
          </TabsContent>
          <TabsContent value="personnel">
            <DataTable
              columns={delivery_columns}
              rendered="delivery_personnel"
              data={buyers?.data}
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
