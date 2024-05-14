import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Transaction from "@/models/Transaction";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const transaction = await Transaction.find({ user: id }).sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
