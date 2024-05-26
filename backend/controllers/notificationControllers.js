const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

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
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// const deleteNotification = asyncHandler(async (req, res) => {
//   try {
//     const notification = await Notification.findById(req.params.notificationId);
//     if (notification) {
//       await notification.deleteOne({ _id: req.params.notificationId });
//       res.json({ message: "Notification removed" });
//     } else {
//       console.log("Notification not found");
//       res.status(404).json({ message: "Notification not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting notification:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = { allNotifications, markAsRead };
