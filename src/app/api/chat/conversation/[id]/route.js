import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  await connect();

  try {
    const conversations = await Conversation.find({
      members: { $in: [id] },
    }).populate({
      path: "members",
      model: "User",
      select: "email firstName middleName",
      match: { _id: { $ne: id } }, // Exclude the current user ID
    });
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conversation) => {
        const topMessage = await Message.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(1);

        return {
          _id: conversation._id,
          member: conversation.members[0],
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          __v: conversation.__v,
          topMessage: topMessage ? topMessage.text : null,
        };
      })
    );

    return new NextResponse(JSON.stringify(conversationsWithMessages), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
