import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();
  const { amount, user, expireDate } = values;
  try {
    await connect();

    const updatedProduct = await Product.findById(id);
    if (!updatedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const index = updatedProduct.discount.findIndex(
      (discount) => discount.user === user
    );

    if (index !== -1) {
      updatedProduct.discount[index].amount = amount;
      updatedProduct.discount[index].expireDate = expireDate;
    } else {
      updatedProduct.discount.push({ amount, user, expireDate });
    }

    await updatedProduct.save();

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
