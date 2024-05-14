import Order from "@/models/Order";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const transactions = await Transaction.find();
    const totalAmount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    return new NextResponse(
      JSON.stringify({ totalAmount, userCount, orderCount }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Request Error", { status: 500 });
  }
};
