"use client";

import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { usePayoutStore } from "@/store/payout-store";

const Reciept = () => {
  const cart = useStore(useCart, (state) => state.clearCart);
  const order = useStore(useOrderStore, (state) => state.clearOrders);
  const payout = useStore(usePayoutStore, (state) => state.clearPayouts);

  useEffect(() => {
    cart;
    order;
    payout;
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Order Receipt
          </h1>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Download Receipt</span>
            </Button>
            <Button size="icon" variant="outline">
              <PrinterIcon className="h-4 w-4" />
              <span className="sr-only">Print Receipt</span>
            </Button>
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">Order #3210</p>
            <p className="text-gray-500 dark:text-gray-400">
              Placed on June 23, 2022
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                alt="Product Image"
                className="rounded-md"
                height={64}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width={64}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Glimmer Lamps
                </p>
                <p className="text-gray-500 dark:text-gray-400">Quantity: 2</p>
              </div>
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              $120.00
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                alt="Product Image"
                className="rounded-md"
                height={64}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width={64}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Aqua Filters
                </p>
                <p className="text-gray-500 dark:text-gray-400">Quantity: 3</p>
              </div>
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              $49.00
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              $169.00
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">Discount</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              -$19.00
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">Total</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              $150.00
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
          <Link href="products/order">
            <Button className="w-full">Back to Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reciept;
