import mongoose from "mongoose";

const { Schema } = mongoose;
delete mongoose.connection.models["Product"];

const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
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
    productCatagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    storeFront: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storefront",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
