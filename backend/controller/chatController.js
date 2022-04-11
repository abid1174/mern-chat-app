const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.error("Invalid userId!");
    return res.status(400).send({ message: "Invalid userId!" });
  }

  let hasChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  hasChat = await UserModel.populate(hasChat, {
    path: "latestMessage.sender",
    select: "name email image",
  });

  if (hasChat.length > 0) {
    res.status(200).send({ data: hasChat[0] });
  } else {
    const newChat = {
      name: "chat1",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(newChat);
      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(201).send({ data: fullChat });
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    let chats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    chats = await UserModel.populate(chats, {
      path: "latestMessage.sender",
      select: "name image email",
    });

    res.status(200).send(chats);
  } catch (e) {
    console.error(e);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users && !req.body.name) {
    return res.status(400).send({ message: "Please fill all the fields!" });
  }

  let participants = JSON.parse(req.body.users);

  if (participants.length < 2) {
    return res.status(400).send({
      message: "More than 2 users are required to create a group chat!",
    });
  }

  participants.push(req.user);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: participants,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const groupChatResponse = await ChatModel.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send({
      data: groupChatResponse,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found!");
  } else {
    res.status(200).send(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId && !userId) {
    return res
      .status(400)
      .send({ message: "credentials error", status: false });
  }

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.status(200).send(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    if (!chatId && !userId) {
      return res
        .status(400)
        .send({ message: "credentials error", status: false });
    }
  
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat not found");
    } else {
      res.status(200).send(updatedChat);
    }
  });

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};
