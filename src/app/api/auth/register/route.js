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

  const { firstName, middleName, email, password } = values;

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    firstName,
    middleName,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
