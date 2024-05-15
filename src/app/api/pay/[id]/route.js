import axios from "axios";
import { NextResponse } from "next/server";

const config = {
  headers: {
    Authorization: process.env.CHAPA_BEARER,
    "Content-Type": "application/json",
  },
};

export const GET = async (request, { params }) => {
  //verify the transaction

  try {
    const response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + params.id,
      config
    );

    const orders = response?.data?.data?.meta;
    const result = await axios.post("/api/order", orders);

    return new NextResponse(result, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Payment verification failed", { status: 500 });
  }
};
