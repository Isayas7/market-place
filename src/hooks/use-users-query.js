import React from "react";
import { useMutation, useQuery } from "react-query";

export const UseUsersQuery = () => {
  return useQuery("register", (queryFn = ""));
};

export const UseRegisterQuery = () => {
  return useMutation((queryFn = ""));
};
