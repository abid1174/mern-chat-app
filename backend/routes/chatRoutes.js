const express = require("express");
const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controller/chatController");

router.route("/").post(authGuard, accessChat);
router.route("/").get(authGuard, fetchChat);
router.route("/rename").put(authGuard, renameGroup);
router.route("/group").post(authGuard, createGroupChat);
router.route("/group/add").put(authGuard, addToGroup);
router.route("/group/remove").put(authGuard, removeFromGroup);

module.exports = router;
