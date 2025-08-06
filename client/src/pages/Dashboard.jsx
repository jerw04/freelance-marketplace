// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user in localStorage:", err);
      }
    } else {
      // No user in localStorage, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Freelance Marketplace Dashboard!
        </h1>
        <p className="text-lg text-gray-700">
          Logged in as: <strong>{user.username}</strong> ({user.role})
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
