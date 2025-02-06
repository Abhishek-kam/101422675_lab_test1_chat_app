import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RoomSelection from "./components/RoomSelection";
import ChatRoom from "./components/ChatRoom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:room" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
