import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const users = await User.find();

    return new NextResponse(users, { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
