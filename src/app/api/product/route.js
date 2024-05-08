import Product from "@/models/Product";
import { productSchema } from "@/validationschema/user";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import ProductCategory from "@/models/ProductCategory";
import User from "@/models/User";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let categoryName;
  let firstQuery = {};
  const secondQuery = {};

  searchParams.forEach((value, key) => {
    secondQuery[key] = value;
  });

  Object.entries(secondQuery).forEach(([key, value]) => {
    if (key === "categoryName") {
      categoryName = value;
    }
  });

  try {
    await connect();

    if (categoryName) {
      firstQuery.categoryName = categoryName;
      const foundCategory = await ProductCategory.findOne(firstQuery);
      if (foundCategory) {
        secondQuery.categoryId = foundCategory._id;
      }
      if ("categoryName" in secondQuery) {
        delete secondQuery.categoryName;
      }
    }

    const products = await Product.find(secondQuery);

    const productData = await Promise.all(
      products.map(async (product) => {
        const categoryData = await ProductCategory.findById(
          product.categoryId.toString()
        );
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
          percentages[star] =
            (countByStar[star] / product?.ratings?.length) * 100;
        }

        return {
          categoryName: categoryData.categoryName,
          averageStar: averageStar,
          starFive: percentages[5],
          starFour: percentages[4],
          starThree: percentages[3],
          starTwo: percentages[2],
          starOne: percentages[1],
          ...product._doc,
        };
      })
    );

    return new NextResponse(JSON.stringify(productData), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();

  const validationResult = await productSchema.safeParse(values);
  console.log("validationResult", validationResult);

  if (!validationResult.success) {
    return new NextResponse("Invalid", { status: 400 });
  }

  await connect();
  const newProduct = new Product(values);

  try {
    await newProduct.save();
    return new NextResponse("Product Created Successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
