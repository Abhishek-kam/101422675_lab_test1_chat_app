const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const GroupMessage = require("./models/GroupMessage"); // Import GroupMessage model

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chat_app";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Auth Routes
app.use("/auth", authRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.io Events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", async (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    // Fetch and send previous messages in the room
    try {
      const roomMessages = await GroupMessage.find({ room }).sort({ createdAt: 1 });
      socket.emit("roomMessages", roomMessages);
    } catch (err) {
      console.error("Error fetching room messages:", err);
    }
  });

  // Handle sending a chat message
  socket.on("chatMessage", async ({ room, user, text }) => {
    console.log(`Message in room ${room}: ${text} by ${user}`);

    // Save the message to the database
    const newMessage = new GroupMessage({ room, user, text });
    try {
      await newMessage.save();
      io.to(room).emit("message", { user, text, createdAt: newMessage.createdAt });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Handle typing indicator
  socket.on("typing", ({ room, user }) => {
    socket.to(room).emit("typing", user);
  });

  socket.on("stopTyping", ({ room }) => {
    socket.to(room).emit("stopTyping");
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
