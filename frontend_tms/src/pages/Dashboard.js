import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Low");

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user details from the backend
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

      // Remove the deleted task from the state
      setTasks(tasks.filter(task => task._id !== taskId));
      alert("Task Deleted successfully!");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await Axios.put(
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

      setTasks(tasks.map(task => (task._id === editTask._id ? response.data.task : task)));
      setEditTask(null);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Apply search and filter options
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priorityFilter === "All" || task.priority === priorityFilter)
  );

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

      // Update the tasks state with the toggled task
      setTasks(tasks.map(task =>
        task._id === taskId ? response.data.task : task
      ));
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  };



  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-bold ml-36">Welcome, {user.name}!</h1>
          <p className="text-lg text-gray-600 ml-36">Email: {user.email}</p>

          <br />
          <div className='flex justify-center space-x-4 mt-10 mr-4'>
            <Link to="/add-task"
              className='py-2 px-5 border text-3xl mt-10 mr-4 border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800'>
              + Add Task
            </Link>
          </div>

          <div>
            {/* FILTER AND SEARCH TASK */}
            <h2 className="text-3xl font-semibold text-center mt-6 mb-3">Filter and Search Tasks</h2>
            <div className="flex justify-center space-x-4">
              <input type="text" placeholder="Search tasks" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="border-2 rounded-md border-cyan-600 mr-1 px-4 py-1" />
              <select className="border-2 rounded-md border-cyan-600 mr-4 px-4 py-1" value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)} >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            {/* Task List */}
            <div className="mt-6 ml-36 w-9/12">
              <h2 className="text-3xl font-semibold text-center">My Tasks</h2>
              {/* {tasks.length > 0 ? ( */}
              {filteredTasks.length > 0 ? (
                <ul className="mt-4 space-y-4 ">
                  {/* {tasks.map((task) => ( */}
                  {filteredTasks.map((task) => (
                    <li key={task._id} className="border p-4 rounded shadow bg-cyan-50 border-cyan-500">
                      {/* EDIT TASK OPTIONS */}
                      {editTask && editTask._id === task._id && (
                        <div className="mt-6 p-4 bg-cyan-100 border rounded border-cyan-400">
                          <h2 className="text-xl font-semibold text-center">Edit Task</h2>
                          <input type="text" className="border rounded-md border-gray-500 mr-1" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                          <input type="text" className="border rounded-md border-gray-500 mr-1" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                          <input type="date" className="border rounded-md border-gray-500 mr-1" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
                          <select className="border rounded-md border-gray-500 mr-1" value={editPriority} onChange={(e) => setEditPriority(e.target.value)} >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                          <button onClick={handleUpdateTask} className="bg-green-600 text-white text-lg font-semibold rounded px-4 py-1 mt-2 hover:bg-green-800">
                            Update
                          </button>
                          <button
                            onClick={() => setEditTask(null)}
                            className="bg-gray-700 text-white text-lg font-semibold rounded px-4 py-1 mt-2 ml-2 hover:bg-teal-950"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      <div>
                        <h3 className="text-2xl font-bold text-cyan-700 mb-1">{task.title}</h3>
                        <p className="text-black text-xl break-words mb-1">{task.description}</p>
                        <p className="text-sm text-blue-700 font-semibold mb-1">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`px-3 py-1 text-lg font-bold rounded  ${task.priority === "High"
                            ? "bg-red-500 text-white"
                            : task.priority === "Medium"
                              ? "bg-yellow-500 text-black"
                              : "bg-green-500 text-black"
                            }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Display Task Completion Status */}
                      <div className="mt-4">
                        <button
                          onClick={() => handleToggleCompletion(task._id)}
                          className={`py-2 px-4 rounded font-semibold ${task.completed ? "bg-green-500" : "bg-gray-500"} text-white`}
                        >
                          {task.completed ? "Completed" : "Not Completed"}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setEditTask(task);
                          setEditTitle(task.title);
                          setEditDescription(task.description);
                          setEditDueDate(task.dueDate.split("T")[0]);
                          setEditPriority(task.priority);
                        }}
                        className="bg-teal-700 mt-4 mr-4 text-white text-lg font-semibold px-4 py-1 rounded hover:bg-teal-950"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-700 mt-4 text-white text-lg font-semibold px-4 py-1 rounded hover:bg-red-950"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-4">No tasks added yet.</p>
              )}
            </div>
          </div>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
