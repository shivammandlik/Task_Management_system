import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/add-tasks";

const AddTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            await Axios.post(API_URL, task, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Task added successfully!");
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to add task. Try again.");
        }
    };

    return (
        <div className="flex justify-center py-10">
            <div className="bg-cyan-50 p-6 border border-cyan-500 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-cyan-900 mb-4">Add Task</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="border p-4 rounded-md shadow-md bg-gray-50 space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        placeholder="Description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <input
                        type="date"
                        value={task.dueDate}
                        min={today}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    

                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <button type="submit" className="w-full bg-cyan-600 text-white text-lg py-2 rounded-lg hover:bg-cyan-800">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
