import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseChatQuery } from "@/hooks/use-chat-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";

const Message = ({ currentConversation }) => {
  const session = useSession();

  const {
    data: chat,
    refetch: refetchChat,
    isLoading: chatLoading,
  } = UseChatQuery(currentConversation);

  useEffect(() => {
    if (currentConversation) {
      refetchChat();
    }
  }, [currentConversation]);

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
              <div className="flex space-x-2 mt-4  max-w-[90%] lg:max-w-[60%] ">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div
                  className={`p-3 pb-5 rounded-md relative  text-black ${
                    conversation.sender === session?.data.user.id
                      ? "bg-swansdown"
                      : "bg-message dark:bg-message-200 text-black dark:text-white "
                  }  `}
                >
                  {conversation.text}
                  <div className="text-sm absolute bottom-1 right-1">
                    1:30 AM
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Message;
