import axios from "axios";
import { NextResponse } from "next/server";

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const config = {
  headers: {
    Authorization: process.env.CHAPA_BEARER,
  },
};

export const POST = async (request) => {
  const CALLBACK_URL = "http://localhost:3000/api/pay/";
  const RETURN_URL = "http://localhost:3000/products/pay/payment";
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  const payData = {
    amount: "2000",
    currency: "ETB",
    email: "ebisagirma@ekele.com",
    first_name: "Isayas",
    last_name: "Melkamu",
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
  };

  try {
    const response = await axios.post(CHAPA_URL, payData, config);
    const checkoutUrl = response.data.data.checkout_url;

    return new NextResponse(checkoutUrl, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    // Return a response indicating payment initiation failed
    return new NextResponse("Payment initiation failed", { status: 500 });
  }
};
