import React from "react";
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

export const Price = ({ price, seller, productId }) => {
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
        receiverId: seller,
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
            <CardTitle>ETB {price}</CardTitle>
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
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>Active on</CardDescription>
                </div>
              </div>
            </CardHeader>
          </div>
          <CardContent>
            <Button className="  w-full">Show contact</Button>
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
            <li className="text-[15px]">Lorem ipsum dolor sit amet.</li>
            <li className="text-[15px]">Lorem ipsum dolor sit amet.</li>
            <li className="text-[15px]">Lorem ipsum dolor sit amet.</li>
            <li className="text-[15px]">Lorem ipsum dolor sit amet.</li>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
