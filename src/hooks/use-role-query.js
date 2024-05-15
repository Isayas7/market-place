import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all user
export const UseRoleQuery = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.BASE_URL}/api/role`);
      return res;
    },
  });
};

// delivery personnel registration
export const useRoleRegisterQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRole) => {
      return await axios.post(`${process.env.BASE_URL}/api/role`, newRole);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["role"]);
    },
  });
};

export const useRoleUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatePermission) => {
      const result = await axios.put(
        `${process.env.BASE_URL}/api/role`,
        updatePermission
      );
      if (result.status === 200) {
        queryClient.invalidateQueries(["role"]);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["role"]);
    },
  });
};
