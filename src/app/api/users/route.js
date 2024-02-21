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

  if (!validationResult.success) {
    return new NextResponse("Invalid", { status: 400 });
  }

  const { identificationCard, nationalId, ...other } = values;

  await connect();
  const password = "ABCabc123@#";
  const hashedPassword = await bcrypt.hash(password, 5);

  console.log(identificationCard, nationalId);

  const resultId = await cloudinary.uploader.upload(identificationCard, {
    folder: "marketplace",
  });
  const resultNationalId = await cloudinary.uploader.upload(nationalId, {
    folder: "marketplace",
  });

  if (!resultId || resultNationalId) {
    return new NextResponse("Failed to upload images", { status: 400 });
  }
  const role = "delivery_personnel";
  const newUser = new User({
    ...other,
    identificationCard: {
      public_id: resultId.public_id,
      url: resultId.secure_url,
    },
    nationalId: {
      public_id: resultNationalId.public_id,
      url: resultNationalId.secure_url,
    },
    password: hashedPassword,
    role,
  });
  try {
    // await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
