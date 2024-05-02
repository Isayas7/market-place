import Review from "@/models/Review";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const values = await request.json();
  //   const validationResult = await productSchema.safeParse(values);

  //   if (!validationResult.success) {
  //     return new NextResponse("Invalid", { status: 400 });
  //   }
  await connect();
  try {
    const reviewProduct = new Review(values);
    await reviewProduct.save();

    return new NextResponse(JSON.stringify(reviewProduct), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
