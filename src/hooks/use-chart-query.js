import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all chat
export const UseTransactionChartQuery = (id) => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axios.get(`/api/analytics/transaction/`);
      return res.data;
    },
  });
};
