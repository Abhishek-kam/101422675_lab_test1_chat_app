import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const { room } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", room);

    // Listen for incoming room messages
    socket.on("roomMessages", (roomMessages) => {
      setMessages(roomMessages);
    });

    // Listen for new messages
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { room, user: localStorage.getItem("username") || "Anonymous", text: message });
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-[80%] max-w-4xl">
        <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-lg font-semibold">Chat Room: {room}</h1>
          <button
            onClick={handleLeaveRoom}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md text-white transition-all duration-300"
          >
            Leave Room
          </button>
        </header>
        <main className="flex-grow p-4 bg-gray-100 h-[400px] overflow-auto rounded-b-lg">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong className="text-blue-600">{msg.user}</strong>: {msg.text}
            </div>
          ))}
        </main>
        <footer className="p-4 flex items-center bg-white rounded-b-lg">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg ml-2 shadow-md transition-all duration-300"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChatRoom;
