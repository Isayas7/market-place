import axios from "axios";
import { NextResponse } from "next/server";

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const config = {
  headers: {
    Authorization: process.env.CHAPA_BEARER,
  },
};

export const POST = async (request) => {
  const values = await request.json();

  const CALLBACK_URL = "http://localhost:3000/api/pay/";
  const RETURN_URL = "http://localhost:3000/receipt/";
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  const payData = {
    amount: values.amount,
    currency: "ETB",
    email: values.userInfo.email,
    first_name: values.userInfo.name,
    last_name: values.userInfo.name,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
    meta: {
      items: values,
    },
  };

  try {
    const response = await axios.post(CHAPA_URL, payData, config);
    const checkoutUrl = response.data.data.checkout_url;

    return new NextResponse(checkoutUrl, { status: 200 });
  } catch (error) {
    // Return a response indicating payment initiation failed
    return new NextResponse("Payment initiation failed", { status: 500 });
  }
};
