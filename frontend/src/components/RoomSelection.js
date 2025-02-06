import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomSelection = () => {
  const [room, setRoom] = useState("News");
  const username = localStorage.getItem("username") || "Anonymous";
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/chat/${room}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-[80%] max-w-2xl">
        <h1 className="text-lg font-semibold text-center mb-4">Join a Chat Room</h1>
        <p className="text-center mb-4">Logged in as: <strong>{username}</strong></p>
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="News">News</option>
          <option value="Sports">Sports</option>
          <option value="Movies">Movies</option>
          <option value="Technology">Technology</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleJoinRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Join Room
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
