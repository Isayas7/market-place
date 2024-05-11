import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const storefront = await Storefront.findById(id);
    console.log(storefront);
    return new NextResponse(JSON.stringify(storefront), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

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

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const storefront = await Storefront.findById(id);
    if (!storefront) {
      return new NextResponse("Storefront not found", { status: 404 });
    }
    storefront.isActive = false;
    await storefront.save();

    return new NextResponse(JSON.stringify(storefront), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
