const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    content: { type: String, trim: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timeStamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);

module.exports = { Message };
