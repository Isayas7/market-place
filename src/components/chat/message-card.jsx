import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseChatQuery, useDeleteMessageQuery } from "@/hooks/use-chat-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { format } from "timeago.js";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CustomCard } from "../custom-card";
import { RiShareForwardLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

const Message = ({
  currentConversation,
  arrivalMessage,
  aspectRatio,
  sentMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(false);
  const [expireDate, setExpireDate] = useState(false);

  const router = useRouter();
  const session = useSession();
  const messagesEndRef = useRef(null);

  let {
    data: chat,
    refetch: refetchChat,
    isLoading: chatLoading,
  } = UseChatQuery(currentConversation);

  const {
    mutate: deleteMessage,
    isSuccess,
    isLoading,
  } = useDeleteMessageQuery(currentConversation);

  // Scroll to the end of messages when chat or currentConversation changes
  useEffect(() => {
    scrollToBottom();
  }, [chat, currentConversation, arrivalMessage, sentMessage]);

  // Function to scroll to the end of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleForward = (product) => {
    router.push(`products/${product._id}`);
  };

  // adding arrivalMessage and sent Message to chat
  if (arrivalMessage) {
    !chat.includes(arrivalMessage) && chat.push(arrivalMessage);
  }
  if (sentMessage) {
    !chat.includes(sentMessage) && chat.push(sentMessage);
  }
  return (
    <>
      {chatLoading ? (
        <div className="flex items-center justify-center h-1/2">
          <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
        </div>
      ) : (
        <>
          {chat?.map((conversation, index) => (
            <div
              key={index}
              className={`flex flex-col w-full  ${
                conversation.sender === session?.data.user.id ? "items-end" : ""
              }`}
            >
              <div className="flex space-x-2 mt-4  max-w-[90%] sm:max-w-[80%] lg:max-w-[80%] xl:max-w-[40%] ">
                {(conversation.text ||
                  conversation.image ||
                  conversation.product) && (
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div
                      className={` flex flex-col   rounded-md relative  text-black ${
                        conversation.sender === session?.data.user.id
                          ? "bg-swansdown"
                          : "bg-message dark:bg-message-200 text-black dark:text-white "
                      }  `}
                    >
                      {conversation.image && (
                        <div className="min-w-20">
                          <Image
                            src={conversation.image}
                            alt="image"
                            width={700}
                            height={800}
                            className={cn(
                              "w-full h-full shadow-lg  object-cover rounded-md bg-slate-300 dark:bg-white",
                              aspectRatio === "portrait"
                                ? "aspect-[3/4]"
                                : "aspect-square"
                            )}
                          />
                        </div>
                      )}
                      {conversation.product && (
                        <div>
                          <div className="flex justify-between items-center p-2 font-bold cursor-pointer ">
                            <div
                              className="text-sm flex justify-center"
                              onClick={() =>
                                handleForward(conversation.product)
                              }
                            >
                              <RiShareForwardLine className="mr-2" />
                              {conversation.sender === session?.data.user.id
                                ? "Forwarded from Product List"
                                : "Your Customer forwarded from your store"}
                            </div>
                            {conversation.sender !== session?.data.user.id && (
                              <Button onClick={() => setIsOpen(true)}>
                                Make Discount
                              </Button>
                            )}
                            <Dialog
                              open={isOpen}
                              className="w-fit border-2 border-jade"
                            >
                              <DialogContent className="flex flex-col dark:bg-mirage-500">
                                <DialogTitle>Make Discount</DialogTitle>
                                <Separator />
                                Amount
                                <Input
                                  className="border-none focus:outline-none  p-2 border-b-2"
                                  placeholder="Discount amount"
                                  autoComplete="off"
                                  type="number"
                                  autoFocus
                                  onChange={(e) => {
                                    setAmount(e.target.value);
                                  }}
                                />
                                Expire Date
                                <Input
                                  className="border-none focus:outline-none  p-2 border-b-2"
                                  placeholder="Expire Date"
                                  autoComplete="off"
                                  type="date"
                                  autoFocus
                                  onChange={(e) => {
                                    setExpireDate(e.target.value);
                                  }}
                                />
                                <div className=" flex gap-2 justify-end">
                                  <Button
                                    className="bg-red-500"
                                    onClick={() => {
                                      setIsOpen(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setIsOpen(false);
                                    }}
                                  >
                                    Set
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <CustomCard
                            product={conversation.product}
                            className={`cursor-pointer text-black ${
                              conversation.sender === session?.data.user.id
                                ? "bg-swansdown"
                                : "bg-message dark:bg-message-200 text-black dark:text-white "
                            }`}
                          />
                        </div>
                      )}
                      {conversation.text && (
                        <div className="min-w-28 p-3 pb-5">
                          {conversation.text}
                        </div>
                      )}
                      {(conversation.text || conversation.image) && (
                        <div
                          className={`text-sm absolute bottom-1 right-1 whitespace-nowrap ${
                            conversation.text
                              ? ""
                              : "bg-black p-1 rounded-md bg-opacity-50 text-white"
                          } `}
                        >
                          {format(conversation.createdAt)}
                        </div>
                      )}
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    {conversation.sender === session?.data.user.id && (
                      <>
                        <ContextMenuItem>Edit</ContextMenuItem>

                        <ContextMenuItem
                          onClick={() => {
                            deleteMessage(conversation._id);
                          }}
                        >
                          Delete
                        </ContextMenuItem>
                      </>
                    )}
                    <ContextMenuItem>Replay</ContextMenuItem>
                    <ContextMenuItem>Copy</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </div>
          ))}

          {/* Empty div to scroll to */}
          <div ref={messagesEndRef} />
        </>
      )}
    </>
  );
};

export default Message;
