import { orderStatus } from "@/utils/permission";
import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: orderStatus.Pending,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
