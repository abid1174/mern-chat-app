const express = require("express");
const { authGuard } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
} = require("../controller/userController");
const router = express.Router();

// api/user/
router.route("/").post(registerUser).get(authGuard, getCurrentUser);
router.post("/login", loginUser);
router.route("/all").get(authGuard, getUsers);

module.exports = router;
