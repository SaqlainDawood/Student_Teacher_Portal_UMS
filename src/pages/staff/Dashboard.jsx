// src/pages/staff/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StaffAPI from "../../services/staffApi";
import {
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBriefcase,
  FaSpinner,
  FaUserCircle,
  FaArrowRight,
} from "react-icons/fa";

const STEP_LABELS = {
  1: "Personal Info",
  2: "Family Info",
  3: "Education",
  4: "Experience",
  5: "Expectations",
  6: "Job Selection",
};

const STATUS_MAP = {
  draft: { color: "bg-slate-100 text-slate-700", icon: <FaClock />, label: "Draft" },
  pending: { color: "bg-amber-100 text-amber-700", icon: <FaClock />, label: "Pending Review" },
  approved: { color: "bg-green-100 text-green-700", icon: <FaCheckCircle />, label: "Approved" },
  rejected: { color: "bg-red-100 text-red-700", icon: <FaTimesCircle />, label: "Rejected" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await StaffAPI.get("/staff/application");
        if (res.data?.success) {
          setStaff(res.data.staff);
        }
      } catch (err) {
        console.error("Staff dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("staffToken");
    sessionStorage.removeItem("staffData");
    navigate("/staff/apply/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <FaSpinner className="text-4xl text-emerald-700 animate-spin" />
      </div>
    );
  }

  const completedSteps = staff?.completedSteps || [];
  const currentStep = staff?.currentStep || 1;
  const selectedJob = staff?.step6_applyFor?.jobPost;
  const status = STATUS_MAP[staff?.applicationStatus] || STATUS_MAP.draft;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBriefcase className="text-emerald-700 text-xl" />
            <span className="font-semibold text-slate-800">Careers Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl text-emerald-300" />
            <div>
              <h1 className="text-2xl font-semibold">
                {staff?.step1_personalInfo?.fullName
                  ? `Welcome, ${staff.step1_personalInfo.fullName}!`
                  : "Welcome!"}
              </h1>
              <p className="text-emerald-100 text-sm">{staff?.email}</p>
            </div>
          </div>
        </div>

        {/* Status + progress */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-xs font-medium text-slate-500 mb-2">Application Status</p>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
              {status.icon} {status.label}
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-xs font-medium text-slate-500 mb-2">Steps Completed</p>
            <p className="text-2xl font-semibold text-slate-900">
              {completedSteps.length} / 6
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-xs font-medium text-slate-500 mb-2">Applying For</p>
            <p className="text-sm font-semibold text-slate-900">
              {selectedJob?.title || "No job selected yet"}
            </p>
          </div>
        </div>

        {/* Step progress list */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold text-slate-900 mb-4">Application Progress</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((step) => {
              const isDone = completedSteps.includes(step);
              const isCurrent = step === currentStep && !staff?.isSubmitted;
              return (
                <div
                  key={step}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isDone ? <FaCheckCircle /> : step}
                    </span>
                    <span className="text-sm text-slate-700">{STEP_LABELS[step]}</span>
                  </div>
                  {isCurrent && (
                    <span className="text-xs font-medium text-emerald-700">In progress</span>
                  )}
                </div>
              );
            })}
          </div>

          {!staff?.isSubmitted && (
            <Link
              to="/staff/apply/application"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              {completedSteps.length === 0 ? "Start Application" : "Continue Application"}
              <FaArrowRight />
            </Link>
          )}
        </div>

        {!selectedJob && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">Haven't picked a role yet?</h3>
              <p className="text-sm text-slate-500 mt-1">
                Browse open positions and select one to apply for.
              </p>
            </div>
            <Link
              to="/staff/apply/jobs"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shrink-0"
            >
              <FaBriefcase /> Browse open jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}