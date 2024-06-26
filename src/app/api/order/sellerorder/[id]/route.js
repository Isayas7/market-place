import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    // Find products associated with the user
    const products = await Product.find({ user: id });
    const productIds = products.map((product) => product._id.toString());

    const orders = await Order.find({
      "items.productId": { $in: productIds },
    }).populate({
      path: "deliveryPersonnelId",
      model: "User",
      select: "firstName middleName email",
    });
    // Filter items in orders based on productIds associated with the user
    const ordersWithMatchingItems = orders.map((order) => {
      const matchingItems = order.items.filter((item) =>
        productIds.includes(item.productId.toString())
      );
      console.log(matchingItems);
      return { ...order.toObject(), items: matchingItems };
    });

    return new NextResponse(JSON.stringify(ordersWithMatchingItems), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
