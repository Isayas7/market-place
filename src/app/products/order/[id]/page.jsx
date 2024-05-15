"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  EyeIcon,
} from "lucide-react";
import {
  useConfirmDeliveryQuery,
  useSingleOrderQuery,
} from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import OrderDetailSkeleton from "@/components/order/order-detail-skeleton";
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
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const OrderDetail = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [myloading, setMyLoading] = useState(false);

  const session = useSession();
  const socket = useSocket();

  const { data: order, isLoading } = useSingleOrderQuery(params.id);

  const { mutate: confirmDelivery, isLoading: loading } =
    useConfirmDeliveryQuery(params.id);

  const handleConfiramtion = () => {
    const { orderStatus, ...other } = order?.data;
    const orderInfo = { orderStatus: "Delivered", ...other };
    confirmDelivery({
      orderInfo,
      id: order?.data?._id,
    });

    socket?.emit("sendOrderStatus", {
      seller: order?.data.order?.buyerId,
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
              Your order has been delivered. Please confirm receipt.
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. If order is not delivered cancel
              this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfiramtion}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return isLoading ? (
    <OrderDetailSkeleton />
  ) : (
    <div className="grid min-h-screen w-full overflow-hidden ">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="outline">
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-semibold text-lg md:text-xl flex gap-1 text-jade">
              {"#" + order?.data?._id.slice(0, 4)}
              <span className="font-normal hidden md:block text-gray-500 dark:text-gray-400">
                {order?.data?.buyerId?.firstName +
                  " " +
                  order?.data?.buyerId?.middleName}
              </span>
              <span className="font-normal  hidden md:block text-gray-500 dark:text-gray-400">
                on {formatDate(order?.data?.createdAt)}
              </span>
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="icon" variant="outline">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button size="icon" variant="outline">
                <ChevronRightIcon className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-jade">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <div>Order #</div>
                      <div className="ml-auto font-medium">
                        {"#" + order?.data?._id}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>Order Date</div>
                      <div className="ml-auto font-medium">
                        {formatDate(order?.data?.createdAt)}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="font-medium">Shipping Information</div>
                    <div>
                      {order?.data?.receiverInformation?.fullName}
                      <br />
                      {order?.data?.receiverInformation?.phoneNumber}
                      <br />
                      {order?.data?.receiverInformation?.address}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between gap-2">
                    <div>
                      <div className="font-medium">Delivery Code</div>
                      <div>{order?.data?.receiverInformation?.secretCode}</div>
                    </div>
                    <div>
                      <div className="font-medium">Status</div>
                      <div>
                        Order Status:{" "}
                        {order?.data?.orderStatus === "Pending" ? (
                          <Badge
                            className="border-yellow-600 bg-white dark:bg-gray-950"
                            variant="outline"
                          >
                            <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-yellow-300 text-yellow-300" />
                            {order?.data?.orderStatus}
                          </Badge>
                        ) : (
                          <Badge
                            className="border-jade bg-white dark:bg-gray-950"
                            variant="outline"
                          >
                            <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
                            {order?.data?.orderStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <div className="font-medium">Total Products Price</div>
                    <div className="ml-auto text-2xl font-bold text-jade">
                      {order?.data?.totalPrice + " ETB"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium">Total Shipping Price</div>
                    <div className="ml-auto text-2xl font-bold text-jade">
                      {order?.data?.shippingPrice + " ETB"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium">Total Price</div>
                    <div className="ml-auto text-2xl font-bold text-jade">
                      {parseFloat(order?.data?.totalPrice) +
                        parseFloat(order?.data?.shippingPrice)}{" "}
                      ETB
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-jade">Products Ordered</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] hidden md:table-cell">
                          Image
                        </TableHead>
                        <TableHead className="max-w-[150px]">Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order?.data?.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="hidden md:table-cell">
                            <Image
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height={200}
                              src={item.productId.productImage[0]}
                              width={200}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.productId.title}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price + " ETB"}</TableCell>
                          <TableCell>
                            {item.price * item.quantity + " ETB"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Link href={`/products/${item.productId._id}`}>
                              <Button
                                size="icon"
                                onClick={() => setMyLoading(!myloading)}
                              >
                                {myloading ? (
                                  <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
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
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-jade">
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center">
                    <div>Shipping Method</div>
                    <div className="ml-auto font-medium">Standard Delivery</div>
                  </div>

                  <div className="flex items-center">
                    <div>Estimated Delivery</div>
                    <div className="ml-auto font-medium">
                      {formatDate(order?.data?.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-jade">
                    Payment and Delivery Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center">
                    <div>Payment Method</div>
                    <div className="ml-auto font-medium">Chapa CO</div>
                  </div>
                  <div className="flex items-center">
                    <div>Confirm</div>
                    <div className="ml-auto font-medium">
                      <Button
                        size="sm"
                        disabled={order?.data.orderStatus === "Delivered"}
                        onClick={() => setOpen(true)}
                      >
                        {loading ? (
                          <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                        ) : order?.data.orderStatus === "Delivered" ? (
                          "Marked as Delivered"
                        ) : (
                          "Mark as Delivered"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetail;
