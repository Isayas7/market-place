"use client";

import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import React, { useEffect } from "react";

const Reciept = () => {
  const cart = useStore(useCart, (state) => state.clearCart);

  useEffect(() => {
    cart;
  }, []);

  return <div>Payment Reciept</div>;
};

export default Reciept;
