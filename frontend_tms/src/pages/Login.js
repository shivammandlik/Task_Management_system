import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/login";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await Axios.post(API_URL, user);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-cyan-300">
        <h1 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
          User Login
        </h1>

        {error && (
          <p className="text-center text-red-500 font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-cyan-800 transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
