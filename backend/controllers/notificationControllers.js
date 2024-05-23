const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

const sendNotification = asyncHandler(async (req, res) => {
  const { messageId, chatId } = req.body;

  if (!messageId || !chatId) {
    console.log("Couldn't get message or chat");
    return res.sendStatus(400);
  }

  var newNotification = {
    sender: req.user._id,
    message: messageId,
    user: req.body.userId,
    chat: chatId,
    read: false,
  };

  try {
    let notification = await Notification.create(newNotification);

    notification = await notification.populate("sender", "name");
    notification = await notification.populate("message", "content");

    res.json(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .populate("sender", "name")
      .populate("message")
      .populate("chat");

    res.json(notifications);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const markAsRead = asyncHandler(async (req, res) => {
  try {
    const { notificationId } = req.body;

    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendNotification, allNotifications, markAsRead };
