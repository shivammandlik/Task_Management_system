import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (password === "admin123") {
      localStorage.setItem("admin_logged_in", "true");
      alert("Admin login successful!");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-cyan-300">
        <h1 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-center text-red-500 font-medium mb-4">{error}</p>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">Admin Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-cyan-800 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
