import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Feedback from "@/models/Feedback";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const feedback = await Feedback.findById(id);
    console.log(feedback);
    return new NextResponse(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = request.json();

  const { ...other } = values;

  try {
    await connect();

    const updatedFeedback = await Feedback.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedFeedback) {
      return new NextResponse("Feedback not found", { status: 404 });
    }

    const responseBody = JSON.stringify(updatedFeedback);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    const errorMessage = `Database Error: ${error.message}`;
    return new NextResponse(errorMessage, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return new NextResponse("Feedback not found", { status: 404 });
    }
    feedback.isActive = false;
    await feedback.save();

    return new NextResponse(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
