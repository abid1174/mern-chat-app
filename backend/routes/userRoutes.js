const express = require("express");
const { authGuard } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controller/userController");
const router = express.Router();

// api/user/
router.route("/").post(registerUser).get(authGuard, getUsers);
router.post("/login", loginUser);

module.exports = router;
