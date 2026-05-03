import { Link } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form.name, form.email, form.password);
      navigate("/login");
    } catch {
      setError("Could not create account. Try another email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Join CarRental to rent and upload cars
        </p>
        {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
