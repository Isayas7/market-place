import { useEffect, useState } from "react";

const useQueryString = (searchParams) => {
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const queryString = new URLSearchParams(searchParams).toString();
    setQueryString(queryString);
  }, [searchParams]);

  return queryString;
};

export default useQueryString;
