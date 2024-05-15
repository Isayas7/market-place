"use client";

import OrderSkeleton from "@/components/order/order-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBuyerOrderQuery } from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";
import { CircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Order() {
  const session = useSession();
  const [loading, setLoading] = useState(null);

  const { data: orders, isLoading } = useBuyerOrderQuery(
    session?.data?.user?.id
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Your Orders
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          View and manage your recent orders.
        </p>
      </div>
      {isLoading ? (
        <OrderSkeleton />
      ) : orders?.data?.length === 0 ? (
        <div className=" flex justify-center items-center">
          You have not order any product yet!
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {orders?.data?.map((order,index) => (
            <Card key={index} className="border rounded-lg shadow-sm dark:border-gray-800">
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="font-medium">
                    #ORD-{order?._id?.slice(0, 4)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Placed on {formatDate(order?.createdAt)}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href={`/products/order/${order?._id}`}>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLoading(order?._id);
                      }}
                    >
                      {loading === order?._id ? (
                        <AiOutlineLoading3Quarters className=" text-white   animate-spin" />
                      ) : (
                        "View Ditail"
                      )}
                    </Button>
                  </Link>
                  {order?.orderStatus === "Pending" ? (
                    <Badge
                      className="border-yellow-600 bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-yellow-300 text-yellow-300" />
                      {order?.orderStatus}
                    </Badge>
                  ) : (
                    <Badge
                      className="border-jade bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
                      {order?.orderStatus}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-2">
                {order?.items?.map((item,index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {item?.productId?.variants}
                      </h3>
                      <h3 className="font-medium">{item?.productId?.title}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item?.quantity}
                      </div>
                    </div>
                    <div className="font-medium">{item?.price + "ETB"}</div>
                  </div>
                ))}

                <Separator />
                <div className="flex items-center justify-between">
                  <div className="font-medium">Shipping Price</div>
                  <div className="font-medium">
                    {order?.shippingPrice + " ETB"}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Total</div>
                  <div className="font-medium">
                    {parseFloat(order?.totalPrice) +
                      parseFloat(order?.shippingPrice)}
                    ETB
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
