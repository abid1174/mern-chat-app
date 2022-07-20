const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

// Listening Server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Socket Configuration
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("Connected to socket io.");

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(userData.id + " connected to the socket");
    socket.emit("connected");
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("User joined the room: " + roomId);
  });

  socket.on("new_message", (message) => {
    console.log(message);
    let chat = message.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    socket.in(chat.users[1]._id).emit("message_received", message);

    // chat.users.forEach((user) => {
    //   console.log("user ======> ");
    //   console.log(user);
    //   if (user._id === message.sender._id) return;
    //   socket.in(user._id).emit("message_received", message);
    // });
  });
});
