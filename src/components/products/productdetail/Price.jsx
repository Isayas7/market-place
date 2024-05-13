import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useCreateConversation, useSendMessage } from "@/hooks/use-chat-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Contact, PhoneIcon } from "lucide-react";

export const Price = ({ price, seller, productId, promotion }) => {
  const [contact, setContact] = useState("Show Contact");
  const session = useSession();
  const router = useRouter();
  const path = usePathname();

  const {
    mutateAsync: createConversation,
    isSuccess,
    isLoading,
    data,
  } = useCreateConversation();
  const { mutate: sendMessage } = useSendMessage();

  const handleStart = async () => {
    if (session.status === "unauthenticated") {
      localStorage.setItem("prevpath", path);
      router.push("/login");
    } else {
      const conversation = {
        senderId: session.data.user.id,
        receiverId: seller._id,
      };
      const response = await createConversation(conversation);

      const message = {
        sender: session.data.user.id,
        conversationId: response.data._id,
        product: productId,
      };
      sendMessage(message);
      router.push("/chat");
    }
  };

  return (
    <div className="flex  flex-col sm:flex-row md:flex-col  gap-6">
      <div className="flex flex-col gap-6 w-full sm:w-1/2 md:w-full">
        <Card>
          <CardHeader>
            <CardTitle>
              {promotion?.amount &&
              new Date(promotion.expireDate) > new Date() ? (
                <>
                  <div className="flex flex-col  gap-2">
                    <div className="text-lg font-medium text-gray-500 line-through dark:text-gray-400">
                      {price} ETB
                    </div>
                    <div className="text-2xl font-bold">
                      {price - promotion.amount} ETB
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold">{price} ETB</div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="  w-full  text-base  ">Request call back</Button>
          </CardContent>
        </Card>

        <Card>
          <div className="flex gap-6 ">
            <CardHeader>
              <div className="flex gap-6 ">
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="man"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
                <div>
                  <CardTitle classname="flex flex-col gap-1">
                    <div> {seller?.firstName + " " + seller?.middleName}</div>
                  </CardTitle>
                  <CardDescription>
                    <div>{seller?.address}</div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </div>
          <CardContent>
            <Button
              className=" flex justify-center items-center gap-2 w-full"
              onClick={() => setContact(seller.phoneNumber)}
            >
              <PhoneIcon />
              <div> {contact}</div>
            </Button>
            <Button className="  w-full mt-3" onClick={handleStart}>
              Start chat
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="w-full sm:w-1/2 md:w-full h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Safety tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="xs">
              Avoid paying in advance, even for delivery. <br />
              Meet with the seller at a safe public place <br />
              Inspect the item and ensure it's exactly what you want <br />
              Make sure that the packed item is the one you've inspected <br />
              Only pay if you're satisfied
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};