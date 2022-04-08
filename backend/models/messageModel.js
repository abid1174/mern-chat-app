const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    content: { type: String, trim: true },
    Chat: { type: mongoose.Schema.Types.ObjectId, ref: "ChatModel" },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("MessageModel", messageSchema);
module.exports = MessageModel;
