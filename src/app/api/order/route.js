import Order from "@/models/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const orders = await Order.find();

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const order = await Order.insertMany(values.data);
  return new NextResponse(JSON.stringify(order), { status: 200 });
};
