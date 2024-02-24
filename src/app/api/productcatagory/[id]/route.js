import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ProductCategory from "@/models/ProductCategory";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const productcategory = await ProductCategory.findById(id);
    console.log(productcategory);
    return new NextResponse(JSON.stringify(productcategory), { status: 200 });
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

    const updatedProductCategory = await ProductCategory.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedProductCategory) {
      return new NextResponse("ProductCategory not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProductCategory), {
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

    const productcategory = await ProductCategory.findById(id);
    if (!productcategory) {
      return new NextResponse("ProductCategory not found", { status: 404 });
    }
    productcategory.isActive = false;
    await productcategory.save();

    return new NextResponse(JSON.stringify(productcategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
