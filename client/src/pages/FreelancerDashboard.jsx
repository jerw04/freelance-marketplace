import { useState, useEffect } from "react";
import axios from "axios";

export default function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applicationData, setApplicationData] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleChange = (jobId, e) => {
    setApplicationData({
      ...applicationData,
      [jobId]: {
        ...applicationData[jobId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleApply = async (jobId) => {
    try {
      const { coverLetter, resumeUrl } = applicationData[jobId] || {};
      await axios.post(
        `http://localhost:5000/api/applications/${jobId}`,
        { coverLetter, resumeUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Applied successfully!");
    } catch (err) {
      console.error("Error applying:", err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-sm">Budget: ${job.budget}</p>
            <p className="text-sm">Category: {job.category}</p>

            <div className="mt-2">
              <textarea
                name="coverLetter"
                placeholder="Cover Letter"
                className="w-full border p-2 mb-2 rounded"
                onChange={(e) => handleChange(job._id, e)}
              />
              <input
                type="text"
                name="resumeUrl"
                placeholder="Resume URL"
                className="w-full border p-2 mb-2 rounded"
                onChange={(e) => handleChange(job._id, e)}
              />
              <button
                onClick={() => handleApply(job._id)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
