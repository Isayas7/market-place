import Review from "@/models/Review";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const review = await Review.find();

    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { rating, comment, product, user } = values;

  const newReview = new Review({
    rating,
    comment,
    product,
    user,
  });

  try {
    await newReview.save();
    return new NextResponse("review Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
