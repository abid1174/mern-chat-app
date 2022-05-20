const express = require("express");
const { authGuard } = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require("../controller/messageController");
const router = express.Router();

router.route("/").post(authGuard, sendMessage);
router.route("/:chatId").get(authGuard, allMessages);

module.exports = router;
