import axios from "axios";
import { redirect } from "next/navigation";
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
    if (response.data.status === "success") {
      await axios.post(
        "http://localhost:3000/api/order",
        response.data.data.meta
      );
    }

    return new NextResponse(JSON.stringify(response.data.data.meta), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Payment verification failed", { status: 500 });
  }
};
