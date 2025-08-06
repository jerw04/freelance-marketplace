import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/bg.jpg";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      alert("✅ Registered successfully!");
      reset();
      navigate("/login");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || err.message || "Unknown error occurred";
      alert("❌ Registration failed: " + message);
      console.error("Registration error:", err);
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
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white placeholder-white border border-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white placeholder-white border border-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white placeholder-white border border-white"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="block mb-1">Role</label>
            <select
              {...register("role")}
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 text-white border border-white"
            >
              <option value="">-- Select Role --</option>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-green-600 hover:bg-green-700 text-white font-bold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
