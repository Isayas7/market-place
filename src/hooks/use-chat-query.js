import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// submit message
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: async (conversation) => {
      const resoponse = await axios.post(
        `http://localhost:3000/api/chat/conversation/`,
        conversation
      );
      return resoponse;
    },
  });
};

export const useDeleteMessageQuery = (currentConversation) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/chat/message/${id}`);
    },
  });
};

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
    queryKey: ["chat", id],
    queryFn: async () => {
      console.log(id);
      const res = await axios.get(
        `http://localhost:3000/api/chat/message/${id}`
      );
      return res.data;
    },
  });
};

// submit message
export const useSendMessage = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message) => {
      return axios.post(`http://localhost:3000/api/chat/message/`, message);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["chat", id]);
    // },
  });
};
