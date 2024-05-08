"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
  CardDescription,
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePayoutStore } from "@/store/payout-store";
import { Badge, CircleIcon } from "lucide-react";
import { usePayQuery } from "@/hooks/use-product-query";
import { useSession } from "next-auth/react";

import { Check, ChevronsUpDown } from "lucide-react";
import { address } from "@/utils/constant";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export default function Payment() {
  const myPayouts = useStore(usePayoutStore, (state) => state);
  const { mutate: pay, isSuccess, isLoading, data } = usePayQuery();
  const session = useSession();
  const router = useRouter();

  const [myAddress, setMyAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [warning, setWarning] = useState(false);

  let totalPrice = 0;
  let totalshippingPrice = 0;

  myPayouts?.payouts?.forEach((payout) => {
    totalPrice += payout.totalPrice;
    totalshippingPrice += payout.shippingPrice;
  });

  const handleCheckout = () => {
    if (!myAddress || !fullName || !phoneNumber || !secretCode) {
      setWarning(true);
    } else {
      const paymentInformation = {
        payouts: myPayouts.payouts,
        amount: totalPrice + totalshippingPrice,
        receiverInformation: {
          fullName: fullName,
          phoneNumber: phoneNumber,
          address: myAddress,
          secretCode: secretCode,
        },
        userInfo: session.data.user,
      };

      pay(paymentInformation);
    }
  };

  if (isSuccess) {
    router.push(data.data);
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
            <Card>
              <CardHeader>
                <CardTitle>Receiver Detail</CardTitle>
                <CardDescription>
                  Enter receiver details properly
                </CardDescription>
              </CardHeader>
              <CardContent className=" flex flex-col sm:flex-row w-full gap-2">
                <div className="w-full ">
                  <div className="space-y-2">
                    <Label>Receiver full Name</Label>
                    <Input
                      type="text"
                      className={cn(
                        !fullName && warning && "border-2 border-red-500"
                      )}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Receiver Phone Number</Label>
                    <Input
                      type="tel"
                      className={cn(
                        !phoneNumber && warning && "border-2 border-red-500"
                      )}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div className="space-y-2">
                    <Label>Receiver Address</Label>
                    <div className="space-y-2 w-full">
                      <Popover className="w-full">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-full ",
                              !myAddress && "text-muted-foreground",
                              warning && !myAddress && "border-2 border-red-500"
                            )}
                          >
                            {myAddress ? myAddress : "Select address"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0 h-64 w-full ">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No address found.</CommandEmpty>
                            <CommandGroup className="overflow-y-scroll">
                              {address.map((add, index) => (
                                <CommandItem
                                  value={add.city}
                                  key={index}
                                  onSelect={() => {
                                    setMyAddress(add.city);
                                    setWarning(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      add.city === myAddress
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {add.city}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secret code</Label>
                    <Input
                      type="number"
                      className={cn(
                        !secretCode && warning && "border-2 border-red-500"
                      )}
                      onChange={(e) => setSecretCode(e.target.value)}
                      placeholder="Secret Code"
                    />
                    <div className="text-xs">
                      The receiver must know while receiving the items
                    </div>
                  </div>
                </div>
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
                  Proceed checkout
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
