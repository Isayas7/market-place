import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Storefront"];

const storefrontSchema = new Schema(
  {
    numberOfProduct: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Storefront ||
  mongoose.model("Storefront", storefrontSchema);
