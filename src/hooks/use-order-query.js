"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// withdrawal post
export const useWithdrawalQuery = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transfer) => {
      return axios.post("http://localhost:3000/api/bank", transfer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaction", id]);
      queryClient.invalidateQueries(["user", id]);
    },
  });
};

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
    queryKey: ["order", id],
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

// Delivery confirmation
export const useDeliveryConfirmation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderInfo, id }) => {
      return axios.put(
        `http://localhost:3000/api/order/confirmation/${id}`,
        orderInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", id]);
    },
  });
};

// get single order
export const useSingleDeliveryQuery = (id) => {
  return useQuery({
    queryKey: ["delivery"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/delivery/${id}`);
      return res;
    },
  });
};

// get single order
export const useDeliveryQuery = () => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();

  return useQuery({
    queryKey: ["deliveries", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/delivery?${queryString}`
      );
      return res;
    },
  });
};

// update delivery
export const useDeliveryUpdateQuery = (id) => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: ({ deliveryInfo, id }) => {
      return axios.put(
        `http://localhost:3000/api/delivery/${id}`,
        deliveryInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["deliveries", queryString]);
    },
  });
};

// update delivery
export const useTransactionQuery = (id) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/order/transaction/${id}`
      );
      return res;
    },
  });
};
