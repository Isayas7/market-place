import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// create or update product rating
export const useProductRatingCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rateInfo, id }) => {
      return axios.post(`http://localhost:3000/api/rating/${id}`, rateInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("single_product");
    },
  });
};

export const UseProductReviewQuery = (id) => {
  return useQuery({
    queryKey: ["product_review", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/review/${id}`);
      return res;
    },
  });
};

export const useProductReviewCreate = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewInfo) => {
      return axios.post(`http://localhost:3000/api/review`, reviewInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_review", id]);
    },
  });
};
