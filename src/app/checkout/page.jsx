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

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useOrderStore } from "@/store/order-store";
import { useStore } from "zustand";

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
import { usePayoutStore } from "@/store/payout-store";
import { useRouter } from "next/navigation";

const CheckoutLocation = dynamic(
  () => import("@/components/checkout/checkout-location"),
  {
    ssr: false,
  }
);
export default function Checkout() {
  const router = useRouter();
  const myorders = useStore(useOrderStore, (state) => state);
  const setPayoutData = useStore(usePayoutStore, (state) => state);

  const [location, setLocation] = useState(null);
  const [warning, setWarning] = useState(false);

  const handleNext = () => {
    if (location == null) {
      setWarning(true);
    } else {
      const ordersWithShipping = calculateTotalPriceWithShipping(
        myorders?.orders,
        location
      );
      setPayoutData.addPayout(ordersWithShipping);
      router.push("payment");
    }
  };

  let totalPrice = 0;

  myorders?.orders.forEach((order) => {
    totalPrice += order.totalPrice;
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review your order categorize to complete the checkout process.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          The order is catagorized by address you order
        </p>
      </div>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start p-4 md:p-8 lg:p-12">
        <div className="flex flex-col gap-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myorders?.orders?.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{order.quantityPrice}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{order.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div
              className={`${
                !location && warning && "border-2 border-red-500 rounded-lg"
              }`}
            >
              <CheckoutLocation setLocation={setLocation} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div className="font-medium">{totalPrice} ETB</div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>Shipping per KM</div>
                <div className="font-medium">5.00 ETB/1KM</div>
              </div>
              <Separator />
              <div className="flex flex-col">
                <div>Where you want to order?</div>
                <Separator />

                <Separator />
                <div className={`font-medium flex `}>
                  Location:
                  <div
                    className={`font-medium ${
                      location ? "text-jade" : "text-red-500"
                    }`}
                  >
                    {location ? "Selected" : "Not Selceted"}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateTotalPriceWithShipping(orders, userLocation) {
  orders.forEach((order) => {
    const addressLocation = order.location;
    let totalDistance = 0;
    let smallestDistance = Infinity;

    order.items.forEach((item, index) => {
      const itemLocation = item.location;
      const distanceToItem = calculateDistance(
        userLocation[0],
        userLocation[1],
        itemLocation[0],
        itemLocation[1]
      );
      smallestDistance > distanceToItem
        ? (smallestDistance = distanceToItem)
        : smallestDistance;

      if (index > 0) {
        const previousItemLocation = order.items[index - 1].location;
        const distanceBetweenItems = calculateDistance(
          previousItemLocation[0],
          previousItemLocation[1],
          itemLocation[0],
          itemLocation[1]
        );
        totalDistance += distanceBetweenItems;
      }
    });

    const shippingPrice = calculateShippingPrice(
      totalDistance + smallestDistance
    );
    order.distance = Math.ceil(totalDistance + smallestDistance);
    order.shippingPrice = Math.ceil(shippingPrice);
    order.receiverLocation = userLocation;
  });

  return orders;
}

// Function to calculate shipping price based on distance
function calculateShippingPrice(distance) {
  const shippingRate = 5; // 5 ETB per kilometer
  return distance * shippingRate;
}
