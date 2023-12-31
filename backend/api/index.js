const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

const connectDataBase = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const messageRoutes = require("../routes/messageRoutes");

connectDataBase();

app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.use("/api/user/", userRoutes);
app.use("/api/message/", messageRoutes);

const PORT = process.env.PORT || 1000;

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});