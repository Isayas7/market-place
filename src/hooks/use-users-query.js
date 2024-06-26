import { roleData } from "@/utils/permission";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

//get all users
export const useUserQuery = () => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);
  const pathname = usePathname();

  let query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

  const role =
    pathname === "/dashboard/user"
      ? roleData.Buyer
      : pathname === "/dashboard/user/seller"
      ? roleData.Seller
      : roleData.Personnel_Delivery;

  query.role = role;
  query.page = !query.page ? 1 : query.page;

  const increment = parseInt(query.page) + 1;
  const decrement = parseInt(query.page) - 1;

  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(query).toString();
  const response = useQuery({
    queryKey: ["users", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `/api/user?${queryString}`
      );
      return res;
    },
  });

  query.page = increment;
  const incrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data &&
  response?.data?.data?.totalPage > response.data.data.currentPage
    ? queryClient.prefetchQuery({
        queryKey: ["users", incrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `/api/user?${incrementQueryString}`
          );
          return res;
        },
      })
    : "";

  query.page = decrement;
  const decrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data && response?.data?.data?.currentPage - 1 > 0
    ? queryClient.prefetchQuery({
        queryKey: ["users", decrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `/api/user?${decrementQueryString}`
          );
          return res;
        },
      })
    : "";
  return response;
};

// get single user
export const useSingleUserQuery = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${userId}`);
      return res;
    },
  });
};

// user Create
export const useUserRegisterQuery = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post(`/api/user`, newUser);
      return res;
    },
  });
};

// update user
export const useUserUpdateQuery = (userId) => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);
  const pathname = usePathname();

  let query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

  const role =
    pathname === "/dashboard/user"
      ? roleData.Buyer
      : pathname === "/dashboard/user/seller"
      ? roleData.Seller
      : roleData.Personnel_Delivery;

  query.role = role;
  query.page = !query.page ? 1 : query.page;

  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(query).toString();

  return useMutation({
    mutationFn: ({ userInfo, id }) => {
      return axios.put(`/api/user/${id}`, userInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", queryString]);
      queryClient.invalidateQueries(["user", userId]);
    },
  });
};

export const useUserDeactivateQuery = (userId) => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);
  const pathname = usePathname();

  let query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

  const role =
    pathname === "/dashboard/user"
      ? roleData.Buyer
      : pathname === "/dashboard/user/seller"
      ? roleData.Seller
      : roleData.Personnel_Delivery;

  query.role = role;
  query.page = !query.page ? 1 : query.page;

  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(query).toString();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", queryString]);
      queryClient.invalidateQueries(["user", userId]);
    },
  });
};

// get all banks
export const UseBankQuery = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: async () => {
      const res = await axios.get(`/api/bank`);
      return res;
    },
  });
};

// withdrawal post
export const useMailerQuery = () => {
  return useMutation({
    mutationFn: (email) => {
      return axios.post(
        `/api/password/forgotpassword/mailer`,
        email
      );
    },
  });
};

// withdrawal post
export const useOTPQuery = (email) => {
  return useQuery({
    queryKey: ["otp"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/password/forgotpassword/otp/${email}`
      );
      return res;
    },
    enabled: !!email,
  });
};
// withdrawal post
export const useSetNewPasswordQuery = () => {
  return useMutation({
    mutationFn: (values) => {
      return axios.post(
        `/api/password/forgotpassword/otp/${values.email}`,
        values
      );
    },
  });
};

// update user
export const useChangePasswordQuery = () => {
  return useMutation({
    mutationFn: ({ passwordInfo, id }) => {
      return axios.put(
        `/api/password/changepassword/${id}`,
        passwordInfo
      );
    },
  });
};
