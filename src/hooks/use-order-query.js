"use client";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

//get all orders
export const useOrderQuery = () => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();

  return useQuery({
    queryKey: ["orders", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/order?${queryString}`
      );
      return res;
    },
  });
};

// get single order
export const useSingleOrderQuery = (id) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/order/${id}`);
      return res;
    },
  });
};

// order Create
export const useOrderRegisterQuery = () => {
  return useMutation({
    mutationFn: async (newOrder) => {
      const res = await axios.post("http://localhost:3000/api/order", newOrder);
      return res;
    },
  });
};

// update order
export const useOrderUpdateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: ({ orderInfo, id }) => {
      return axios.put(`http://localhost:3000/api/order/${id}`, orderInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", queryString]);
    },
  });
};
