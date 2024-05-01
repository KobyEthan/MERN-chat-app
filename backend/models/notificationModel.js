const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationModel);

module.exports = Notification;
