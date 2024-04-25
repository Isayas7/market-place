import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all user
export const UseBuyersQuery = () => {
  return useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/user/buyer");
      return res;
    },
  });
};
export const UseSellersQuery = () => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/user/seller");
      return res;
    },
  });
};
export const UseDPsQuery = () => {
  return useQuery({
    queryKey: ["delivery_personnels"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3000/api/user/deliverypersonnel"
      );
      return res;
    },
  });
};

// get individual delivery personnel
export const UseDPQuery = (id) => {
  return useQuery({
    queryKey: ["delivery_personnel"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/user/${id}`);
      return res;
    },
  });
};

// user registration
export const UseRegisterQuery = () => {
  return useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:3000/api/auth/register", newUser);
    },
  });
};

// delivery personnel registration
export const useDPRegisterQuery = () => {
  return useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:3000/api/user", newUser);
    },
  });
};

// user or delivery personnel update
export const UseUpdateDPQuery = () => {
  return useMutation({
    mutationFn: ({ updateUser, id }) => {
      return axios.put(`http://localhost:3000/api/user/${id}`, updateUser);
    },
  });
};

// user or delivery personnel deactivate
export const UseDeactivateQuery = (myparams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(myparams);
    },
  });
};

// user or seller approve
export const UseApproveQuery = (myparams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/user/seller/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(myparams);
      queryClient.invalidateQueries("delivery_personnel");
    },
  });
};

// store front creation
export const useStorefrontCreationQuery = () => {
  return useMutation({
    mutationFn: (newStore) => {
      return axios.post("http://localhost:3000/api/storefront", newStore);
    },
  });
};

// get all banks
export const UseBankQuery = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/bank");
      return res;
    },
  });
};

// withdrawal post
export const useWithdrawalQuery = () => {
  return useMutation({
    mutationFn: (transfer) => {
      return axios.post("http://localhost:3000/api/bank", transfer);
    },
  });
};

// user or delivery personnel update
export const UseChangePasswordQuery = () => {
  return useMutation({
    mutationFn: ({ values, id }) => {
      console.log(values, id);
      return axios.put(
        `http://localhost:3000/api/changepassword/${id}`,
        values
      );
    },
  });
};
