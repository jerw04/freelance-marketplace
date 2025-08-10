// src/pages/ClientDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
  });

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("userId"); // stored in Login.jsx

  // Fetch jobs for this client
  useEffect(() => {
    if (!clientId) return;
    fetchJobs();
  }, [clientId]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        { ...formData }, // no clientId here, backend uses token
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({ title: "", description: "", budget: "", category: "" });
      fetchJobs();
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Failed to post job");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

      {/* Post Job Form */}
      <form
        onSubmit={handlePostJob}
        className="bg-white p-6 rounded shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full border p-2 mb-3 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full border p-2 mb-3 rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          className="w-full border p-2 mb-3 rounded"
          value={formData.budget}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 mb-3 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Post Job
        </button>
      </form>

      {/* Job List */}
      <h2 className="text-xl font-semibold mb-4">My Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="text-sm">Budget: ${job.budget}</p>
              <p className="text-sm">Category: {job.category}</p>

              {/* Applicants Section */}
              {job.applicants && job.applicants.length > 0 ? (
                <div className="mt-2">
                  <h4 className="font-semibold">Applicants:</h4>
                  <ul>
                    {job.applicants.map((app) => (
                      <li key={app._id} className="border-t pt-1 mt-1">
                        {app.freelancer?.username}{" "}
                        {app.freelancer?.resumeUrl && (
                          <>
                            -{" "}
                            <a
                              href={app.freelancer.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Resume
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No applicants yet.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
