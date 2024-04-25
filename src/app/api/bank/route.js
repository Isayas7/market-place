import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const response = await fetch("https://api.chapa.co/v1/banks", {
      headers: {
        Authorization: process.env.CHAPA_BEARER,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch banks");
    }
    const data = await response.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Request Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();
  console.log(values);

  const url = "https://api.chapa.co/v1/transfers";

  const headers = {
    Authorization: process.env.CHAPA_BEARER,
    "Content-Type": "application/json",
  };

  const transfers = {
    account_name: values.name,
    account_number: values.accountNumber,
    amount: values.amount,
    currency: "ETB",
    beneficiary_name: values.name,
    reference: "3241342142sfdd",
    bank_code: values.bankinfo,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(transfers),
    });

    const responseData = await response.json();

    if (response.ok) {
      return new NextResponse(JSON.stringify(responseData), {
        status: response.status,
      });
    } else {
      console.error(responseData.message);
      return new NextResponse(JSON.stringify(responseData), {
        status: response.status,
      });
    }
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
