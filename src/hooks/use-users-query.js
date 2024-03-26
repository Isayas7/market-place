import axios from "axios";
import { useMutation, useQuery } from "react-query";

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
      console.log(id);
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

// user or delivery personnel update
export const UseDeactivateQuery = () => {
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/user/${id}`);
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
