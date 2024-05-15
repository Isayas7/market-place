"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// withdrawal post
export const useWithdrawalQuery = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transfer) => {
      return axios.post("${process.env.BASE_URL}/api/bank", transfer);
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
  const params = new URLSearchParams(search);

  let query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

  query.page = !query.page ? 1 : query.page;
  const queryString = new URLSearchParams(query).toString();
  return useQuery({
    queryKey: ["orders", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order?${queryString}`
      );
      return res;
    },
  });
};

//get delivey set
export const useDeliveryQuery = (deliveryPersonnelId) => {
  return useQuery({
    queryKey: ["delivery", deliveryPersonnelId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order/delivery/${deliveryPersonnelId}`
      );
      return res;
    },
    enabled: !!deliveryPersonnelId,
  });
};

// update delivery
export const useDeliveryUpdateQuery = (deliveryPersonnelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderInfo, id }) => {
      return axios.put(`${process.env.BASE_URL}/api/order/${id}`, orderInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["delivery", deliveryPersonnelId]);
    },
    enabled: !!deliveryPersonnelId,
  });
};

//get all orders of buyers
export const useBuyerOrderQuery = (buyerId) => {
  return useQuery({
    queryKey: ["buyerorder", buyerId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order/buyerorder/${buyerId}`
      );
      return res;
    },
    enabled: !!buyerId,
  });
};

//confirm Delivery
export const useConfirmDeliveryQuery = (orderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderInfo, id }) => {
      return axios.put(
        `${process.env.BASE_URL}/api/order/confirmation/${id}`,
        orderInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
    enabled: !!orderId,
  });
};

//get all orders of buyers
export const useSellerOrderQuery = (sellerId) => {
  return useQuery({
    queryKey: ["sellerorder", sellerId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order/sellerorder/${sellerId}`
      );
      return res;
    },
    enabled: !!sellerId,
  });
};

//get all orders of buyers
export const useSellerSingleOrderQuery = () => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();

  return useQuery({
    queryKey: ["sellersingleorder"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order/sellerorder/orderdetail?${queryString}`
      );
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
      return axios.put(`${process.env.BASE_URL}/api/order/${id}`, orderInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", queryString]);
    },
  });
};

// get single order
export const useSingleOrderQuery = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.BASE_URL}/api/order/${id}`);
      return res;
    },
    enabled: !!id,
  });
};

// order Create
export const useOrderRegisterQuery = () => {
  return useMutation({
    mutationFn: async (newOrder) => {
      const res = await axios.post(`${process.env.BASE_URL}/api/order`, newOrder);
      return res;
    },
  });
};

// get single order
export const useSingleDeliveryQuery = (id) => {
  return useQuery({
    queryKey: ["delivery"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.BASE_URL}/api/delivery/${id}`);
      return res;
    },
  });
};

// update delivery
export const useTransactionQuery = (id) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/order/transaction/${id}`
      );
      return res;
    },
  });
};
