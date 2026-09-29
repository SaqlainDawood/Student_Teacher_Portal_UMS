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
  FaUser,
  FaUsers,
  FaBookOpen,
  FaUniversity,
  FaChartLine,
  FaPlus,
  FaExternalLinkAlt,
  FaPhone,
  FaIdCard,
  FaTint,
  FaGlobe,
  FaPrayingHands,
  FaHeart,
} from "react-icons/fa";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: <FaChartLine /> },
  { key: "personal", label: "Personal Info", icon: <FaUser /> },
  { key: "family", label: "Family Info", icon: <FaUsers /> },
  { key: "education", label: "Education", icon: <FaBookOpen /> },
  { key: "applications", label: "My Applications", icon: <FaUniversity /> },
];

const STATUS_MAP = {
  draft: { color: "bg-slate-100 text-slate-700", icon: <FaClock />, label: "Draft" },
  pending: { color: "bg-amber-100 text-amber-700", icon: <FaClock />, label: "Pending" },
  approved: { color: "bg-green-100 text-green-700", icon: <FaCheckCircle />, label: "Approved" },
  rejected: { color: "bg-red-100 text-red-700", icon: <FaTimesCircle />, label: "Rejected" },
};

function StatusBadge({ status }) {
  const b = STATUS_MAP[status] || STATUS_MAP.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${b.color}`}>
      {b.icon} {b.label}
    </span>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-sm text-slate-900">{value || "—"}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { student, logoutStudent } = useStudentAuth();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/students/steps/profile");
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
    navigate("/student/apply/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <FaSpinner className="text-4xl text-blue-700 animate-spin" />
      </div>
    );
  }

  const studentData = profile || student;
  const personal = studentData?.personalInfo || {};
  const family = studentData?.familyInfo || {};
  const education = studentData?.education || [];
  const lastStep = studentData?.lastStepCompleted || 0;
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(" ");
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ============================================== */}
      {/* SIDEBAR */}
      {/* ============================================== */}
      <aside className="hidden md:flex md:w-64 flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-blue-400 text-xl shrink-0" />
            <span className="font-semibold leading-tight">
              University Management System
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === item.key
                  ? "bg-blue-700 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <Link
            to="/student/apply/steps"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-300 hover:bg-white/5 hover:text-emerald-200 transition"
          >
            <FaPlus className="text-base" />
            Apply for a program
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-white/5 hover:text-red-200 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* ============================================== */}
      {/* MAIN */}
      {/* ============================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Welcome{fullName ? `, ${fullName}` : ""}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{today}</p>
          </div>

          <div className="flex items-center gap-3">
            {personal.profileImage?.url ? (
              <img
                src={personal.profileImage.url}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <FaUserCircle className="text-3xl text-slate-300" />
            )}
            <button
              onClick={handleLogout}
              className="md:hidden text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 max-w-5xl w-full mx-auto">
          {/* ============================================== */}
          {/* OVERVIEW */}
          {/* ============================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4">
                  {personal.profileImage?.url ? (
                    <img
                      src={personal.profileImage.url}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl text-blue-300" />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {fullName || "Student"}
                    </h2>
                    <p className="text-blue-200 text-sm">{studentData?.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <FaFileAlt className="text-blue-700" />
                  </div>
                  <p className="text-2xl font-semibold text-slate-900">{lastStep} / 4</p>
                  <p className="text-sm text-slate-500">Profile steps completed</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <FaUniversity className="text-emerald-700" />
                  </div>
                  <p className="text-2xl font-semibold text-slate-900">{applications.length}</p>
                  <p className="text-sm text-slate-500">
                    Application{applications.length === 1 ? "" : "s"} submitted
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <FaGraduationCap className="text-amber-700" />
                  </div>
                  <p className="text-2xl font-semibold text-slate-900">{education.length}</p>
                  <p className="text-sm text-slate-500">Education records added</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Applying for another program?</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Your profile is already complete — pick a new degree class and shift to submit another application.
                  </p>
                </div>
                <Link
                  to="/student/apply/steps"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shrink-0"
                >
                  <FaPlus /> Apply for a program
                </Link>
              </div>
            </div>
          )}

          {/* ============================================== */}
          {/* PERSONAL INFO */}
          {/* ============================================== */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                {personal.profileImage?.url ? (
                  <img
                    src={personal.profileImage.url}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-slate-300" />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{fullName || "—"}</h2>
                  <p className="text-sm text-slate-500">{studentData?.email}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <InfoField label="CNIC" value={personal.cnic} />
                <InfoField
                  label="Date of Birth"
                  value={personal.DOB ? new Date(personal.DOB).toLocaleDateString() : null}
                />
                <InfoField label="Gender" value={personal.gender} />
                <InfoField label="Phone Number" value={personal.phoneNo} />
                <InfoField label="Religion" value={personal.religion} />
                <InfoField label="Blood Group" value={personal.bloodGroup} />
                <InfoField label="Marital Status" value={personal.maritalStatus} />
                <InfoField label="Nationality" value={personal.nationality} />
              </div>
            </div>
          )}

          {/* ============================================== */}
          {/* FAMILY INFO */}
          {/* ============================================== */}
          {activeTab === "family" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Family Information</h2>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-blue-700 mb-3">FATHER</p>
                  <div className="space-y-4">
                    <InfoField label="Full Name" value={family.fatherName} />
                    <InfoField label="CNIC" value={family.fatherCnic} />
                    <InfoField label="Occupation" value={family.fatherOccupation} />
                    <InfoField label="Mobile Number" value={family.fatherMobile} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wide text-blue-700 mb-3">MOTHER</p>
                  <div className="space-y-4">
                    <InfoField label="Full Name" value={family.motherName} />
                    <InfoField label="CNIC" value={family.motherCnic} />
                    <InfoField label="Occupation" value={family.motherOccupation} />
                    <InfoField label="Mobile Number" value={family.motherMobile} />
                  </div>
                </div>

                {(family.guardianName || family.guardianMobile) && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold tracking-wide text-blue-700 mb-3">GUARDIAN</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <InfoField label="Full Name" value={family.guardianName} />
                      <InfoField label="Relation" value={family.guardianRelation} />
                      <InfoField label="Mobile Number" value={family.guardianMobile} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================== */}
          {/* EDUCATION */}
          {/* ============================================== */}
          {activeTab === "education" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Education Records</h2>

              {education.length === 0 ? (
                <p className="text-sm text-slate-500">No education records added yet.</p>
              ) : (
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-lg p-5 flex flex-wrap items-start justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {edu.degreeLevel} {edu.qualification ? `— ${edu.qualification}` : ""}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {edu.boardUni} • Roll No: {edu.rollNo} • {edu.passingYear}
                        </p>
                        <p className="text-sm text-slate-700 mt-2">
                          {edu.obtainMarks} / {edu.totalMarks} marks
                          {edu.percentage ? ` (${edu.percentage}%)` : ""}
                        </p>
                      </div>

                      {edu.markSheet?.url && (
                        <a
                          href={edu.markSheet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
                        >
                          View marksheet <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================== */}
          {/* APPLICATIONS */}
          {/* ============================================== */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <h2 className="text-lg font-semibold text-slate-900">My Applications</h2>
                <Link
                  to="/student/apply/steps"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  <FaPlus /> Apply for another program
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <FaFileAlt className="text-5xl text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">No applications yet</p>
                  <Link
                    to="/student/apply/steps"
                    className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    Start Application
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between gap-4 p-5 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex-wrap"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {app.program || app.enrollmentSnapshot?.degreeClass}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {app.enrollmentSnapshot?.campus} • {app.enrollmentSnapshot?.department} •{" "}
                          {app.enrollmentSnapshot?.shift}
                        </p>
                        {app.rollNo && (
                          <p className="text-xs text-slate-400 mt-1">Roll No: {app.rollNo}</p>
                        )}
                        {app.rejectionReason && (
                          <p className="text-xs text-red-500 mt-1">Reason: {app.rejectionReason}</p>
                        )}
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}