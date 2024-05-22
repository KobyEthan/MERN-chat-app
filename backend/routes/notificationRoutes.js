const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendNotification,
  allNotifications,
  markAsRead,
} = require("../controllers/notificationControllers");

const router = express.Router();

router.route("/").post(protect, sendNotification);
router.route("/").get(protect, allNotifications);
router.route("/read").put(protect, markAsRead);
module.exports = router;
