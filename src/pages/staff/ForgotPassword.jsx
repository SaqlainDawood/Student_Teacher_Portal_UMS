// src/pages/staff/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import StaffAPI from "../../services/staffApi";
import { FaEnvelope, FaSpinner } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await StaffAPI.post("/staff/forgot-password", {
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
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      {/* ============================================== */}
      {/* LEFT — Welcome panel */}
      {/* ============================================== */}
      <div className="relative md:w-1/2 flex flex-col justify-between px-8 py-10 md:px-16 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-800/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="text-xs font-semibold tracking-wide text-emerald-300/80">
            University Careers Portal
          </span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Build your career with the university
          </h1>
          <p className="mt-5 text-slate-300 text-base leading-relaxed">
            Lost access to your account? We'll send a secure link to your
            email so you can set a new password.
          </p>

          <p className="mt-10 text-slate-300 text-sm">
            Remembered it after all?{" "}
            <Link
              to="/staff/apply/login"
              className="text-white font-semibold underline decoration-emerald-400 underline-offset-4 hover:text-emerald-300"
            >
              Back to sign in
            </Link>
          </p>
        </div>

        <div className="relative text-xs text-slate-500">
          Contact:{" "}
          <a href="mailto:careers@university.edu" className="text-slate-400 hover:text-slate-200">
            careers@university.edu
          </a>
        </div>
      </div>

      {/* ============================================== */}
      {/* RIGHT — Form panel */}
      {/* ============================================== */}
      <div className="md:w-1/2 flex items-center justify-center bg-white px-6 py-12 md:py-0">
        <div className="w-full max-w-sm">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Forgot password</h2>
            <Link
              to="/staff/apply/login"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Sign in
            </Link>
          </div>

          {sent ? (
            <div className="py-6">
              <p className="text-slate-900 font-medium">Check your inbox</p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                If an account exists for that email, a reset link is on its
                way. Follow it to set a new password.
              </p>
              <Link
                to="/staff/apply/login"
                className="inline-block mt-6 text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 transition"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}