import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

//get all users
export const useUserQuery = () => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();

  return useQuery({
    queryKey: ["users", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/user?${queryString}`
      );
      return res;
    },
  });
};

// get single user
export const useSingleUserQuery = (id) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/user/${id}`);
      return res;
    },
  });
};

// user Create
export const useUserRegisterQuery = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post("http://localhost:3000/api/user", newUser);
      return res;
    },
  });
};

// update user
export const useUserUpdateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: ({ userInfo, id }) => {
      return axios.put(`http://localhost:3000/api/user/${id}`, userInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", queryString]);
    },
  });
};

export const useUserDeactivateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", queryString]);
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
