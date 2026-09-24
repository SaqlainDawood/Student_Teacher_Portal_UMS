// src/pages/student/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import { FaEnvelope, FaPaperPlane, FaSpinner } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await API.post("/students/auth/forgot-password", {
        email: email.toLowerCase().trim(),
      });
      if (res.data?.success) {
        setSent(true);
        toast.success("If the email exists, a reset link has been sent.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <FaEnvelope className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
          <p className="text-indigo-100 text-sm mt-2">
            Enter your email and we'll send a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {sent ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium">
                ✅ Reset link sent to your email
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Check your inbox and follow the link
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
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
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Reset Link
                  </>
                )}
              </button>
            </>
          )}

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