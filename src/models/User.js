import { statusData } from "@/utils/permission";
import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["User"];

const userSchema = new Schema(
  {
    profileImage: {
      type: String,
    },

    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },

    identificationCard: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    bankInfo: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
    isSeller: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: statusData.Active,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
