// src/pages/student/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useStudentAuth } from "../../context/StudentAuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaSpinner,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { loginStudent } = useStudentAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Email and password are required");
    }

    setLoading(true);
    try {
      const res = await API.post("/students/auth/login", {
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Login successful");

        loginStudent(res.data.token, res.data.student);

        if (res.data.student?._id) {
          localStorage.setItem("studentId", res.data.student._id);
        }

        setTimeout(() => navigate("/student/dashboard"), 1000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur mb-4">
              <FaSignInAlt className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Student Login</h1>
            <p className="text-indigo-100 text-sm mt-2">
              Welcome back! Login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link
                to="/student/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 disabled:opacity-60 transition"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/student/apply/signup"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}