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
          const productData = await Product.findById(params.id);
          const alreadyRateUser = productData.ratings.find(
            (rate) => rate.postedBy.toString() === review.userId.toString()
          );
          return {
            profileImage: userData.profileImage,
            firstName: userData.firstName,
            middleName: userData.middleName,
            star: alreadyRateUser.star,
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
