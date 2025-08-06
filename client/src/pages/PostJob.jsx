import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "client") {
      alert("Only clients can post jobs.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title,
          description,
          budget,
          category,
          clientId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job posted successfully!");
      setTitle("");
      setDescription("");
      setBudget("");
      setCategory("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full p-2 mb-4 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          className="w-full p-2 mb-4 border rounded"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g., Design, Dev, Writing)"
          className="w-full p-2 mb-4 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
