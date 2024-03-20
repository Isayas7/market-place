import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["Role"];

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permission: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
