// src/pages/student/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useStudentAuth } from "../context/StudentAuthContext";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaGraduationCap,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const { student, logoutStudent } = useStudentAuth();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/students/profile");
        if (res.data?.success) {
          setProfile(res.data.student);
          setApplications(res.data.applications || []);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logoutStudent();
    navigate("/student/login");
  };

  const getStatusBadge = (status) => {
    const map = {
      draft: { color: "bg-gray-100 text-gray-700", icon: <FaClock />, label: "Draft" },
      pending: { color: "bg-yellow-100 text-yellow-700", icon: <FaClock />, label: "Pending" },
      approved: { color: "bg-green-100 text-green-700", icon: <FaCheckCircle />, label: "Approved" },
      rejected: { color: "bg-red-100 text-red-700", icon: <FaTimesCircle />, label: "Rejected" },
    };
    const b = map[status] || map.draft;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${b.color}`}>
        {b.icon} {b.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
      </div>
    );
  }

  const studentData = profile || student;
  const isProfileComplete = profile?.lastStepCompleted >= 4;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaGraduationCap className="text-indigo-600 text-2xl" />
            <span className="font-bold text-gray-800">UMS Student Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl text-indigo-200" />
            <div>
              <h1 className="text-2xl font-bold">
                Welcome{studentData?.personalInfo?.firstName
                  ? `, ${studentData.personalInfo.firstName}`
                  : ""}!
              </h1>
              <p className="text-indigo-100">{studentData?.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/student/register"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <FaFileAlt className="text-indigo-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">
              {isProfileComplete ? "View Application" : "Complete Application"}
            </h3>
            <p className="text-sm text-gray-500">
              {isProfileComplete
                ? "Review your submitted application"
                : "Fill in your 4-step admission form"}
            </p>
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <FaGraduationCap className="text-purple-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">
              Applications
            </h3>
            <p className="text-sm text-gray-500">
              {applications.length} application(s)
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Profile Status</h3>
            <p className="text-sm text-gray-500">
              Step {studentData?.lastStepCompleted || 0} of 4 completed
            </p>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            My Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No applications yet</p>
              <Link
                to="/student/register"
                className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Start Application
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {app.program || app.enrollmentSnapshot?.degreeClass}
                    </p>
                    <p className="text-sm text-gray-500">
                      {app.enrollmentSnapshot?.department} •{" "}
                      {app.enrollmentSnapshot?.shift}
                    </p>
                    {app.rollNo && (
                      <p className="text-xs text-gray-400 mt-1">
                        Roll No: {app.rollNo}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}