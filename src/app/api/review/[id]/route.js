import Product from "@/models/Product";
import Review from "@/models/Review";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await connect();

  try {
    const reviews = await Review.find({ productId: params.id }).sort({
      createdAt: -1,
    });

    if (reviews) {
      const reviewsData = await Promise.all(
        reviews.map(async (review) => {
          const userData = await User.findById(review.userId.toString());
          return {
            profileImage: userData.profileImage,
            firstName: userData.firstName,
            middleName: userData.middleName,
            ...review._doc,
          };
        })
      );

      if (reviewsData) {
        return new NextResponse(JSON.stringify(reviewsData), {
          status: 200,
        });
      } else {
        return new NextResponse(JSON.stringify([]), { status: 200 });
      }
    }
    return new NextResponse(JSON.stringify([]), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", error, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();

  try {
    await connect();

    const updatedReview = await Review.findOneAndUpdate(
      { _id: id },
      { $set: values },
      { new: true }
    );

    if (!updatedReview) {
      return new NextResponse("Review not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedReview), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
