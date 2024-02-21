import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({}, { timestamps: true });

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("Role", roleSchema);
