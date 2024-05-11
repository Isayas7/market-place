import mongoose from "mongoose";

const { Schema } = mongoose;
//delete mongoose.connection.models["Product"];

const reviewSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      // enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
