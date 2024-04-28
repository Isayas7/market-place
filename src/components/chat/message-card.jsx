import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseChatQuery } from "@/hooks/use-chat-query";
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

const Message = ({ currentConversation, arrivalMessage, aspectRatio }) => {
  const session = useSession();
  const messagesEndRef = useRef(null);

  const {
    data: chat,
    refetch: refetchChat,
    isLoading: chatLoading,
  } = UseChatQuery(currentConversation);

  useEffect(() => {
    if (currentConversation) {
      refetchChat();
    }
  }, [currentConversation, arrivalMessage]);

  // Scroll to the end of messages when chat or currentConversation changes
  useEffect(() => {
    scrollToBottom();
  }, [chat, currentConversation]);

  // Function to scroll to the end of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  <ContextMenu>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>;

  return (
    <>
      {chatLoading ? (
        <div className="flex items-center justify-center h-1/2">
          <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
        </div>
      ) : (
        <>
          {chat?.map((conversation) => (
            <div
              key={conversation._id}
              className={`flex flex-col w-full  ${
                conversation.sender === session?.data.user.id ? "items-end" : ""
              }`}
            >
              <div className="flex space-x-2 mt-4  max-w-[70%] lg:max-w-[40%] ">
                {(conversation.text || conversation.image) && (
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
                              "w-full h-full  object-cover rounded-md bg-slate-300 dark:bg-white",
                              aspectRatio === "portrait"
                                ? "aspect-[3/4]"
                                : "aspect-square"
                            )}
                          />
                        </div>
                      )}
                      {conversation.product && (
                        <CustomCard
                          product={conversation.product}
                          className="cursor-pointer"
                        />
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
                    <ContextMenuItem>Edit</ContextMenuItem>
                    <ContextMenuItem>Delete</ContextMenuItem>
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
