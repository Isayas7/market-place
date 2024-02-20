"use client";

import { columns } from "@/components/dashboard/table/user-column";
import { DataTable } from "@/components/dashboard/table/data_table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsebuyersQuery } from "@/hooks/use-users-query";

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
  console.log(buyers?.data);
  // const data = getData();
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
            <DataTable columns={columns} renderd="dp" data={buyers?.data} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Users;
