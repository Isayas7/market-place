import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();

  try {
    await connect();

    const updateUserToSeller = await User.findOneAndUpdate(
      { _id: id },
      { $set: values },
      { new: true }
    );

    if (!updateUserToSeller) {
      return new NextResponse("Storefront not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updateUserToSeller), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
