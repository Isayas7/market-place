import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// create notification
export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (notification) => {
      const resoponse = await axios.post(
        `http://localhost:3000/api/notification/`,
        notification
      );
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
      const res = await axios.get(
        `http://localhost:3000/api/notification/${id}`
      );
      return res.data;
    },
  });
};

// update user
export const useNotificationUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ notificationInfo, id }) => {
      return axios.put(
        `http://localhost:3000/api/notification/${id}`,
        notificationInfo
      );
    },
  });
};
