import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    productQuantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
