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
    variants: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    title: {
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
    purchasedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    discount: [
      {
        amount: Number,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        expireDate: Date,
      },
    ],
    promotion: {
      amount: {
        type: Number,
      },
      expireDate: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
