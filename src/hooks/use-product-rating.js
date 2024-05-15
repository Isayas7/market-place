import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const UseProductReviewQuery = (productId) => {
  return useQuery({
    queryKey: ["product_review", productId],
    queryFn: async () => {
      const res = await axios.get(`/api/review/${productId}`);
      return res;
    },
    enabled: !!productId,
  });
};

export const useProductReviewCreate = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewInfo) => {
      return axios.post(`/api/review`, reviewInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_review", productId]);
    },
    enabled: !!productId,
  });
};

export const useProductReviewUpdateQuery = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewInfo, id }) => {
      return axios.put(`/api/review/${id}`, reviewInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_review", productId]);
    },
    enabled: !!productId,
  });
};
