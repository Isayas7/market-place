import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import Delivery from "@/models/Delivery";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();

  try {
    await connect();

    for (const item of values.items) {
      // seller balance
      const product = await Product.findById(item?.productId?._id);
      const user = await User.findById(product?.user);
      user.balance += parseFloat(item.price);
      await user.save();
    }

    // deliveryPersonnel balance
    const delivery = await Delivery.find({ order: values?._id });
    const deliveryPerson = await User.findById(delivery[0]?.deliveryPersonnel);
    deliveryPerson.balance += parseFloat(values?.shippingPrice);
    await deliveryPerson.save();

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { confirmation: "Delivered" },
      { new: true }
    );

    if (!updatedOrder) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedOrder), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
