"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import React, { useState } from "react";
import { useStore } from "zustand";
import Link from "next/link";

import { usePayoutStore } from "@/store/payout-store";
import { usePayQuery } from "@/hooks/use-product-query";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Payment() {
  const myPayouts = useStore(usePayoutStore, (state) => state);
  const { mutate: pay, isSuccess, isLoading, data } = usePayQuery();
  const session = useSession();
  const router = useRouter();

  let totalPrice = 0;
  let totalshippingPrice = 0;

  myPayouts?.payouts?.forEach((payout) => {
    totalPrice += payout.totalPrice;
    totalshippingPrice += payout.shippingPrice;
  });

  const handleCheckout = () => {
    const paymentInformation = {
      payouts: myPayouts.payouts,
      amount: totalPrice + totalshippingPrice,
      userInfo: session.data.user,
    };

    pay(paymentInformation);
  };

  if (isSuccess) {
    console.log(data?.data);
    router.push(data?.data);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Payment</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review your order payment amount the checkout process.
        </p>
        <p className="text-gray-500 dark:text-gray-400">You can cancel it</p>
      </div>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start  ">
        <div className="flex flex-col gap-8">
          <div className="grid gap-6">
            <Card className="overflow-x-scroll">
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price of Item</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Shipping</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myPayouts?.payouts?.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{order.quantityPrice}</TableCell>
                        <TableCell>{order.totalPrice} ETB</TableCell>
                        <TableCell>{order.distance} KM</TableCell>
                        <TableCell>{order.shippingPrice} ETB</TableCell>
                        <TableCell>
                          {order.totalPrice + order.shippingPrice} ETB
                        </TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>
                          <Button
                            className=" text-xs bg-red-500 h-6"
                            onClick={() => {
                              myPayouts.removePayouts(order.address);
                            }}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div className="font-medium">{totalPrice} ETB</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Shipping</div>
                <div className="font-medium">{totalshippingPrice} ETB</div>
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div>Total</div>
                <div className="font-medium">
                  {totalPrice + totalshippingPrice} ETB
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={"payment"} className="w-full">
                <Button className="w-full" onClick={handleCheckout}>
                  {isLoading || isSuccess ? (
                    <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                  ) : (
                    " Proceed checkout"
                  )}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
