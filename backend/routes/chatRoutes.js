const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatControllers");
const { fetchChats } = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroup);
// router.route("/rename-group").put(protect, renameGroup);
// router.route("/remove-group").put(protect, removeGroup);
// router.route("/add-to-group").pu(protect, addToGroup);

module.exports = router;
