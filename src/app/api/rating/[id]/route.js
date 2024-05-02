import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const values = await request.json();
  //   const validationResult = await productSchema.safeParse(values);

  //   if (!validationResult.success) {
  //     return new NextResponse("Invalid", { status: 400 });
  //   }
  await connect();
  try {
    const product = await Product.findById(params.id);
    let alreadyRated = product.ratings.find(
      (rate) => rate.postedBy.toString() === values.postedBy.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.findOneAndUpdate(
        { "ratings._id": alreadyRated._id },
        {
          $set: {
            "ratings.$.star": values.star,
          },
        },
        {
          new: true,
        }
      );

      return new NextResponse(JSON.stringify(updateRating), {
        status: 200,
      });
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        params.id,
        {
          $push: {
            ratings: {
              star: values.star,
              postedBy: values.postedBy,
            },
          },
        },
        { new: true }
      );
      console.log("rateProduct", rateProduct);
      return new NextResponse(JSON.stringify(rateProduct), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
