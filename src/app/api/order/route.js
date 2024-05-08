import Delivery from "@/models/Delivery";
import Order from "@/models/Order";
import Role from "@/models/Role";
import User from "@/models/User";
import connect from "@/utils/db";
import { roleData } from "@/utils/permission";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  try {
    await connect();

    const order = await Order.find(query)
      .populate({
        path: "items.productId",
        select: "title image",
      })
      .exec();

    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();

  try {
    await connect();

    const deliveryPersonnelRole = await Role.findOne({
      role: roleData.Personnel_Delivery,
    });

    for (const order of values.items.payouts) {
      const deliveryPersonnel = await User.find({
        role: { $in: [deliveryPersonnelRole._id] },
        address: order.address,
      });

      let minDistance = Number.MAX_VALUE;
      let closestDeliveryPerson = null;
      if (deliveryPersonnel) {
        for (const personnel of deliveryPersonnel) {
          for (const item of order.items) {
            const distance = calculateDistance(
              personnel.location,
              item.location
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestDeliveryPerson = personnel;
            }
          }
        }
      }

      // Create the order
      const newOrder = new Order({
        userId: values.items.userInfo.id,
        totalPrice: order.totalPrice,
        shippingPrice: order.shippingPrice,
        items: order.items,
        receiverInformation: values.items.receiverInformation,
        receiverLocation: order.receiverLocation,
        deliveryStatus: deliveryPersonnel ? "assigned" : "notAssigned",
      });
      await newOrder.save();

      if (deliveryPersonnel) {
        // Store the assigned delivery
        const newDelivery = new Delivery({
          deliveryCost: order.shippingPrice,
          deliveryStatus: "Pending",
          order: newOrder._id,
          deliveryPersonnel: closestDeliveryPerson._id,
        });
        await newDelivery.save();
      }
    }
    return new NextResponse("Orders processed successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Function to calculate distance between two points (using Haversine formula)
function calculateDistance(location1, location2) {
  const [lat1, lon1] = location1;
  const [lat2, lon2] = location2;

  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}
