import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["ProductCategory"];

const productCategorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    productType: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        image: {
          type: String,
          required: true,
        },
        brands: [
          {
            name: {
              type: String,
              required: true,
              // unique: true,
            },

            image: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);
