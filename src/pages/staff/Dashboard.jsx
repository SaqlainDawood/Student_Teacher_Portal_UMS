// src/pages/staff/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffAPI from "../../services/staffApi";
import {
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBriefcase,
  FaSpinner,
  FaUserCircle,
  FaUser,
  FaUsers,
  FaGraduationCap,
  FaBullseye,
  FaChartLine,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: <FaChartLine /> },
  { key: "personal", label: "Personal Info", icon: <FaUser /> },
  { key: "family", label: "Family Info", icon: <FaUsers /> },
  { key: "education", label: "Education", icon: <FaGraduationCap /> },
  { key: "experience", label: "Experience", icon: <FaBriefcase /> },
  { key: "expectations", label: "Expectations", icon: <FaBullseye /> },
  { key: "application", label: "My Application", icon: <FaBriefcase /> },
];

const STATUS_MAP = {
  draft: { color: "bg-slate-100 text-slate-700", icon: <FaClock />, label: "Draft" },
  pending: { color: "bg-amber-100 text-amber-700", icon: <FaClock />, label: "Pending Review" },
  approved: { color: "bg-green-100 text-green-700", icon: <FaCheckCircle />, label: "Approved" },
  rejected: { color: "bg-red-100 text-red-700", icon: <FaTimesCircle />, label: "Rejected" },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.color}`}>
      {s.icon} {s.label}
    </span>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-sm text-slate-900">{value ?? "—"}</p>
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatMoney(n) {
  if (!n && n !== 0) return "—";
  return `Rs. ${Number(n).toLocaleString()}`;
}

function formatSalaryRange(range) {
  if (!range || (!range.min && !range.max)) return "Not disclosed";
  if (range.min && range.max) {
    return `${formatMoney(range.min)} – ${formatMoney(range.max)}${range.negotiable ? " (negotiable)" : ""}`;
  }
  return `${formatMoney(range.min || range.max)}${range.negotiable ? " (negotiable)" : ""}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await StaffAPI.get("/staff/application");
        if (res.data?.success) setStaff(res.data.staff);
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

  const personal = staff?.step1_personalInfo || {};
  const family = staff?.step2_familyInfo || {};
  const education = staff?.step3_education || [];
  const experience = staff?.step4_experience || [];
  const expectations = staff?.step5_expectations || {};
  const applyFor = staff?.step6_applyFor || {};
  const job = applyFor?.jobPost;
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
      <aside className="hidden md:flex md:w-64 flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-emerald-400 text-xl shrink-0" />
            <span className="font-semibold leading-tight">Careers Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === item.key
                  ? "bg-emerald-700 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
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
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Welcome{personal.fullName ? `, ${personal.fullName}` : ""}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{today}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-slate-300" />
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
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-6xl text-emerald-300" />
                  <div>
                    <h2 className="text-2xl font-semibold">{personal.fullName || "Applicant"}</h2>
                    <p className="text-emerald-200 text-sm">{staff?.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-xs font-medium text-slate-500 mb-2">Application Status</p>
                  <StatusBadge status={staff?.applicationStatus} />
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-xs font-medium text-slate-500 mb-2">Steps Completed</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {(staff?.completedSteps || []).length} / 6
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-xs font-medium text-slate-500 mb-2">Applying For</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {job?.title || "No job selected"}
                  </p>
                </div>
              </div>

              {staff?.submittedAt && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <p className="text-sm text-slate-600">
                    Application submitted on{" "}
                    <span className="font-medium text-slate-900">{formatDate(staff.submittedAt)}</span>.
                    Our HR team will review it and update you by email.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ============================================== */}
          {/* PERSONAL INFO */}
          {/* ============================================== */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <InfoField label="Full Name" value={personal.fullName} />
                <InfoField label="Email" value={staff?.email} />
                <InfoField label="Phone Number" value={personal.phone} />
                <InfoField label="CNIC" value={personal.cnic} />
                <InfoField
                  label="Date of Birth"
                  value={personal.dateOfBirth ? formatDate(personal.dateOfBirth) : null}
                />
                <InfoField label="Gender" value={personal.gender} />
                <InfoField label="City" value={personal.city} />
                <InfoField label="Address" value={personal.address} />
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
                <div className="space-y-4">
                  <InfoField label="Father's Name" value={family.fatherName} />
                  <InfoField label="Father's Occupation" value={family.fatherOccupation} />
                  <InfoField label="Mother's Name" value={family.motherName} />
                  <InfoField label="Marital Status" value={family.maritalStatus} />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-emerald-700 mb-3">
                    EMERGENCY CONTACT
                  </p>
                  <div className="space-y-4">
                    <InfoField label="Contact Person" value={family.emergencyContactPerson} />
                    <InfoField label="Phone Number" value={family.emergencyContactPhone} />
                    <InfoField label="Relation" value={family.emergencyContactRelation} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================== */}
          {/* EDUCATION */}
          {/* ============================================== */}
          {activeTab === "education" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Education</h2>
              {education.length === 0 ? (
                <p className="text-sm text-slate-500">No education records added.</p>
              ) : (
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={edu._id || idx} className="border border-slate-200 rounded-lg p-5 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{edu.degree}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {edu.institution} • {edu.year}{edu.grade ? ` • ${edu.grade}` : ""}
                        </p>
                      </div>
                      {edu.certificateUrl && (
                        <a
                          href={edu.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                        >
                          View certificate <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================== */}
          {/* EXPERIENCE */}
          {/* ============================================== */}
          {activeTab === "experience" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Work Experience</h2>
              {experience.length === 0 ? (
                <p className="text-sm text-slate-500">No experience added.</p>
              ) : (
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div key={exp._id || idx} className="border border-slate-200 rounded-lg p-5">
                      <p className="font-semibold text-slate-900">{exp.designation}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {exp.companyName} • {formatDate(exp.fromDate)} to{" "}
                        {exp.toDate ? formatDate(exp.toDate) : "Present"}
                      </p>
                      {exp.lastSalary ? (
                        <p className="text-sm text-slate-700 mt-2">
                          Last drawn salary: {formatMoney(exp.lastSalary)}
                        </p>
                      ) : null}
                      {exp.description && (
                        <p className="text-sm text-slate-600 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================== */}
          {/* EXPECTATIONS */}
          {/* ============================================== */}
          {activeTab === "expectations" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Expectations</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <InfoField label="Expected Salary" value={formatMoney(expectations.expectedSalary)} />
                <InfoField
                  label="Available Joining Date"
                  value={expectations.joiningDate ? formatDate(expectations.joiningDate) : null}
                />
                <InfoField label="Preferred Department" value={expectations.preferredDepartment} />
                <InfoField label="Preferred City" value={expectations.preferredCity} />
                <div className="sm:col-span-2">
                  <InfoField label="Additional Notes" value={expectations.additionalNotes} />
                </div>
              </div>
            </div>
          )}

          {/* ============================================== */}
          {/* APPLICATION / JOB */}
          {/* ============================================== */}
          {activeTab === "application" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <h2 className="text-lg font-semibold text-slate-900">My Application</h2>
                <StatusBadge status={staff?.applicationStatus} />
              </div>

              {!job ? (
                <p className="text-sm text-slate-500">No job selected yet.</p>
              ) : (
                <div className="border border-slate-200 rounded-lg p-5">
                  <p className="font-semibold text-slate-900 text-base">{job.title}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {job.designation} • {job.department}
                  </p>

                  <p className="text-sm text-slate-700 mt-4 leading-relaxed">{job.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-5 text-sm">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-slate-400" />
                      {job.city}{job.campus ? ` — ${job.campus}` : ""}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-slate-400" />
                      {formatSalaryRange(job.salaryRange)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400" />
                      Deadline: {formatDate(job.deadline)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400" />
                      Joining: {formatDate(job.joiningDate)}
                    </div>
                  </div>

                  {staff?.submittedAt && (
                    <p className="text-xs text-slate-400 mt-5">
                      Submitted on {formatDate(staff.submittedAt)}
                    </p>
                  )}

                  {staff?.rejectionReason && (
                    <div className="mt-5 bg-red-50 border border-red-100 rounded-lg p-4">
                      <p className="text-xs font-semibold text-red-700 mb-1">Feedback</p>
                      <p className="text-sm text-red-700">{staff.rejectionReason}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}