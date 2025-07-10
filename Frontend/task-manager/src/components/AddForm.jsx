import React, { useState } from "react";
import axios from "axios";

const AddForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  try {
    const res = await axios.post("http://localhost:5500/tasks", form);
    if (res.status === 201) {
      setMessage("Task added!");
      setForm({ title: "", description: "", status: "" });
      if (onTaskAdded) onTaskAdded();
    } else {
      setMessage("Error adding task");
    }
  } catch (error) {
    setMessage("Server error");
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddForm;