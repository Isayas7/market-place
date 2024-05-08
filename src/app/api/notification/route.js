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
  const { notificationType, user, notificationStatus } = values;

  try {
    let existingNotification = await Notification.findOne({
      notificationType,
      user,
    });

    if (existingNotification) {
      // Check if the existing notification status is "seen"
      if (existingNotification.notificationStatus === "seen") {
        // Change status to "unseen"
        existingNotification.notificationStatus = "unseen";
      }
      // Increment notification count
      existingNotification.notificationCount += 1;
      await existingNotification.save();
      return new NextResponse("Notification Count Updated Successfully", {
        status: 200,
      });
    } else {
      // Create a new notification with count 1
      const newNotification = new Notification({
        notificationType,
        user,
        notificationCount: 1,
        notificationStatus: "unseen",
      });
      await newNotification.save();
      return new NextResponse("Notification Created Successfully", {
        status: 201,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
