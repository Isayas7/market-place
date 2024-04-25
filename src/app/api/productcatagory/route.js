import ProductCategory from "@/models/ProductCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  delete query.page;

  const pageSize = 1;
  const pageNumber = parseInt(query.page);
  const count = await ProductCategory.find(query).countDocuments();

  try {
    await connect();
    const productCategories = await ProductCategory.find(query)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);

    const totalPage = Math.ceil(count / pageSize);

    productCategories.totalPage = totalPage;

    return new NextResponse(JSON.stringify(productCategories), { status: 200 });
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
