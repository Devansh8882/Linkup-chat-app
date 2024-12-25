import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      required: true,
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    recieverId: {
      required: true,
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    text: { type: String },
    image: { type: String },
  },
  { timestamp: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
