import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all product
export const useProductQuery = () => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();

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

export const useProductUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productInfo, id }) => {
      return axios.put(`http://localhost:3000/api/product/${id}`, productInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products_With_Out_FIlter"]);
    },
  });
};

export const useProoductDeactivateQuery = () => {
  const session = useSession();
  const id = session?.data?.user?.id;
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["currentSellerProduct", id, queryString]);
    },
  });
};

export const useSimilarProducQuery = (query) => {
  return useQuery({
    queryKey: ["SimilarProduct", query],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product?variants=${query}`
      );

      return res;
    },
  });
};

// get all product for the current seller
export const useCurrentSellerProductQuery = (id) => {
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useQuery({
    queryKey: ["currentSellerProduct", id, queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product?user=${id}&${queryString}`
      );
      return res;
    },
  });
};

// get all product for the current seller with out filter
export const useCurrentSellerAllProductQuery = (id) => {
  return useQuery({
    queryKey: ["products_With_Out_FIlter"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product?user=${id}`
      );
      return res;
    },
  });
};

export const usePayQuery = () => {
  return useMutation({
    mutationFn: async (payment) => {
      console.log(payment);
      const res = await axios.post("http://localhost:3000/api/pay", payment);
      return res;
    },
  });
};
