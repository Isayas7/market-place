import Conversation from "@/models/Conversation";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const values = await request.json();
  const { senderId, receiverId } = values;

  await connect();

  const conversation = new Conversation({
    members: [senderId, receiverId],
  });
  try {
    const savedConversaton = await conversation.save();
    return new NextResponse(savedConversaton, { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const GET = async (request) => {
  await connect();
  try {
    const conversation = await Conversation.find();
    return new NextResponse(JSON.stringify(conversation), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
