import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Delivery from "@/models/Delivery";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const delivery = await Delivery.findById(id);
    console.log(delivery);
    return new NextResponse(JSON.stringify(delivery), { status: 200 });
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

    const updatedDelivery = await Delivery.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedDelivery) {
      return new NextResponse("Delivery not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedDelivery), {
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

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return new NextResponse("Delivery not found", { status: 404 });
    }
    delivery.isActive = false;
    await delivery.save();

    return new NextResponse(JSON.stringify(delivery), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
