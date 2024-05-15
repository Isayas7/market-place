"use client";

import { CustomerCard } from "@/components/chat/customer-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import Message from "@/components/chat/message-card";
import { GrAttachment } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { UseConversationQuery, useSendMessage } from "@/hooks/use-chat-query";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OnlineCustomer from "@/components/chat/online-customer";
import { io } from "socket.io-client";
import { CgMenuLeft } from "react-icons/cg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomSingleImageIpload from "@/components/single-image-uploader";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useSocket } from "@/components/socketprovider/socket-provider";
import { notificationType } from "@/utils/permission";
import { useCreateNotification } from "@/hooks/use-notification-query";

const Chat = () => {
  const [currentConversation, setCurrentConversation] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [onlineUser, setOnlneUser] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sentMessage, setSentMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const session = useSession();
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      text: "",
      image: null,
    },
  });

  const {
    mutate: sendMessage,
    isSuccess,
    isLoading,
  } = useSendMessage(currentConversation);

  const { mutate: pushNotification } = useCreateNotification();

  const { data: conversation } = UseConversationQuery();

  useEffect(() => {
    if (!socket) return;
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        image: data.image,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getUsers", (users) => {
      setOnlneUser(users);
    });
  }, [session,socket]);

  if (session.status === "unauthenticated") {
    route.replace("/");
  }
  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }

  const onSubmit = async (value) => {
    const message = {
      sender: session?.data?.user.id,
      conversationId: currentConversation,
      ...value,
    };

    const notification = {
      user: receiverId,
      notificationType: notificationType.message,
    };

    sendMessage(message);

    pushNotification(notification);

    socket?.emit("sendMessage", {
      senderId: session?.data?.user.id,
      receiverId,
      text: message.text,
      image: message.image,
      createdAt: Date.now(),
    });

    socket?.emit("sendMessageNotification", {
      receiverId,
      type: notificationType.message,
      createdAt: Date.now(),
    });

    setArrivalMessage(null);
    setSentMessage(null);
    setSentMessage({
      sender: session?.data?.user.id,
      text: message.text,
      image: message.image,
      createdAt: Date.now(),
    });

    form.reset({
      text: "",
      image: null,
    });
  };

  return (
    <Card className="flex my-2 mx-2 lg:mx-32 relative h-[calc(100vh-68px)] overflow-hidden ">
      <div
        className={`w-64 xl:w-1/5 border-r-2 p-3  ${
          isHidden
            ? "hidden"
            : " z-[20] bg-white dark:bg-mirage-200  h-full absolute overflow-hidden hover:overflow-y-scroll"
        } xl:block  `}
      >
        <CustomerCard
          name={session?.data?.user?.name}
          message={session?.data?.user?.email}
          time={"customer.amount"}
        />
        <Input placeholder={"Search contacts"} className="max-w-sm" />
        {conversation ? (
          <div className=" space-y-2 h-[85%]  overflow-y-scroll mt-2">
            {conversation?.map((conversation) => (
              <CustomerCard
                key={conversation._id}
                name={`${conversation.member.firstName} ${conversation.member.middleName}`}
                message={conversation.topMessage}
                time={conversation.createdAt}
                onClick={() => {
                  setIsHidden(true);
                  setReceiverId(conversation.member._id);
                  setCurrentConversation(conversation._id);
                  setSentMessage(null);
                  setArrivalMessage(null);
                }}
                isActive={
                  currentConversation === conversation._id ? true : false
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-1/2">
            <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
          </div>
        )}
      </div>

      <div
        className="w-full xl:w-4/5 z-0"
        onClick={() => !isHidden && setIsHidden(true)}
      >
        <div className="border-b-2 flex gap-3 pl-4 py-2 h-[10%] items-center">
          <CgMenuLeft
            className="text-2xl cursor-pointer block xl:hidden"
            onClick={() => setIsHidden(!isHidden)}
          />
          {onlineUser.map(
            (user,index) =>
              user?.user?.id !== session?.data?.user?.id && (
                <OnlineCustomer
                  key={index}
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  name={
                    user?.user?.name?.includes(" ")
                      ? user?.user?.name.split(" ")[0]
                      : user?.user?.name
                  }
                  onClick={() => setCurrentConversation(currentConversation)}
                />
              )
          )}
        </div>

        <div
          className="overflow-y-scroll h-[80%] p-4"
          onClick={() => setIsHidden(true)}
        >
          {currentConversation ? (
            <Message
              currentConversation={currentConversation}
              arrivalMessage={arrivalMessage}
              sentMessage={sentMessage}
            />
          ) : (
            <div className="text-4xl mt-[20%] text-center text-gray-300 dark:text-gray-500">
              Open the conversation to start chatting
            </div>
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`h-[10%] ${
              currentConversation === "" ? "hidden" : "block"
            }`}
          >
            <div className="flex gap-2 border-t-2 h-full justify-between  items-center">
              <div className={`h-full w-full `}>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormControl>
                        <input
                          className="w-full h-[100%] rounded-none border-none border-t-2 p-4 dark:bg-mirage-200 focus:outline-none focus:border-none "
                          placeholder="Type message"
                          {...field}
                          disabled={currentConversation !== "" ? false : true}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`flex p-2 gap-2 ${selectedImage ? "hidden" : ""}`}
                disabled={currentConversation !== "" ? false : true}
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomSingleImageIpload
                          name={<GrAttachment className="text-2xl" />}
                          value={field.value}
                          onChange={(url) => {
                            field.onChange(url);
                            setSelectedImage(url);
                            setIsOpen(true);
                          }}
                          onRemove={() => field.onChange("")}
                          className="size-8 dark:hover:bg-mirage-200 border-none rounded-none p-2"
                          disabled={currentConversation !== "" ? false : true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Dialog open={isOpen} className="w-fit">
                  <DialogContent className="flex flex-col">
                    <DialogTitle>Send an Image</DialogTitle>
                    <Image
                      src={selectedImage}
                      width={700}
                      height={100}
                      alt="image"
                    />
                    <input
                      className="border-none focus:outline-none  p-2 border-b-2"
                      placeholder="Type message"
                      autoComplete="off"
                      autoFocus
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <div className=" flex gap-2 justify-end">
                      <Button
                        className="bg-red-500"
                        onClick={() => {
                          form.reset({
                            text: "",
                            image: null,
                          });
                          setIsOpen(false);
                          setSelectedImage("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          onSubmit({ text: message, image: selectedImage });
                          form.reset({
                            text: "",
                            image: null,
                          });
                          setIsOpen(false);
                          setSelectedImage("");
                          setMessage("");
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  disabled={isLoading}
                  className="w-full ml-auto text-xl"
                  type="submit"
                >
                  <IoIosSend
                    className="text-3xl cursor-pointer"
                    disabled={currentConversation !== "" ? false : true}
                  />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default Chat;
