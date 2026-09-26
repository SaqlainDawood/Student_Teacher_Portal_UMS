// src/pages/student/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useStudentAuth } from "../../context/StudentAuthContext";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      {/* ============================================== */}
      {/* LEFT — Welcome panel (no logo, text only) */}
      {/* ============================================== */}
      <div className="relative md:w-1/2 flex flex-col justify-between px-8 py-10 md:px-16 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-800/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="text-xs font-semibold tracking-wide text-blue-300/80">
            University Management System
          </span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Welcome to the University Management System
          </h1>
          <p className="mt-5 text-slate-300 text-base leading-relaxed">
            Manage your admission, track your application status, and stay
            connected with your university — all from one place.
          </p>

          <p className="mt-10 text-slate-300 text-sm">
            New here?{" "}
            <Link
              to="/student/apply/signup"
              className="text-white font-semibold underline decoration-blue-400 underline-offset-4 hover:text-blue-300"
            >
              Create an account
            </Link>
          </p>
        </div>

        <div className="relative text-xs text-slate-500">
          Contact:{" "}
          <a href="mailto:admissions@university.edu" className="text-slate-400 hover:text-slate-200">
            admissions@university.edu
          </a>
        </div>
      </div>

      {/* ============================================== */}
      {/* RIGHT — Form panel */}
      {/* ============================================== */}
      <div className="md:w-1/2 flex items-center justify-center bg-white px-6 py-12 md:py-0">
        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
            <Link
              to="/student/apply/signup"
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              Create account
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 transition"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-sm">
            <p className="text-slate-600">
              Didn't receive a verification email?{" "}
              <Link to="/student/apply/resend-verification" className="text-blue-700 font-medium hover:text-blue-800">
                Resend email
              </Link>
            </p>
            <p className="text-slate-600">
              Forgot your password?{" "}
              <Link to="/student/apply/forgot-password" className="text-blue-700 font-medium hover:text-blue-800">
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}