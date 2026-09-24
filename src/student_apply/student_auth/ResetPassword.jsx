// src/pages/student/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaSpinner } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await API.post(`/students/auth/reset-password/${token}`, {
        password,
      });
      if (res.data?.success) {
        toast.success("Password reset successful! Please login.");
        setTimeout(() => navigate("/student/login"), 1500);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid or expired reset token"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <FaLock className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-indigo-100 text-sm mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 disabled:opacity-60"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Resetting...
              </>
            ) : (
              <>
                <FaCheck /> Reset Password
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            <Link
              to="/student/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              ← Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}