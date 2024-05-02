const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const Message = require("../models/messageModel");

const sendNotification = asyncHandler(async (req, res) => {
  const { messageId } = req.body;

  if (!messageId) {
    console.log("Couldn't get message");
    return res.sendStatus(400);
  }

  var newNotification = {
    sender: req.user._id,
    messageId: messageId,
    read: false,
  };

  // console.log(newNotification);

  try {
    let notification = await Notification.create(newNotification);

    notification = await notification.populate("sender", "name");
    notification = await notification.populate("message", "content");

    const message = await Message.findById(req.body.messageId);

    const response = {
      notification,
      message: message ? message.toObject() : null,
    };

    res.json(response);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allNotifications = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.find({
      message: req.params.messageId,
    })
      .populate("sender", "name")
      .populate("message");

    res.json(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendNotification, allNotifications };
