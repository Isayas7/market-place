import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const GET = async (request, { params }) => {
  const { id } = params;

  console.log(id);

  try {
    await connect();
    const user = await User.findOne({ email: id });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const values = await request.json();
  const { id } = params;
  try {
    await connect();
    const user = await User.findOne({ email: id });

    if (!user) {
      return new NextResponse("No User with this Email", { status: 500 });
    }
    if (values.new_password !== values.confirm_password) {
      return new NextResponse("Password dont match", { status: 500 });
    }
    const hashedPassword = await bcrypt.hash(values.new_password, 5);
    user.otp = null;
    user.password = hashedPassword;
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
