import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// get all category
export const UseCategoryQuery = () => {
  return useQuery({
    queryKey: ["product_category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/productcatagory");
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

// get single category
export const UseSingleCategoryQuery = (id) => {
  return useQuery({
    queryKey: ["single_category"],
    queryFn: async () => {
      console.log(id);
      const res = await axios.get(
        `http://localhost:3000/api/productcatagory/${id}`
      );
      return res;
    },
  });
};

// category registration
export const useBrandRegisterQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBrand, id) => {
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
