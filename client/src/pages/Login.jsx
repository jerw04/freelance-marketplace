import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/bg.jpg";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      
      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Login failed: " + err.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center">
        Freelance Marketplace
      </h1>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white placeholder-white border border-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white placeholder-white border border-white"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="underline font-semibold hover:text-blue-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;