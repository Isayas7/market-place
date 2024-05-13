import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();
  const { amount, expireDate } = values;
  const promotion = { amount, expireDate };

  try {
    await connect();
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { promotion },
      { new: true }
    );

    if (!updatedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    console.log(promotion);

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
