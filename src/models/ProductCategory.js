import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["ProductCategory"];

const productCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    productNames: [
      {
        name: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);
