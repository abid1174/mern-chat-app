const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");
const UserModel = require("../models/userModel");

/**
 * @method POST
 * @params null
 * Send Message
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content && !chatId) {
    console.log("Invalid data passed in sendMessage API");
    return res.status(400).send({
      status: false,
      message: "Invalid data passed to the request",
    });
  }

  let newMessage = {
    content,
    sender: req.user._id,
    chat: chatId,
  };

  try {
    let message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name image email",
    });

    // update latest message of chat
    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    return res.status(201).send({
      status: true,
      message: "Message sent successfully!",
      data: message,
    });
  } catch (error) {
    throw new Error(error.message);
    // return res.status(400).send({
    //   status: false,
    //   message: "Something went wrong sending the message!",
    // });
  }
});

/**
 * @method GET
 * @params userId
 * @desc Get All Messages with ID
 */
const allMessages = asyncHandler(async (req, res) => {});

module.exports = {
  sendMessage,
  allMessages,
};
