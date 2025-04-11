import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

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
      .then((response) => {
        setUser(response.data.user);
        setTasks(response.data.tasks);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await Axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task Deleted successfully!");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleToggleCompletion = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await Axios.put(
        `http://localhost:5000/api/tasks/${taskId}/completed`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priorityFilter === "All" || task.priority === priorityFilter)
  );

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold ml-36">Welcome, {user.name}!</h1>
          <p className="text-lg text-gray-600 ml-36">Email: {user.email}</p>

          <div>
            <h2 className="text-3xl font-semibold text-center mt-6 mb-3">
              Filter and Search Tasks
            </h2>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 rounded-md border-cyan-600 mr-1 px-4 py-1"
              />
              <select
                className="border-2 rounded-md border-cyan-600 mr-4 px-4 py-1"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="mt-6 ml-10 mr-10">
            <h2 className="text-3xl font-semibold text-center">My Tasks</h2>

            {filteredTasks.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
                <thead>
                  <tr className="bg-cyan-200 text-left">
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Due Date</th>
                    <th className="border px-4 py-2">Priority</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task._id} className="bg-white hover:bg-gray-100">
                      <td className="border px-4 py-2 font-semibold">
                        {task.title}
                      </td>
                      <td className="border px-4 py-2 break-words">
                        {task.description}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            task.priority === "High"
                              ? "bg-red-500 text-white"
                              : task.priority === "Medium"
                              ? "bg-yellow-400 text-black"
                              : "bg-green-400 text-black"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleToggleCompletion(task._id)}
                          className={`px-3 py-1 rounded text-white font-semibold ${
                            task.completed ? "bg-green-600" : "bg-gray-500"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 mt-4 text-center">No tasks added yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
