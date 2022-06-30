const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
