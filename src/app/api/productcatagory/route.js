import ProductCategory from "@/models/ProductCategory";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const pageSize = 6;
  const currentPage = parseInt(query.page);

  try {
    await connect();
    if (query.page) {
      delete query.page;

      const count = await ProductCategory.find(query).countDocuments();

      const productCategoryData = await ProductCategory.find(query)
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize);

      console.log("productCategories", productCategoryData);

      const totalPage = Math.ceil(count / pageSize);

      const productCategories = await Promise.all(
        productCategoryData.map(async (category) => {
          const userData = await User.findById(category.user.toString());
          console.log("userData", userData);

          return {
            creator: userData.firstName,
            ...category._doc,
          };
        })
      );

      return new NextResponse(
        JSON.stringify({ productCategories, totalPage, currentPage }),
        {
          status: 200,
        }
      );
    } else {
      const productCategories = await ProductCategory.find(query);

      return new NextResponse(JSON.stringify(productCategories), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();

  //  const validationResult = await productSchema.safeParse(values);

  //  if (!validationResult.success) {
  //    return new NextResponse("Invalid", { status: 400 });
  //  }

  await connect();
  const newProductCategory = new ProductCategory(values);

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
