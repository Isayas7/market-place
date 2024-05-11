import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ProductCategory from "@/models/ProductCategory";
import { statusData } from "@/utils/permission";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const productcategory = await ProductCategory.findById(id);
    const productData = await Promise.all(
      productcategory.variants.map(async (variant) => {
        const product = await Product.find({ variants: variant.name });
        const count = product.length;
        return {
          count: count,
          ...variant._doc,
        };
      })
    );

    const category = {
      ...productcategory._doc,
      variants: productData,
    };

    console.log("category", category);

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();

  try {
    await connect();

    const updatedProductCategory = await ProductCategory.findOneAndUpdate(
      { _id: id },
      { $set: values },
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

    // change status property
    productcategory.status =
      productcategory.status === statusData.Active
        ? statusData.Banned
        : statusData.Active;

    await productcategory.save();

    return new NextResponse(JSON.stringify(productcategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
