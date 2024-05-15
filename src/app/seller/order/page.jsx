"use client";

import { useSellerOrderQuery } from "@/hooks/use-order-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const SellerOrder = () => {
  const session = useSession();

  const { data: order } = useSellerOrderQuery(session?.data.user?.id);

  return (
    <div className="flex flex-col ">
      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col  ">
          <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Order List</h1>
              </div>
              <div></div>
            </div>
          </header>
          <div className=" rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Order Code</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.data.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">
                            {order?.deliveryPersonnelId.firstName}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {order?.deliveryPersonnelId.middleName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order?.items?.length}</TableCell>
                    <TableCell>
                      {order?.receiverInformation.secretCode}
                    </TableCell>

                    <TableCell>
                      {order?.items.map((item, index) => (
                        <div key={index}>{item.title + " | "}</div>
                      ))}
                    </TableCell>

                    <TableCell className="">
                      <Badge size="sm" className="bg-secondary">
                        {order?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={{
                          pathname: "order/orderdetail",
                          query: {
                            sellerId: session?.data?.user?.id,
                            _id: order?._id,
                          },
                        }}
                      >
                        <Badge>
                          <EyeIcon className="text-sm" />
                        </Badge>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="overflow-x-auto"></div>
      </main>
    </div>
  );
};

export default SellerOrder;
