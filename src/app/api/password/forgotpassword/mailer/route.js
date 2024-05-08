import User from "@/models/User";
import connect from "@/utils/db";
import sendEmail, { checkEmailExistence } from "@/utils/mailer";
import emailVerification from "@/utils/mailer";
import { NextResponse } from "next/server";
const emailExistence = require("email-existence");

export const POST = async (request) => {
  const values = await request.json();

  try {
    await connect();
    const exist = await checkEmailExistence(values.email);
    if (!exist) {
      return new NextResponse("Invalid  email", { status: 400 });
    }

    const user = await User.find({ email: values.email });

    if (user.length === 0) {
      return new NextResponse("Email not not found", { status: 400 });
    }

    exist && user.length !== 0 && sendEmail(values.email, "123456");

    return new NextResponse("Email sent on your email", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
