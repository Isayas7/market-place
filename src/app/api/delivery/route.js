import Delivery from "@/models/Delivery";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const delivery = await Delivery.find();

    return new NextResponse(JSON.stringify(delivery), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { deliveryDate, deliveryCost, deliveryStatus, order, product } = values;
  await connect();

  const newDelivery = new Delivery({
    deliveryDate,
    deliveryCost,
    deliveryStatus,
    order,
    product,
  });
  try {
    await newDelivery.save();
    return new NextResponse("Delivery Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
