import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get All product data with out filter
export const useAllProductDataQuery = () => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  const decodedParams = {};
  params.forEach((value, key) => {
    decodedParams[key] = decodeURIComponent(value);
  });

  return useQuery({
    queryKey: [
      "product_data",
      decodedParams.categoryName,
      decodedParams.variants,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product?categoryName=${decodedParams.categoryName}&variants=${decodedParams.variants}`
      );
      return res;
    },
  });
};

// get all product
export const useProductQuery = () => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  const decodedParams = {};
  params.forEach((value, key) => {
    decodedParams[key] = decodeURIComponent(value);
  });

  const queryString = new URLSearchParams(decodedParams).toString();
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

// get all product for admin
export const useProductForAdminQuery = () => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  let query = {};
  params.forEach((value, key) => {
    query[key] = decodeURIComponent(value);
  });

  query.page = !query.page ? 1 : query.page;

  const increment = parseInt(query.page) + 1;
  const decrement = parseInt(query.page) - 1;

  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(query).toString();
  const response = useQuery({
    queryKey: ["products_for_admin", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/productforadmin?${queryString}`
      );

      return res;
    },
  });

  query.page = increment;
  const incrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data &&
  response?.data?.data?.totalPage > response.data.data.currentPage
    ? queryClient.prefetchQuery({
        queryKey: ["products_for_admin", incrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `http://localhost:3000/api/productforadmin?${incrementQueryString}`
          );

          return res;
        },
      })
    : "";

  query.page = decrement;
  const decrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data && response?.data?.data?.currentPage - 1 > 0
    ? queryClient.prefetchQuery({
        queryKey: ["products_for_admin", decrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `http://localhost:3000/api/productforadmin?${decrementQueryString}`
          );

          return res;
        },
      })
    : "";
  return response;
};

// get single product
export const UseSingleProductQuery = (id) => {
  return useQuery({
    queryKey: ["single_product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/product/${id}`);
      return res;
    },
    enabled: !!id,
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
    enabled: !!query,
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
      const res = await axios.post("http://localhost:3000/api/pay", payment);
      return res;
    },
  });
};

export const useDiscountQuery = () => {
  return useMutation({
    mutationFn: ({ discountInfo, id }) => {
      return axios.put(
        `http://localhost:3000/api/product/discount/${id}`,
        discountInfo
      );
    },
  });
};
