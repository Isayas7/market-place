import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const trendingProducts = await Product.aggregate([
      {
        $match: {
          purchasedBy: { $ne: [] },
        },
      },
      {
        $addFields: {
          purchasedByCount: { $size: "$purchasedBy" },
        },
      },
      {
        $sort: { purchasedByCount: -1 },
      },
      {
        $limit: 20,
      },
    ]).exec();

    return new NextResponse(JSON.stringify(trendingProducts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
