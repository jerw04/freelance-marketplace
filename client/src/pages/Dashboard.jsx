import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePostJob = () => {
    navigate("/post-job");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Freelance Marketplace Dashboard!</h1>
        <p className="mb-4">Logged in as: <strong>{user.username}</strong> ({user.role})</p>

        {user.role === "client" && (
          <button
            onClick={handlePostJob}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            ➕ Post a Job
          </button>
        )}

        {user.role === "freelancer" && (
          <p className="text-gray-700">You can browse jobs in the next update 👷‍♂️</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
