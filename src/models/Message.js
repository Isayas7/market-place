import mongoose from "mongoose";

const { Schema } = mongoose;

delete mongoose.connection.models["Message"];

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

//If the Message collection does not exist create a new one.
export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
