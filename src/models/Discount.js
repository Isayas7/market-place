import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Discount"];

const discountSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["promotoin", "negotiation"],
      required: true,
    },
  },
  { timestamps: true }
);

//If the Discount collection does not exist create a new one.
export default mongoose.models.Discount ||
  mongoose.model("Discount", discountSchema);
