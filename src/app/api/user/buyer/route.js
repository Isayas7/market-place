import Role from "@/models/Role";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const buyerRole = await Role.findOne({ name: "Buyer" });
    if (!buyerRole) {
      return new NextResponse("Buyer role not found", { status: 404 });
    }

    const buyers = await User.find({ role: { $in: [buyerRole._id] } });

    return new NextResponse(JSON.stringify(buyers), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
