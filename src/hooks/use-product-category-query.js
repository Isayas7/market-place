import axios from "axios";
import { useMutation, useQuery } from "react-query";

// get all user
export const UseCategoryQuery = () => {
  return useQuery({
    queryKey: ["product_category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/productcatagory");
      return res;
    },
  });
};

// delivery personnel registration
export const useCategoryRegisterQuery = () => {
  return useMutation({
    mutationFn: (newCategory) => {
      return axios.post("http://localhost:3000/api/productcatagory", newCategory);
    },
  });
};
