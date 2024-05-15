import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// create notification
export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (notification) => {
      const resoponse = await axios.post(`/api/notification/`, notification);
      return resoponse;
    },
  });
};

// get all notification
export const UseNotificationQuery = () => {
  const session = useSession();
  const id = session?.data?.user?.id;
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axios.get(`/api/notification/${id}`);
      return res.data;
    },
  });
};

// update user
export const useNotificationUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ notificationInfo, id }) => {
      return axios.put(`/api/notification/${id}`, notificationInfo);
    },
  });
};

// feedback
export const useFeedbackQuery = () => {
  return useMutation({
    mutationFn: (feedback) => {
      console.log(feedback);
      return axios.post(`/api/feedback/`, feedback);
    },
  });
};
