// src/pages/staff/JobListing.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StaffAPI from "../../services/staffApi";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaTimes,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function formatSalary(range) {
  if (!range || (!range.min && !range.max)) return "Not disclosed";
  const fmt = (n) => `Rs. ${Number(n).toLocaleString()}`;
  if (range.min && range.max) {
    return `${fmt(range.min)} – ${fmt(range.max)}${range.negotiable ? " (negotiable)" : ""}`;
  }
  return `${fmt(range.min || range.max)}${range.negotiable ? " (negotiable)" : ""}`;
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JobListing() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await StaffAPI.get("/cms/job-posts", {
          params: { status: "open" },
        });
        if (res.data?.success) {
          setJobs(res.data.jobPosts || []);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load job posts");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    const isLoggedIn = !!sessionStorage.getItem("staffToken");
    if (!isLoggedIn) {
      toast.info("Please sign in to apply for this position");
      navigate("/staff/login");
      return;
    }

    setApplyingId(job._id);
    try {
      const res = await StaffAPI.post("/staff/step/6", {
        jobPostId: job._id,
        roleSlug: job.roleSlug,
        department: job.department,
        designation: job.designation,
      });

      if (res.data?.success) {
        toast.success(`Selected "${job.title}" — continue your application`);
        setSelectedJob(null);
        navigate("/staff/application");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to select this job");
    } finally {
      setApplyingId(null);
    }
  };

  const isDeadlinePassed = (deadline) =>
    deadline && new Date(deadline) < new Date();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold tracking-wide text-emerald-300/80">
            University Careers Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mt-2">
            Open Positions
          </h1>
          <p className="text-slate-300 mt-3 max-w-xl">
            Browse current vacancies across departments and campuses. Select a
            role to start or continue your application.
          </p>
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <FaSpinner className="text-3xl text-emerald-700 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <FaBriefcase className="text-4xl text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No open positions right now. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {jobs.map((job) => {
              const closed = isDeadlinePassed(job.deadline);
              return (
                <div
                  key={job._id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col hover:border-emerald-300 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{job.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {job.designation}{job.department ? ` • ${job.department}` : ""}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                      {job.city}{job.campus ? ` — ${job.campus}` : ""}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-slate-400 shrink-0" />
                      {formatSalary(job.salaryRange)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-slate-400 shrink-0" />
                      {job.vacancies} vacanc{job.vacancies === 1 ? "y" : "ies"}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400 shrink-0" />
                      Apply by {formatDate(job.deadline)}
                      {closed && (
                        <span className="text-red-600 font-medium">(closed)</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-sm font-medium text-slate-700 hover:text-slate-900"
                    >
                      View details
                    </button>
                    <button
                      onClick={() => handleApply(job)}
                      disabled={closed || applyingId === job._id}
                      className="ml-auto inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                      {applyingId === job._id ? (
                        <>
                          <FaSpinner className="animate-spin" /> Applying...
                        </>
                      ) : (
                        "Apply now"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-slate-900/60 flex items-center justify-center px-4 z-50"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{selectedJob.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {selectedJob.designation}{selectedJob.department ? ` • ${selectedJob.department}` : ""}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedJob.description || "No description provided."}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Location</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-slate-400" />
                    {selectedJob.city}{selectedJob.campus ? ` — ${selectedJob.campus}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Employment Type</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaBuilding className="text-slate-400" />
                    {selectedJob.employmentType}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Salary Range</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaMoneyBillWave className="text-slate-400" />
                    {formatSalary(selectedJob.salaryRange)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Experience Required</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaClock className="text-slate-400" />
                    {selectedJob.experienceRequired
                      ? `${selectedJob.experienceRequired} year(s)`
                      : "Fresh / No experience required"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Vacancies</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaUsers className="text-slate-400" />
                    {selectedJob.vacancies}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Application Deadline</p>
                  <p className="text-slate-900 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400" />
                    {formatDate(selectedJob.deadline)}
                  </p>
                </div>
                {selectedJob.joiningDate && (
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-slate-500 mb-1">Expected Joining Date</p>
                    <p className="text-slate-900 flex items-center gap-1.5">
                      <FaCheckCircle className="text-slate-400" />
                      {formatDate(selectedJob.joiningDate)}
                    </p>
                  </div>
                )}
              </div>

              {selectedJob.qualification && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Qualification</p>
                  <p className="text-sm text-slate-700">{selectedJob.qualification}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-5 border-t border-slate-100">
              <button
                onClick={() => handleApply(selectedJob)}
                disabled={isDeadlinePassed(selectedJob.deadline) || applyingId === selectedJob._id}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-semibold transition"
              >
                {applyingId === selectedJob._id ? (
                  <>
                    <FaSpinner className="animate-spin" /> Applying...
                  </>
                ) : isDeadlinePassed(selectedJob.deadline) ? (
                  "Applications closed"
                ) : (
                  "Apply for this position"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}