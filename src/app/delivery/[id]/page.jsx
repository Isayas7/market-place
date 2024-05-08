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
import {
  useOrderUpdateQuery,
  useSingleDeliveryQuery,
} from "@/hooks/use-order-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSocket } from "@/components/socketprovider/socket-provider";

export default function DeliveryDetail({ params }) {
  const [open, setOpen] = useState(false);

  const session = useSession();
  const socket = useSocket();

  const { id } = params;

  const { data: delivery } = useSingleDeliveryQuery(id);
  const { mutate: updateOrder } = useOrderUpdateQuery();

  const handleDelivery = () => {
    const { orderStatus, ...other } = delivery?.data?.order;
    const orderInfo = { orderStatus: "Delivered", ...other };
    updateOrder({ orderInfo, id: delivery?.data?.order?._id });
    socket?.emit("sendOrderStatus", {
      buyer: delivery?.data?.order?.userId,
      type: "OrderStatus",
      createdAt: Date.now(),
    });
  };

  if (open) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure do you deliver this order?"
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The order will permanently set as
              delivered
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelivery}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order #{delivery?.data?._id}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {delivery?.data?.order.receiverInformation.fullName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {delivery?.data?.order.receiverInformation.address}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {delivery?.data?.order.receiverInformation.phoneNumber}
            </p>
            <Button>Contact Buyer</Button>
          </div>
          <div className="flex flex-col">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mb-2"
              disabled={delivery?.data?.order.orderStatus === "Delivered"}
            >
              {delivery?.data?.order.orderStatus === "Delivered"
                ? "Marked as Delivered"
                : "Mark as Delivered"}
            </Button>

            <Link
              href={{
                pathname: "receiverlocation",
                query: {
                  _id: delivery?.data?.order._id,
                },
              }}
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
                    {delivery?.data?.order.items.map((item, index) => (
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
                          <Link
                            href={{
                              pathname: "sellerlocation",
                              query: {
                                _id: item?.productId,
                              },
                            }}
                          >
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
                    <span>{delivery?.data?.order?.shippingPrice} ETB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total distance</span>
                    <span>{delivery?.data?.order?.shippingPrice / 5}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>{delivery?.data?.order?.shippingPrice - 10} ETB</span>
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
                      {delivery?.data?.deliveryDate
                        ? formatDate(delivery?.data?.deliveryDate)
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
