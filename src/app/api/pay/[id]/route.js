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
    console.log("Payment was successfully verified");
    return new Response(JSON.parse(response.data), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Payment verification failed", { status: 500 });
  }
};
