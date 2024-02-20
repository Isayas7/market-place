import User from "@/models/User";
import { registerSchema } from "@/schema/user";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const values = await request.json();
  const validationResult = registerSchema.safeParse(values);

  if (!validationResult.success) {
    return new NextResponse("Invalid", { status: 400 });
  }

  const { password, ...other } = values;

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    password: hashedPassword,
    role: "buyer",
    ...other,
  });

  console.log(newUser);
  try {
    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
