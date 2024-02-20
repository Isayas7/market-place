import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import StoreFront from "@/models/StoreFront";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const product = await Product.find();

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { brand, model, price, description, storeFront } = values;

  const newProduct = new Product({
    brand,
    model,
    price,
    description,
    storeFront,
  });

  try {
    await newProduct.save();
    return new NextResponse("Product Created Successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
