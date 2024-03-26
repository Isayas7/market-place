import Role from "@/models/Role";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const deliveryRole = await Role.findOne({ name: "Delivery Personnel" });

    if (!deliveryRole) {
      return new NextResponse("Delivery Personnel role not found", {
        status: 404,
      });
    }
    const delivery_personnel = await User.find({
      role: { $in: [deliveryRole._id] },
    });
    return new NextResponse(JSON.stringify(delivery_personnel), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
