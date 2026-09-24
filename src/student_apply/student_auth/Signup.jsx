import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      return toast.error("All fields are required");
    }
    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await API.post("/students/auth/signup", {
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      if (res.data?.success) {
        toast.success(
          res.data.message || "Signup successful! Please verify your email."
        );
        // Dev: agar verifyUrl mila to direct verify page pe bhejein
        if (res.data.verifyToken) {
          localStorage.setItem("pendingVerifyToken", res.data.verifyToken);
        }
        setTimeout(() => navigate("/student/login"), 2000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur mb-4">
              <FaUserGraduate className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Student Account</h1>
            <p className="text-indigo-100 text-sm mt-2">
              Sign up to start your admission application
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
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
                  placeholder="Min 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 disabled:opacity-60 transition"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  Sign Up <FaArrowRight />
                </>
              )}
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/student/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} University Management System
        </p>
      </div>
    </div>
  );
}