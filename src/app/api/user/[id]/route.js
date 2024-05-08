import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import { statusData } from "@/utils/permission";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const user = await User.findById(id);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();
  try {
    await connect();

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: values },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const user = await User.findById(id);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    user.status =
      user.status === statusData.Active ? statusData.Banned : statusData.Active;

    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
