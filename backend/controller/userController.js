const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const { generateToken } = require("../utils/token");
const bcrypt = require("bcryptjs");

/**
 * Register user controller
 */
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const existedUser = await UserModel.findOne({ email });

  if (existedUser) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    name,
    email,
    password,
    image,
  });

  if (newUser) {
    const { _id, name, email, password, image } = newUser;

    res.status(201).json({
      id: _id,
      name,
      email,
      password,
      image,
      token: generateToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new user!");
  }
});

/**
 * Login user controller
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login credentials!");
  }
});

/**
 * Get Current User
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    _id: req.user._id,
  });

  res.send({
    name: user.name,
    email: user.email,
    image: user.image,
    id: user._id,
  });
});

/**
 * Search User or get All
 * /api/user/all?search=abid
 */
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });

  res.send(users);
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
};
