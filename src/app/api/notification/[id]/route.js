import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Notification from "@/models/Notification";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const notification = await Notification.find({ user: id });
    return new NextResponse(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();
  const { ...other } = values;

  try {
    await connect();

    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedNotification) {
      return new NextResponse("Notification not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedNotification), {
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

    const notification = await Notification.findById(id);
    if (!notification) {
      return new NextResponse("Notification not found", { status: 404 });
    }
    notification.isActive = false;
    await notification.save();

    return new NextResponse(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
