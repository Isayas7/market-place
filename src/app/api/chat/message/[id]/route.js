import Message from "@/models/Message";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  await connect();

  try {
    const message = await Message.find({ conversationId: id }).populate(
      "product",
      "productImage title"
    );
    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
