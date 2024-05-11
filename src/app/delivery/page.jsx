"use client";

import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  useDeliveryQuery,
  useDeliveryUpdateQuery,
} from "@/hooks/use-order-query";
import { EyeIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import formatDate from "@/utils/formatDate";
import { useSocket } from "@/components/socketprovider/socket-provider";

export default function Delivery() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");

  const session = useSession();
  const router = useRouter();
  const socket = useSocket();

  const { data: orders } = useDeliveryQuery(session?.data?.user?.id);
  const { mutate: updateDelivery } = useDeliveryUpdateQuery(
    session?.data?.user?.id
  );

  const handleViewDeliveryClick = (orderId) => {
    router.push(`delivery/${orderId}`);
  };

  const handleSetDate = (buyerId, orderInfo, orderId) => {
    updateDelivery({ orderInfo, id: orderId });
    socket?.emit("sendOrderStatus", {
      buyer: buyerId,
      type: "OrderStatus",
      createdAt: Date.now(),
    });
  };

  return (
    <div className="flex flex-col ">
      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col  ">
          <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Delivery List</h1>
              </div>
              <div>Delivery Fee: 5 ETB/1 KM</div>
            </div>
          </header>
          <div className=" rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Delivery Code</TableHead>
                  <TableHead>Total Distance</TableHead>
                  <TableHead>Delivery Fee</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.data.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">
                            {order?.receiverInformation.fullName}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {order?.receiverInformation.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order?.receiverInformation.secretCode}
                    </TableCell>
                    <TableCell>{order?.receiverInformation.address}</TableCell>
                    <TableCell>{order?.shippingPrice / 5} KM</TableCell>
                    <TableCell>{order?.shippingPrice} ETB</TableCell>
                    <TableCell>
                      {order?.deliveryDate
                        ? formatDate(order?.deliveryDate)
                        : "Not Setted"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        onClick={() => handleViewDeliveryClick(order._id)}
                        className="cursor-pointer"
                      >
                        <EyeIcon />
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button className="bg-secondary">
                        {order?.orderStatus}
                      </Button>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        disabled={order?.orderStatus === "Delivered"}
                        onClick={() => setOpen(true)}
                      >
                        {order?.orderStatus === "Delivered"
                          ? "Cannot Rescheduled"
                          : order?.deliveryDate
                          ? "Change Schedule"
                          : "Schedule"}
                      </Button>
                      <Dialog open={open} className="w-fit">
                        <DialogContent className="flex flex-col">
                          <DialogTitle>Schedule Your Delivery</DialogTitle>
                          Delivery Date
                          <Input
                            className="border-none   p-2 border-b-2"
                            placeholder="Delivery Date"
                            autoComplete="off"
                            autoFocus
                            type="date"
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
                          />
                          <div className=" flex gap-2 justify-end">
                            <Button
                              className="bg-red-500"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                const { orderStatus, deliveryDate, ...other } =
                                  order;
                                const orderInfo = {
                                  orderStatus: "Shipping",
                                  deliveryDate: date,
                                  ...other,
                                };
                                handleSetDate(
                                  order.buyerId,
                                  orderInfo,
                                  order?._id
                                );
                                setOpen(false);
                              }}
                            >
                              Send
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
}
