import Order from "@/models/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const order = await Order.find();

    return new NextResponse(JSON.stringify([]), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { productQuantity, user, date, orderStatus } = values;
  await connect();

  const newOrder = new Order({ productQuantity, user, date, orderStatus });

  try {
    await newOrder.save();
    return new NextResponse("Order Created Successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
