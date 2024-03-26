import Role from "@/models/Role";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const sellerRole = await Role.findOne({ name: "Seller" });

    if (!sellerRole) {
      return new NextResponse("Seller role not found", { status: 404 });
    }
    const sellers = await User.find({ role: { $in: [sellerRole._id] } });

    return new NextResponse(JSON.stringify(sellers), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
