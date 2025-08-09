// client/src/components/RoleProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleProtectedRoute;