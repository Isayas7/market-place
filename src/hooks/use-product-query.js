import axios from "axios";
import { useMutation, useQuery } from "react-query";

// get all product
export const useProductQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/product");
      return res;
    },
  });
};

// product registration
export const useProductCreateQuery = () => {
  return useMutation({
    mutationFn: (newProduct) => {
      return axios.post("http://localhost:3000/api/product", newProduct);
    },
  });
};
