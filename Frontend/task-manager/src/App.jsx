import { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5500/tasks");
      setTasks(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Task Manager</h1>
      <AddForm onTaskAdded={fetchTasks} />
      <h2>Tasks</h2>
      <ul>
        {tasks.length === 0 && <li>No tasks yet.</li>}
        {tasks.map((task) => (
          <li className="flex" key={task._id || task.title}>
            <strong>{task.title}</strong> - {task.description} ({task.status})
            <button onClick={() => handleDelete(task._id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;