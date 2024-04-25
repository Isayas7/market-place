import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { statusData } from "@/utils/permission";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const product = await Product.findById(id);

    const categoryData = await ProductCategory.findById(
      product.categoryId.toString()
    );
    const productData = {
      categoryName: categoryData.categoryName,
      ...product._doc,
    };

    return new NextResponse(JSON.stringify(productData), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();

  try {
    await connect();

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: values },
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

    // change status property
    product.status =
      product.status === statusData.Active
        ? statusData.Banned
        : statusData.Active;

    await product.save();

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
