import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";

export const UsebuyersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/users");

      return res;
    },
  });
};

export const UseRegisterQuery = () => {
  return useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:3000/api/auth/register", newUser);
    },
  });
};
export const useDPRegisterQuery = () => {
  return useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:3000/api/users", newUser);
    },
  });
};
export const useStorefrontCreationQuery = () => {
  return useMutation({
    mutationFn: (newStore) => {
      return axios.post("http://localhost:3000/api/storefront", newStore);
    },
  });
};
