import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const products = await Product.find({ user: id });
    const productIds = products.map((product) => product._id);

    const orders = await Order.find({
      "items.productId": { $in: productIds },
    });
    console.log(orders);

    const ordersWithMatchingItems = orders.map((order) => {
      return {
        orderId: order._id,
        items: order.items.filter((item) =>
          productIds.includes(item.productId)
        ),
      };
    });

    return new NextResponse(JSON.stringify(ordersWithMatchingItems), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
