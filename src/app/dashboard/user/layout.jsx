"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { roleData } from "@/utils/permission";

const Users = ({ children }) => {
  return (
    <div>
      <Tabs defaultValue={roleData.Buyer} className="w-full">
        <TabsList>
          <Link href="/dashboard/user">
            <TabsTrigger value={roleData.Buyer}>Buyer</TabsTrigger>
          </Link>
          <Link href="/dashboard/user/seller">
            <TabsTrigger value={roleData.Seller}>Seller</TabsTrigger>
          </Link>
          <Link href="/dashboard/user/deliverypersonnel">
            <TabsTrigger value={roleData.Personnel_Delivery}>
              Pesonnel Delivery
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
};

export default Users;
