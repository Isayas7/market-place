import Conversation from "@/models/Conversation";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const values = await request.json();
  const { senderId, receiverId } = values;
  await connect();

  try {
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      return new NextResponse(JSON.stringify(existingConversation), {
        status: 200,
      });
    } else {
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });
      const savedConversation = await newConversation.save();
      return new NextResponse(JSON.stringify(savedConversation), {
        status: 201,
      });
    }
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
