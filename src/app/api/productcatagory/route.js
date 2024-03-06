import ProductCategory from "@/models/ProductCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const productCategories = await ProductCategory.find();
    const modifiedCategories = productCategories.map((category) => {
      const products = category.productNames.map((product) => product.name);
      return { ...category.toObject(), productNames: products };
    });
    return new NextResponse(JSON.stringify(modifiedCategories), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const formData = await request.formData();

  // Extract form values
  const values = {};
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }
  const { categoryName, productNames, user, selectedImage } = values;

  console.log(values);

  // const product = [];

  // // pushing product names
  // productNames.forEach((name) => {
  //   product.push({
  //     name: name,
  //   });
  // });

  const newProductCategory = new ProductCategory({
    categoryName,
    productNames: product,
    user,
  });

  try {
    // await newProductCategory.save();
    return new NextResponse("Product category Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
