"use client";

import OrderDetailSkeleton from "@/components/order/order-detail-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateConversation, useSendMessage } from "@/hooks/use-chat-query";
import { useSellerSingleOrderQuery } from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderDetail = ({ params }) => {
  const { data: orders } = useSellerSingleOrderQuery();
  const order = orders?.data[0];

  const {
    mutateAsync: createConversation,
    isSuccess,
    isLoading,
    data,
  } = useCreateConversation();
  const { mutate: sendMessage } = useSendMessage();

  const handleStart = async (seller) => {
    const conversation = {
      senderId: session?.data?.user?.id,
      receiverId: seller,
    };
    const response = await createConversation(conversation);

    const message = {
      sender: session?.data?.user.id,
      conversationId: response?.data._id,
      text: "You have orders from my store",
    };
    sendMessage(message);
    router.push("/chat");
  };
  return !order ? (
    <OrderDetailSkeleton />
  ) : (
    <div className="grid min-h-screen w-full overflow-hidden ">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-xl flex gap-1 text-jade">
              {"#" + order?._id.slice(0, 4)}
              <span className="font-normal hidden md:block text-gray-500 dark:text-gray-400">
                {order?.buyerId?.firstName + " " + order?.buyerId?.middleName}
              </span>
              <span className="font-normal  hidden md:block text-gray-500 dark:text-gray-400">
                on {formatDate(order?.createdAt)}
              </span>
            </h1>
          </div>
          {/* <div className="grid lg:grid-cols-6 gap-6"> */}
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
                      {"#" + order?._id}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>Order Date</div>
                    <div className="ml-auto font-medium">
                      {formatDate(order?.createdAt)}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="grid gap-2">
                    <div className="font-medium">Delivery Personnel</div>
                    <div>
                      {order?.deliveryPersonnelId?.firstName}
                      <br />
                      {order?.deliveryPersonnelId?.middleName}
                      <br />
                      {order?.deliveryPersonnelId?.email}
                    </div>
                    <Button size="sm">Make Chat</Button>
                  </div>
                  <div className="grid gap-2">
                    <div className="font-medium">Buyer</div>
                    <div>
                      {order?.buyerId?.firstName}
                      <br />
                      {order?.buyerId?.middleName}
                      <br />
                      {order?.buyerId?.email}
                    </div>
                    <Button size="sm" onClick={() => handleStart(buyerId._id)}>
                      Make Chat
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="font-medium">Order Code</div>
                    <div>{order?.receiverInformation?.secretCode}</div>
                  </div>
                  <div>
                    <div className="font-medium">Status</div>
                    <div>Order Status: {" " + order?.orderStatus}</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center">
                  <div className="font-medium">Items Price</div>
                  <div className="ml-auto text-2xl font-bold text-jade">
                    {order?.totalPrice + " ETB"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-jade">Items Ordered</CardTitle>
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
                    {order?.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="hidden md:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height={200}
                            src={item?.productId?.productImage[0]}
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
                          <Link href={`/products/${item?.productId?._id}`}>
                            <Button size="icon">
                              <EyeIcon className="h-4 w-4" />
                              <span className="sr-only">View</span>
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
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default OrderDetail;
