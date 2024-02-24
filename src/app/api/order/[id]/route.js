import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Order from "@/models/Order";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const order = await Order.findById(id);
    console.log(order);
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = request.json();

  const { ...other } = values;

  try {
    await connect();

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedOrder) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedOrder), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const order = await Order.findById(id);
    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }
    order.isActive = false;
    await order.save();

    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
