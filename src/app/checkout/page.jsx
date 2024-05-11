import dynamic from "next/dynamic";
import React from "react";

const CheckoutForm = dynamic(
  () => import("@/components/checkout/checkout-form"),
  {
    ssr: false,
  }
);

const Checkout = () => {
  return <CheckoutForm />;
};

export default Checkout;
