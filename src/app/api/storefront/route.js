import StoreFront from "@/models/Storefront";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const storefronts = await StoreFront.find();

    return new NextResponse(JSON.stringify(storefronts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const {
    location,
    email,
    lastName,
    address,
    identificationCard,
    nationalId,
    phoneNumber,
    bankInfo,
    accountNumber,
  } = values;

  await connect();

  const newInformation = {
    lastName,
    address,
    identificationCard,
    nationalId,
    phoneNumber,
    bankInfo,
    accountNumber,
  };

  // Find the user
  const user = await User.findOneAndUpdate(
    { email: email },
    { $set: newInformation },
    { new: true }
  );

  // Check if the user exists before accessing its _id
  if (!user) {
    console.log("User not found with email:", email);
    return new NextResponse("User not found", { status: 404 });
  }

  console.log(user);

  const newStorefront = new StoreFront({ location, user: user._id });

  try {
    await newStorefront.save();
    return new NextResponse("Storefront Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
