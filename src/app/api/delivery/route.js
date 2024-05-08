import Delivery from "@/models/Delivery";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  try {
    await connect();

    const delivery = await Delivery.find(query).populate("order");

    return new NextResponse(JSON.stringify(delivery), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();
  await connect();

  const newDelivery = new Delivery(values);
  try {
    await newDelivery.save();
    return new NextResponse("Delivery Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
