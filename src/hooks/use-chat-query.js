import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all conversation
export const UseConversationQuery = () => {
  const session = useSession();
  const id = session?.data?.user?.id;
  return useQuery({
    queryKey: ["conversation"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/chat/conversation/${id}`
      );
      return res.data;
    },
  });
};
// get all chat
export const UseChatQuery = (id) => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/chat/message/${id}`
      );
      return res.data;
    },
  });
};

// submit message
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message) => {
      return axios.post(`http://localhost:3000/api/chat/message/`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("chat");
    },
  });
};
