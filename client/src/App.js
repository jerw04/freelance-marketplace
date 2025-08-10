// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/client-dashboard"
            element={
              <PrivateRoute role="client">
                <ClientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/freelancer-dashboard"
            element={
              <PrivateRoute role="freelancer">
                <FreelancerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
