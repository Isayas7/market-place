import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Order from "@/models/Order";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const order = await Order.find({ buyerId: id })
      .populate({
        path: "items.productId",
        select: "title productImage variants",
      })
      .populate({
        path: "buyerId",
        select: "firstName middleName",
      })
      .sort({
        createdAt: -1,
      })
      .exec();

    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
