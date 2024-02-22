import Feedback from "@/models/Feedback";
import Notification from "@/models/Notification";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const feedback = await Feedback.find();

    return new NextResponse(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { body, user } = values;

  const newFeedback = new Feedback({
    body,
    user,
  });

  try {
    await newFeedback.save();
    return new NextResponse("Feedback Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
