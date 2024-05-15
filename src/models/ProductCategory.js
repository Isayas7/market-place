import { statusData } from "@/utils/permission";
import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["ProductCategory"];

const productCategorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      default: statusData.Active,
    },
    variants: [
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
        status: {
          type: String,
          default: statusData.Active,
        },
        brands: [
          {
            name: {
              type: String,
              required: true,
            },

            image: {
              type: String,
              required: true,
            },
            status: {
              type: String,
              default: statusData.Active,
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
