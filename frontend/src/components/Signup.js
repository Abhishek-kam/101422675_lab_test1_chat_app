import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-[80%] max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
