import Notification from "@/models/Notification";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const notification = await Notification.find();

    return new NextResponse(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const {
    notificationTitle,
    notificationBody,
    notificationStatus,
    notificationType,
    user,
    delivery,
  } = values;

  const newNotificaton = new Notification({
    notificationTitle,
    notificationBody,
    notificationStatus,
    notificationType,
    user,
    delivery,
  });

  try {
    await newNotificaton.save();
    return new NextResponse("Notification Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
