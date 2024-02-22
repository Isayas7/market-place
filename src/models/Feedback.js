import mongoose from "mongoose";

const { Schema } = mongoose;

const feedback = new Schema(
  {
    body: {
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

export default mongoose.models.feedback || mongoose.model("feedback", feedback);
