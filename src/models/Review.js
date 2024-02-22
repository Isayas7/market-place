import mongoose from "mongoose";

const { Schema } = mongoose;
//delete mongoose.connection.models["Product"];

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
