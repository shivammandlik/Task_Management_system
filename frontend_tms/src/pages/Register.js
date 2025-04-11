import React, { useState } from "react";
import Axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const Register = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const addUser = async () => {
    try {
      const response = await Axios.post(API_URL, newUser);
      setUsers([...users, response.data.newUser]);
      setNewUser({ name: "", email: "", password: "" });

      alert("Account Created Successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-cyan-300">
        <h1 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
          Register New Account
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
          className="space-y-5"
        >
          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-cyan-900 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-cyan-800 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
