import ProductCategory from "@/models/ProductCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const productCategory = await ProductCategory.find();

    return new NextResponse(JSON.stringify(productCategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { categoryName, productNames, user } = values;

  const product = [];

  // pushing product names
  productNames.forEach((name) => {
    product.push({
      name: name,
    });
  });

  const newProductCategory = new ProductCategory({
    categoryName,
    productNames: product,
    user,
  });

  try {
    await newProductCategory.save();
    return new NextResponse("Product category Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
