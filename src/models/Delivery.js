import mongoose from "mongoose";

const { Schema } = mongoose;

const deliverySchema = new Schema(
  {
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryCost: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", deliverySchema);
