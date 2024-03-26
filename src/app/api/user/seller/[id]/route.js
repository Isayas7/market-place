import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    user.status = !user.status;
    console.log(user);
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
