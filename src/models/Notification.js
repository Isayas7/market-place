import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    notificationType: {
      type: String,
      required: true,
    },
    notificationBody: {
      type: String,
      required: true,
    },
    notificationStatus: {
      type: String,
      required: true,
    },
    notificationTitle: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
