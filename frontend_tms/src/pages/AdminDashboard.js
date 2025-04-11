import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    Axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data.user);
        setTasks(res.data.tasks);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await Axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleUpdateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await Axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        {
          title: editTitle,
          description: editDescription,
          dueDate: editDueDate,
          priority: editPriority,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === editTask._id ? res.data.task : task
        )
      );
      setEditTask(null);
      alert("Task updated successfully!");
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priorityFilter === "All" || task.priority === priorityFilter)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-lg text-gray-600 mb-6">Email: {user.email}</p>

          <div className="mb-6">
            <Link
              to="/add-task"
              className="bg-cyan-600 text-white font-bold py-2 px-4 rounded hover:bg-cyan-800"
            >
              + Add Task
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="mb-4 flex space-x-4">
            <input
              type="text"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-1 rounded border-cyan-600"
            />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border px-3 py-1 rounded border-cyan-600"
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Task Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-cyan-600">
              <thead>
                <tr className="bg-cyan-100 text-left">
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Due Date</th>
                  <th className="border px-4 py-2">Priority</th>
                  <th className="border px-4 py-2">Completed</th>
                  {user.role === "admin" && (
                    <th className="border px-4 py-2">User Email</th>
                  )}
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task._id} className="hover:bg-cyan-50">
                      {editTask && editTask._id === task._id ? (
                        <>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) =>
                                setEditTitle(e.target.value)
                              }
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="date"
                              value={editDueDate}
                              onChange={(e) =>
                                setEditDueDate(e.target.value)
                              }
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <select
                              value={editPriority}
                              onChange={(e) =>
                                setEditPriority(e.target.value)
                              }
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </td>
                          <td className="border px-4 py-2">
                            {task.completed ? "Yes" : "No"}
                          </td>
                          {user.role === "admin" && (
                            <td className="border px-4 py-2">
                              {task.userId?.email || "Unknown"}
                            </td>
                          )}
                          <td className="border px-4 py-2 space-x-2">
                            <button
                              onClick={handleUpdateTask}
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditTask(null)}
                              className="bg-gray-500 text-white px-2 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="border px-4 py-2">{task.title}</td>
                          <td className="border px-4 py-2">{task.description}</td>
                          <td className="border px-4 py-2">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </td>
                          <td className="border px-4 py-2">{task.priority}</td>
                          <td className="border px-4 py-2">
                            {task.completed ? "Yes" : "No"}
                          </td>
                          {user.role === "admin" && (
                            <td className="border px-4 py-2">
                              {task.userId?.email || "Unknown"}
                            </td>
                          )}
                          <td className="border px-4 py-2 space-x-2">
                            <button
                              onClick={() => {
                                setEditTask(task);
                                setEditTitle(task.title);
                                setEditDescription(task.description);
                                setEditDueDate(task.dueDate.split("T")[0]);
                                setEditPriority(task.priority);
                              }}
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={user.role === "admin" ? "7" : "6"}
                      className="text-center text-gray-600 py-4"
                    >
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
