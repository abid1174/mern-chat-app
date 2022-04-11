const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authGuard = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized! token failed!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized! not token!");
  }
});

module.exports = { authGuard };
