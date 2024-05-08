"use client";

import OrderSkeleton from "@/components/order/order-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderQuery } from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";
import Link from "next/link";

export default function Order() {
  const { data: orders } = useOrderQuery();
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
      {!orders ? (
        <OrderSkeleton />
      ) : orders.data.length === 0 ? (
        <div className=" flex justify-center items-center">
          You have not order any product yet!
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {orders?.data.map((order) => (
            <Card className="border rounded-lg shadow-sm dark:border-gray-800">
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="font-medium">#ORD-{order._id}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Placed on {formatDate(order.createdAt)}
                  </div>
                </div>
                <Link href={`/products/order/${order._id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
              <div className="p-4 space-y-2">
                {order.items.map((item) => (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.productId.title}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">{item.price + "ETB"}</div>
                  </div>
                ))}

                <Separator />
                <div className="flex items-center justify-between">
                  <div className="font-medium">Shipping Price</div>
                  <div className="font-medium">
                    {order.shippingPrice + " ETB"}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Total</div>
                  <div className="font-medium">
                    {parseFloat(order.totalPrice) +
                      parseFloat(order.shippingPrice)}{" "}
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
