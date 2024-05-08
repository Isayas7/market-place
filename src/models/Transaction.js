import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Transaction"];

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    bankinfo: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    amount: {
      type: Number,
    },
    remark: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
