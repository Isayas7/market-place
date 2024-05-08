import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Transaction from "@/models/Transaction";

export const GET = async (request) => {
  try {
    await connect();

    const transaction = await Transaction.find().populate("user");
    return new NextResponse(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
