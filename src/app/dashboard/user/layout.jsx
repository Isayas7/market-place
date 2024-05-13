"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { roleData } from "@/utils/permission";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Users = ({ children }) => {
  const path = usePathname();
  console.log(path.includes("user/seller"));
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex gap-3">
          <Link href="/dashboard/user">
            <Button variant={`${path === "/dashboard/user" ? "" : "outline"}`}>
              Buyer
            </Button>
          </Link>
          <Link href="/dashboard/user/seller">
            <Button
              variant={`${path.includes("user/seller") ? "" : "outline"}`}
            >
              Seller
            </Button>
          </Link>
          <Link href="/dashboard/user/deliverypersonnel">
            <Button
              variant={`${
                path.includes("user/deliverypersonnel") ? "" : "outline"
              }`}
            >
              Pesonnel Delivery
            </Button>
          </Link>
        </div>
        {path === "/dashboard/user/deliverypersonnel" && (
          <Link href="/dashboard/user/deliverypersonnel/new">
            <Button
              variant={`${
                path === "/dashboard/user/deliverypersonnel" ? "" : "outline"
              }`}
            >
              New Pesonnel Delivery
            </Button>
          </Link>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Users;
