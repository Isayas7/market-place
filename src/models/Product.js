import mongoose from "mongoose";

const { Schema } = mongoose;
// delete mongoose.connection.models["Product"];

const productSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    productImage: {
      type: [String],
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: [String],
    },
    model: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
