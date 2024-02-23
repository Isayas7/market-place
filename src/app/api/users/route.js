import User from "@/models/User";
import { deliveryPersonnelSchema } from "@/schema/user";
import { cloudinary } from "@/utils/cloudinary";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async (request) => {
  try {
    await connect();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const validationResult = deliveryPersonnelSchema.safeParse(values);

  const { identificationCardBase64, nationalIdBase64, ...other } = values;

  // if (!validationResult.success) {
  //   return new NextResponse("Invalid", { status: 400 });
  // }

  await connect();
  const password = "ABCabc123@#";
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    // const resultId = await cloudinary.uploader.upload(
    //   identificationCardBase64,
    //   {
    //     folder: "marketplace",
    //   }
    // );
    // const resultNationalId = await cloudinary.uploader.upload(
    //   nationalIdBase64,
    //   {
    //     folder: "marketplace",
    //   }
    // );

    // if (!resultId || resultNationalId) {
    //   console.log(resultId);
    //   return new NextResponse("Failed to upload images", { status: 400 });
    // }
    const role = "delivery_personnel";
    const newUser = new User({
      ...other,
      // identificationCard: {
      //   public_id: resultId.public_id,
      //   url: resultId.secure_url,
      // },
      // nationalId: {
      //   public_id: resultNationalId.public_id,
      //   url: resultNationalId.secure_url,
      // },
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
