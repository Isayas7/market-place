import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const product = await Product.findById(id);

    return new NextResponse(JSON.stringify(product), { status: 200 });
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

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProduct), {
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

    const product = await Product.findById(id);
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    product.isActive = false;
    await product.save();

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
