import Product from "@/models/Product";
import { productSchema } from "@/validationschema/user";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import ProductCategory from "@/models/ProductCategory";
import User from "@/models/User";
import { usePathname } from "next/navigation";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  const query = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const sortBy = query.sort === "priceDesc" ? "desc" : "asc";

  delete query.sort;

  try {
    await connect();

    if (query.categoryName) {
      const foundCategory = await ProductCategory.findOne({
        categoryName: query.categoryName,
      });

      if (foundCategory) {
        query.categoryId = foundCategory._id;
      }
      delete query.categoryName;
    }

    const products = await Product.find(query).sort({ price: sortBy });

    const productData = await Promise.all(
      products.map(async (product) => {
        const categoryData = await ProductCategory.findById(
          product.categoryId.toString()
        );

        const userData = await User.findById(product.user.toString());
        const reviewData = await User.find({ productId: product._id });

        const totalStars = reviewData?.reduce(
          (sum, rate) => sum + rate.star,
          0
        );
        const averageStar = totalStars / product?.ratings?.length;

        const countByStar = reviewData?.reduce((acc, cur) => {
          const star = cur.star;
          acc[star] = (acc[star] || 0) + 1;
          return acc;
        }, {});

        // Calculate the percentage of each unique star rating
        const percentages = {};
        for (const star in countByStar) {
          percentages[star] = (
            (countByStar[star] / product?.ratings?.length) *
            100
          ).toFixed(0);
        }
        

        return {
          firstName: userData.firstName,
          categoryName: categoryData.categoryName,
          averageStar: averageStar,
          ratingPercentages: percentages,
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
