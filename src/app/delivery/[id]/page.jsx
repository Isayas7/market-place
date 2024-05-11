"use client";

import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, TruckIcon } from "lucide-react";
import { useSingleOrderQuery } from "@/hooks/use-order-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

import { useSocket } from "@/components/socketprovider/socket-provider";

export default function DeliveryDetail({ params }) {
  const session = useSession();
  const socket = useSocket();

  const { id } = params;

  const { data: order } = useSingleOrderQuery(id);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order #{order?.data?._id}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {order?.data?.receiverInformation?.fullName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {order?.data?.receiverInformation.address}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {order?.data?.receiverInformation.phoneNumber}
            </p>
            <Button>Contact Buyer</Button>
          </div>
          <div className="flex flex-col">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mb-2"
              disabled={order?.data?.orderStatus === "Delivered"}
            >
              {order?.data?.orderStatus}
            </Button>

            <Link
              href={`receiverlocation/${order?.data?._id}`}
              className="w-full"
            >
              <Button>Get Receiver Location</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>size</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order?.data?.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {item.title.length > 10
                            ? `${item.title.slice(0, 10)}...`
                            : item.title}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.color.join("| ")}</TableCell>
                        <TableCell>{item.size.join("| ")}</TableCell>
                        <TableCell>
                          <Link href={`sellerlocation/${item?.productId._id}`}>
                            <Button>
                              <EyeIcon />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>Delivery Fee</span>
                    <span>{order?.data?.shippingPrice} ETB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total distance</span>
                    <span>{order?.data?.shippingPrice / 5}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>{order?.data?.shippingPrice - 10} ETB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TruckIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium">In Transit</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Estimated delivery:
                      {order?.data?.deliveryDate
                        ? formatDate(order?.data?.deliveryDate)
                        : "Not Scheduled"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
