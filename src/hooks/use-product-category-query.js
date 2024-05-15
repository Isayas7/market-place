import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get All category data with out filter
export const useAllCategoryDataQuery = () => {
  return useQuery({
    queryKey: ["category_data"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/productcatagory`
      );
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
        `${process.env.BASE_URL}/api/productcatagory?${queryString}`
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
            `${process.env.BASE_URL}/api/productcatagory?${incrementQueryString}`
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
            `${process.env.BASE_URL}/api/productcatagory?${decrementQueryString}`
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
        `${process.env.BASE_URL}/api/productcatagory/${id}`
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
        `${process.env.BASE_URL}/api/productcatagory`,
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
        `${process.env.BASE_URL}/api/productcatagory/${id}`,
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
      return axios.delete(`${process.env.BASE_URL}/api/productcatagory/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_category", queryString]);
    },
  });
};

// get All varients category
export const UseVariantsQuery = () => {
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
    queryKey: ["product_variant", queryString],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/variant?${queryString}`
      );
      return res;
    },
  });

  query.page = increment;
  const incrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data &&
  response?.data?.data?.totalPage > response.data.data.currentPage
    ? queryClient.prefetchQuery({
        queryKey: ["product_variant", incrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `${process.env.BASE_URL}/api/variant?${incrementQueryString}`
          );
          return res;
        },
      })
    : "";

  query.page = decrement;
  const decrementQueryString = new URLSearchParams(query).toString();
  response?.data?.data && response?.data?.data?.currentPage - 1 > 0
    ? queryClient.prefetchQuery({
        queryKey: ["product_variant", decrementQueryString],
        queryFn: async () => {
          const res = await axios.get(
            `${process.env.BASE_URL}/api/variant?${decrementQueryString}`
          );
          return res;
        },
      })
    : "";
  return response;
};

/// get single variant of the category
export const UseSingleVariantQuery = (id) => {
  return useQuery({
    queryKey: ["single_variant"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.BASE_URL}/api/variant/${id}`);
      return res;
    },
  });
};

// Add Brands to productNames of the Category
export const useBrandRegisterQuery = () => {
  return useMutation({
    mutationFn: ({ newBrand, id }) => {
      return axios.post(`${process.env.BASE_URL}/api/variant/${id}`, newBrand);
    },
  });
};

// Add Brands to productNames of the Category
export const useBrandUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ updatedBrand, id }) => {
      return axios.put(
        `${process.env.BASE_URL}/api/variant/${id}`,
        updatedBrand
      );
    },
  });
};

export const useVariantDeactivateQuery = () => {
  const queryClient = useQueryClient();
  const search = useSearchParams();
  const queryString = new URLSearchParams(search).toString();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`${process.env.BASE_URL}/api/variant/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product_variant", queryString]);
    },
  });
};
