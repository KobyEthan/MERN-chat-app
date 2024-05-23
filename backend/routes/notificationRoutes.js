const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  allNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationControllers");

const router = express.Router();

router.route("/").get(protect, allNotifications);
router.route("/read").put(protect, markAsRead);
router.route("/delete/:notificationId").delete(protect, deleteNotification);
module.exports = router;
