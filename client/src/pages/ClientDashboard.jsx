import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientJobs();
  }, []);

  const fetchClientJobs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/client/${localStorage.getItem("userId")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching client jobs:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-sm">Budget: ${job.budget}</p>
            <p className="text-sm">Category: {job.category}</p>

            {/* Applicants List */}
            <h4 className="mt-4 text-lg font-semibold">Applicants:</h4>
            {job.applicants && job.applicants.length > 0 ? (
  <div className="grid gap-4 mt-2">
    {job.applicants.map((app, i) => (
      <div
        key={i}
        className="relative p-4 rounded-lg border border-gray-500 shadow-md bg-black/50 backdrop-blur-md overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
        }}
      >
        {/* Diagonal Shine Animation */}
        <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 transform rotate-12 animate-shine"></div>

        <p className="font-semibold text-white">
          {app.freelancer?.username || "Unknown"}
        </p>
        <p className="text-gray-300">
          Resume:{" "}
          <a
            href={app.resumeUrl}
            className="text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>
        </p>
        <p className="text-sm text-gray-400">{app.coverLetter}</p>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">No applicants yet.</p>
)}

          </div>
        ))
      )}
    </div>
  );
}
