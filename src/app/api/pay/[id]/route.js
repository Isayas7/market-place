import axios from "axios";
import { NextResponse } from "next/server";

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const config = {
  headers: {
    Authorization: process.env.CHAPA_BEARER,
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
    const result = await axios.post("http://localhost:3000/api/order", orders);

    return new NextResponse(result, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Payment verification failed", { status: 500 });
  }
};