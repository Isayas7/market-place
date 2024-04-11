import Message from "@/models/Message";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const values = await request.json();

  console.log(values);

  await connect();

  const message = new Message(values);
  try {
    const savedMessage = await message.save();
    return new NextResponse(savedMessage, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
