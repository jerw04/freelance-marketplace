import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/Dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Site Title */}
      <h1 className="absolute top-8 text-4xl font-extrabold text-white z-10 drop-shadow-lg">
        Freelance Marketplace
      </h1>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="z-10 bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white bg-opacity-70 text-black placeholder-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-white bg-opacity-70 text-black placeholder-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Login
        </button>

        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 underline hover:text-blue-400">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
