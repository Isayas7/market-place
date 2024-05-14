import Order from "@/models/Order";
import Product from "@/models/Product";
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

  const pageSize = 6;
  const currentPage = parseInt(query.page);

  try {
    await connect();

    delete query.page;

    const count = await Order.find(query)
      .populate({
        path: "items.productId",
        select: "title image",
      })
      .populate({
        path: "buyerId",
        select: "firstName middleName email",
      })
      .populate({
        path: "deliveryPersonnelId",
        select: "firstName middleName email",
      })
      .countDocuments();

    const orders = await Order.find(query)
      .populate({
        path: "items.productId",
        select: "title image",
      })
      .populate({
        path: "buyerId",
        select: "firstName middleName email",
      })
      .populate({
        path: "deliveryPersonnelId",
        select: "firstName middleName email",
      })
      .sort({
        createdAt: -1,
      })
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize);

    const totalPage = Math.ceil(count / pageSize);

    // console.log(order);
    return new NextResponse(
      JSON.stringify({ orders, totalPage, currentPage }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// export const GET = async (request) => {
//   const { searchParams } = new URL(request.url);
//   let query = {};
//   searchParams.forEach((value, key) => {
//     query[key] = value;
//   });

//   const pageSize = 2;
//   const currentPage = parseInt(query.page);

//   try {
//     await connect();

//     delete query.page;

//     const count = await Order.find(query).countDocuments();

//     const orderData = await Order.find(query)
//       .limit(pageSize)
//       .skip((currentPage - 1) * pageSize);

//     const totalPage = Math.ceil(count / pageSize);

//     const orderDatas = await Promise.all(
//       orderData.map(async (order) => {
//         const BuyerData = await User.findById(order?.buyerId?.toString());
//         const dpData = await User.findById(
//           order?.deliveryPersonnelId.toString()
//         );

//         const productInfo = await Promise.all(
//           order.items.find(async (item) => {
//             const productData = await Product.findById(
//               item.productId.toString()
//             );
//             return {
//               title: productData.title,
//               productImage: productData.productImage,
//             };
//           })
//         );

//         console.log("productInfo", productInfo);

//         const titles = productInfo.find((product) => product.title);
//         const productImages = productInfo.find(
//           (product) => product.productImage
//         );

//         return {
//           BuyerName: BuyerData.firstName + "" + BuyerData.middleName,
//           BuyerEmail: BuyerData.email,
//           dpDataName: dpData.firstName + dpData.middleName,
//           dpDataEmail: dpData.email,
//           titles: titles,
//           productImages: productImages,
//           ...order._doc,
//         };
//       })
//     );

//     console.log("orderDatas", orderDatas);
//     return new NextResponse(
//       JSON.stringify({ orderDatas, totalPage, currentPage }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };
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
        buyerId: values.items.userInfo.id,
        totalPrice: order.totalPrice,
        shippingPrice: order.shippingPrice,
        items: order.items,
        receiverInformation: order.receiverInformation,
        deliveryPersonnelId: closestDeliveryPerson._id,
      });
      await newOrder.save();

      for (const product of order.items) {
        try {
          const productprchased = await Product.findOneAndUpdate(
            { _id: product?.productId },
            { $push: { purchasedBy: values?.items?.userInfo?.id } },
            { new: true }
          );
        } catch (error) {
          console.error(error);
          return new NextResponse("Database Error", { status: 500 });
        }
      }
    }
    return new NextResponse("Orders processed successfully", { status: 200 });
  } catch (error) {
    console.log(error);
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
