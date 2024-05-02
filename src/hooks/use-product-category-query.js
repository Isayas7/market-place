import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get All category data with out filter
export const useAllCategoryDataQuery = () => {
  return useQuery({
    queryKey: ["category_data"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/productcatagory`);
      return res;
    },
  });
};

// get all category
export const UseCategoryQuery = () => {
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  let query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

  query.page = !query.page ? 1 : query.page;

  const increment = parseInt(query.page) + 1;
  const decrement = parseInt(query.page) - 1;

  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(query).toString();
  const response = useQuery({
    queryKey: ["product_category", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/productcatagory?${queryString}`
      );
      return res;
    },
  });

  query.page = increment;
  const incrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data &&
  response?.data?.data?.totalPage > response.data.data.currentPage
    ? queryClient.prefetchQuery({
        queryKey: ["product_category", incrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `http://localhost:3000/api/productcatagory?${incrementQueryString}`
          );
          return res;
        },
      })
    : "";

  query.page = decrement;
  const decrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data && response?.data?.data?.currentPage - 1 > 0
    ? queryClient.prefetchQuery({
        queryKey: ["product_category", decrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `http://localhost:3000/api/productcatagory?${decrementQueryString}`
          );
          return res;
        },
      })
    : "";
  return response;
};

// get single category
export const UseSingleCategoryQuery = (id) => {
  return useQuery({
    queryKey: ["single_category"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/productcatagory/${id}`
      );
      return res;
    },
  });
};

// category registration
export const useCategoryRegisterQuery = () => {
  return useMutation({
    mutationFn: (newCategory) => {
      return axios.post(
        "http://localhost:3000/api/productcatagory",
        newCategory
      );
    },
  });
};

export const useCategoryUpdateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: ({ categoryInfo, id }) => {
      return axios.put(
        `http://localhost:3000/api/productcatagory/${id}`,
        categoryInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_category", queryString]);
      queryClient.invalidateQueries(["category_data"]);
    },
  });
};

export const useCategoryDeactivateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/productcatagory/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_category", queryString]);
    },
  });
};

// Add Brands to productNames of the Category
export const useBrandRegisterQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newBrand, id }) => {
      return axios.post(
        `http://localhost:3000/api/productcatagory/${id}`,
        newBrand
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("single_category");
    },
  });
};
