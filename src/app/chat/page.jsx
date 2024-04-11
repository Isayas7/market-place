"use client";

import { CustomerCard } from "@/components/chat/friend-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import React, { useState } from "react";
import Message from "@/components/chat/message-card";
import { GrAttachment } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { UseConversationQuery, UseSendMessage } from "@/hooks/use-chat-query";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Chat = () => {
  const [currentConversation, setCurrentConversation] = useState("");
  const [text, setText] = useState("");

  const session = useSession();
  const route = useRouter();

  const { data: conversation } = UseConversationQuery();

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
  const { mutate: sendMessage, isSuccess, isLoading } = UseSendMessage();

  const handleSubmit = () => {
    const message = {
      sender: session?.data.user.id,
      text: text,
      conversationId: currentConversation,
    };
    sendMessage(message);
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-screen">
      <Card className="flex   sticky top-[70px]  h-[90%] ">
        <div className="w-1/4 border-r-2 p-3 hidden xl:block  ">
          <CustomerCard
            name={session?.data?.user?.name}
            message={"customer.status"}
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
                    setCurrentConversation(conversation._id);
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

        <div className="w-full xl:w-3/4">
          <div className="border-b-2 flex gap-2 pl-4 py-2 h-[13%] items-center">
            {/* Avatars and details */}
          </div>

          <div className="overflow-y-scroll h-[77%] p-4">
            {currentConversation ? (
              <Message currentConversation={currentConversation} />
            ) : (
              <div className="text-4xl mt-[20%] text-center text-gray-300 dark:text-gray-500">
                Open the conversation to start chatting
              </div>
            )}
          </div>
          <div className="flex gap-2 border-t-2 h-[10%]  items-center ">
            <textarea
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"Type message"}
              value={text}
              className="w-full h-full rounded-none border-none border-t-2 p-4 dark:bg-mirage-200 focus:outline-none focus:border-none "
            />
            <div className="flex p-2 space-x-2 cursor-pointer items-center">
              <GrAttachment className="text-2xl" />
              <IoIosSend
                onClick={handleSubmit}
                className="text-3xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
