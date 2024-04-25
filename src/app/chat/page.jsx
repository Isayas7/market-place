"use client";

import { CustomerCard } from "@/components/chat/customer-card";
import { Card } from "@/components/ui/card";
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

const Chat = () => {
  const [currentConversation, setCurrentConversation] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [text, setText] = useState("");
  const [onlineUser, setOnlneUser] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const session = useSession();
  const route = useRouter();

  const { mutate: sendMessage, isSuccess, isLoading } = useSendMessage();
  const { data: conversation } = UseConversationQuery();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket?.current.emit("addUser", session?.data?.user);
    socket?.current.on("getUsers", (users) => {
      setOnlneUser(users);
    });
  }, [session]);

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

  const handleSubmit = () => {
    const message = {
      sender: session?.data?.user.id,
      text: text,
      conversationId: currentConversation,
    };

    sendMessage(message);
    socket?.current.emit("sendMessage", {
      senderId: session?.data?.user.id,
      receiverId,
      text,
    });
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setText((prevMessage) => prevMessage + "\n");
    } else if (event.key === "Enter" && text.trim() !== "") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="flex  my-3 relative h-[calc(100vh-81px)] overflow-hidden ">
      <div
        className={`w-64 xl:w-1/4 border-r-2 p-3  ${
          isHidden
            ? "hidden"
            : " z-[20] bg-white dark:bg-mirage-200  h-full absolute overflow-hidden hover:overflow-y-scroll"
        } xl:block  `}
      >
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
                  setIsHidden(true);
                  setReceiverId(conversation.member._id);
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

      <div
        className="w-full xl:w-3/4 z-0"
        onClick={() => !isHidden && setIsHidden(true)}
      >
        <div className="border-b-2 flex gap-3 pl-4 py-2 h-[13%] items-center">
          <CgMenuLeft
            className="text-2xl cursor-pointer block xl:hidden"
            onClick={() => setIsHidden(!isHidden)}
          />
          {onlineUser.map(
            (user) =>
              user?.user?.id !== session?.data?.user?.id && (
                <OnlineCustomer
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
          className="overflow-y-scroll h-[77%] p-4"
          onClick={() => setIsHidden(true)}
        >
          {currentConversation ? (
            <Message
              currentConversation={currentConversation}
              arrivalMessage={arrivalMessage}
            />
          ) : (
            <div className="text-4xl mt-[20%] text-center text-gray-300 dark:text-gray-500">
              Open the conversation to start chatting
            </div>
          )}
        </div>
        <div className="flex gap-2 border-t-2 h-[10%]  items-center ">
          <input
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Type message"}
            value={text}
            disabled={currentConversation !== "" ? false : true}
            className="w-full h-full rounded-none border-none border-t-2 p-4 dark:bg-mirage-200 focus:outline-none focus:border-none "
          />
          <div
            className="flex p-2 space-x-2 cursor-pointer items-center"
            disabled={currentConversation !== "" ? false : true}
          >
            <GrAttachment className="text-2xl" />
            <IoIosSend
              onClick={handleSubmit}
              className="text-3xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Chat;
