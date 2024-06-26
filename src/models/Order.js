import { orderStatus } from "@/utils/permission";
import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Order"];

const orderSchema = new Schema(
  {
    orderStatus: {
      type: String,
      default: orderStatus.Pending,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    shippingPrice: {
      type: String,
      required: true,
    },
    items: [
      {
        title: {
          type: String,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: {
          type: [String],
        },
        size: {
          type: [Number],
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    receiverInformation: {
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      secretCode: {
        type: Number,
        required: true,
      },
      location: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
