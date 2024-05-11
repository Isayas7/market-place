"use client";

import { useSellerOrderQuery } from "@/hooks/use-order-query";
import { useSession } from "next-auth/react";
import React from "react";

const SellerOrder = () => {
  const session = useSession();

  const { data: order } = useSellerOrderQuery(session?.data.user?.id);

  console.log(order);

  return <div>SellerOrder</div>;
};

export default SellerOrder;
