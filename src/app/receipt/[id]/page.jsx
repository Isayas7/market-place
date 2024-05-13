"use client";

import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useOrderStore } from "@/store/order-store";
import { usePayoutStore } from "@/store/payout-store";
import { useSession } from "next-auth/react";
import { useBuyerOrderQuery } from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Reciept = ({ params }) => {
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const { data: orders, isLoading } = useBuyerOrderQuery(
    session?.data?.user?.id
  );

  const cart = useStore(useCart, (state) => state.clearCart);
  const order = useStore(useOrderStore, (state) => state.clearOrders);
  const payout = useStore(usePayoutStore, (state) => state.clearPayouts);

  useEffect(() => {
    cart;
    order;
    payout;
  }, []);

  const recentOrders =
    orders && orders.data && Array.isArray(orders.data)
      ? orders.data.slice(0, params?.id)
      : [];

  // Initialize variables to store total shipping price and total order price
  let totalShippingPrice = 0;
  let totalOrderPrice = 0;

  // Iterate through each order and accumulate shipping prices and total prices
  recentOrders?.forEach((order) => {
    totalShippingPrice += parseFloat(order.shippingPrice);
    totalOrderPrice += parseFloat(order.totalPrice);
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100 w-full">
            Orders Processed successfully
          </h1>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">
              {params.id} order is Processed
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Placed on {formatDate(recentOrders[0]?.createdAt)}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Order
              </p>
            </div>
            <div>Status</div>
            <div>Price</div>
          </div>
          {recentOrders?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  ORD #{index}
                </p>
              </div>
              <div>{item?.orderStatus}</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Products Price: {item?.totalPrice} ETB
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Shipping Price: {item?.shippingPrice} ETB
                </p>
              </div>
            </div>
          ))}

          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">
              Total Shipping Price
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {totalShippingPrice} ETB
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">
              Toatal Products Price
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {totalOrderPrice} ETB
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">
              Total Payout Price
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {totalOrderPrice + totalShippingPrice}ETB
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">Payment Method</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Chapa Payment
            </p>
          </div>
        </div>
        <div className="mt-2">
          <Link href="/products/order">
            <Button
              className="w-full"
              onClick={() => {
                setLoading(!loading);
              }}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
              ) : (
                "Back to Order"
              )}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reciept;
