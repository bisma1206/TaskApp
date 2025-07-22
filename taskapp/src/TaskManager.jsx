import React, { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!title) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className="bg-black/70 min-h-screen px-4 py-10 flex items-center justify-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">
            📝 <span className="text-white">Task Manager</span>
          </h1>
          {/* Add Task Form */}
          <div className="bg-white p-10 rounded-2xl shadow-lg space-y-4">
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button
              onClick={addTask}
              className="w-full bg-blue-700 text-white text-sm py-2 rounded-md hover:bg-green-800 transition"
            >
              ➕ Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl shadow-md border border-gray-200 ${
                  task.completed ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {task.completed ? "✅" : "🔲"} {task.title}
                    </h2>
                    <p className="text-sm text-gray-700 mt-1">
                      {task.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Priority: <strong>{task.priority}</strong> | Due:{" "}
                      {task.dueDate || "Not set"}
                    </p>
                  </div>
                  <div className="space-y-1 flex flex-col">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-xs bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition"
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-xs bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-center text-sm text-gray-600">
                No tasks yet. Start by adding one! 💡
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
