import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["Role"];

const roleSchema = new Schema(
  {
    role: {
      type: String,
      unique: true,
      required: true,
    },
    permission: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
