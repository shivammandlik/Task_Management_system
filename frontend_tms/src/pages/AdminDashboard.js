import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isAdminLoggedIn) {
      navigate("/admin");
      return;
    }

    const fetchUsersAndTasks = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/users"),
          axios.get("http://localhost:5000/api/admin/tasks"),
        ]);
        setUsers(usersRes.data.users);
        setTotalUsers(usersRes.data.users.length);
        setTasks(tasksRes.data.tasks);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchUsersAndTasks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-white p-4 overflow-auto">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-cyan-800">
          Welcome Admin!
        </h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-600">
          Dashboard
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="mb-6 font-semibold text-2xl text-cyan-700 text-center">
          Total Users: {totalUsers}
        </p>

        {/* USERS TABLE */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-cyan-600 text-white">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOGGLE BUTTON */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowTasks(!showTasks)}
            className="bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-cyan-800 transition"
          >
            {showTasks ? "Hide All Tasks" : "Show All Tasks"}
          </button>
        </div>

        {/* TASKS SECTION */}
        {showTasks && (
          <div className="bg-gradient-to-b from-cyan-50 to-white p-6 rounded-xl shadow-inner border border-cyan-300">
            <h2 className="text-3xl font-bold mb-6 text-center text-cyan-800 underline decoration-cyan-400">
              All User Tasks
            </h2>

            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No tasks available.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="border p-5 rounded-xl shadow-lg bg-white border-cyan-400 hover:shadow-xl transition-all duration-200"
                  >
                    <h3 className="text-xl font-bold text-cyan-700 mb-2">
                      {task.title}
                    </h3>
                    <p className="text-gray-800 mb-1">{task.description}</p>
                    <p className="text-sm text-blue-700 font-semibold mb-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Priority:{" "}
                      <span
                        className={`font-semibold ${
                          task.priority === "High"
                            ? "text-red-600"
                            : task.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </p>
                    <p className="text-sm mb-1">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          task.completed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      Assigned to: <strong>{task.user.name}</strong> (
                      {task.user.email})
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
