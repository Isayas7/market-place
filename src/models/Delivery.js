import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["Delivery"];

const deliverySchema = new Schema(
  {
    deliveryDate: {
      type: Date,
    },
    deliveryCost: {
      type: Number,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    deliveryPersonnel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", deliverySchema);
