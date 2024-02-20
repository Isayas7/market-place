import StoreFront from "@/models/StoreFront";
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
  const { location, user } = values;
  await connect();
  console.log(location, user);

  const newStorefront = new StoreFront({ location, user });

  try {
    await newStorefront.save();
    return new NextResponse("Storefront Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
