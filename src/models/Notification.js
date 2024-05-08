import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Notification"];

const notificationSchema = new Schema(
  {
    notificationType: {
      type: String,
      required: true,
    },

    notificationStatus: {
      type: String,
      enum: ["seen", "unseen"],
      default: "unseen",
      required: true,
    },
    notificationCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
