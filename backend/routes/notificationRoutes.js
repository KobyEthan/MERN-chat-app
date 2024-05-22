const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendNotification,
  allNotifications,
} = require("../controllers/notificationControllers");

const router = express.Router();

router.route("/").post(protect, sendNotification);
router.route("/").get(protect, allNotifications);

module.exports = router;
