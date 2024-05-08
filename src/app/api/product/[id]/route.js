import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { statusData } from "@/utils/permission";
import User from "@/models/User";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const product = await Product.findById(id);

    const categoryData = await ProductCategory.findById(
      product.categoryId.toString()
    );
    const userData = await User.findById(product.user.toString());

    const totalStars = product?.ratings.reduce(
      (sum, rate) => sum + rate.star,
      0
    );
    const averageStar = totalStars / product?.ratings?.length;

    const countByStar = product?.ratings.reduce((acc, cur) => {
      const star = cur.star;
      acc[star] = (acc[star] || 0) + 1;
      return acc;
    }, {});

    // Calculate the percentage of each unique star rating
    const percentages = {};
    for (const star in countByStar) {
      percentages[star] = (countByStar[star] / product?.ratings?.length) * 100;
    }

    const productData = {
      categoryName: categoryData.categoryName,
      averageStar: averageStar,
      starFive: percentages[5],
      starFour: percentages[4],
      starThree: percentages[3],
      starTwo: percentages[2],
      starOne: percentages[1],
      address: userData.address,
      location: userData.location,
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
