import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";

// get all product
export const useProductQuery = () => {
  const search = useSearchParams();
  const queryString = Array.from(search.entries())
    .map(([field, value]) => `${field}=${value}`)
    .join("&");

  return useQuery({
    queryKey: ["products", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product?${queryString}`
      );

      return res;
    },
  });
};
// get single product
export const UseSingleProductQuery = (id) => {
  return useQuery({
    queryKey: ["single_product"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/product/${id}`);
      return res;
    },
  });
};
// product registration
export const useProductCreateQuery = () => {
  return useMutation({
    mutationFn: async (newProduct) => {
      const res = await axios.post(
        "http://localhost:3000/api/product",
        newProduct
      );
      return res;
    },
  });
};
