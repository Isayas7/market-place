import Message from "@/models/Message";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  console.log(id);

  await connect();

  try {
    const message = await Message.find({ conversationId: id });
    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
