// src/pages/staff/steps/Step6.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StaffAPI from "../../../services/staffApi";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function formatSalary(range) {
  if (!range || (!range.min && !range.max)) return "Not disclosed";
  const fmt = (n) => `Rs. ${Number(n).toLocaleString()}`;
  if (range.min && range.max) return `${fmt(range.min)} – ${fmt(range.max)}`;
  return fmt(range.min || range.max);
}

export default function Step6({ initialData = {}, onSubmit, onBack, loading = false }) {
  const [jobs, setJobs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedId, setSelectedId] = useState(
    initialData?.jobPost?._id || initialData?.jobPost || ""
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await StaffAPI.get("/cms/job-posts", {
          params: { status: "open" },
        });
        if (res.data?.success) setJobs(res.data.jobPosts || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load job posts");
      } finally {
        setFetching(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const job = jobs.find((j) => j._id === selectedId);
    if (!job) {
      toast.error("Please select a job to apply for");
      return;
    }
    await onSubmit({
      jobPostId: job._id,
      roleSlug: job.roleSlug,
      department: job.department,
      designation: job.designation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaBriefcase />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 6 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Select a Position</h2>
        </div>
      </div>

      {fetching ? (
        <div className="flex items-center justify-center py-16">
          <FaSpinner className="text-2xl text-emerald-700 animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
          <FaBriefcase className="text-3xl text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No open positions available right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const isSelected = selectedId === job._id;
            return (
              <label
                key={job._id}
                className={`block border rounded-lg p-4 cursor-pointer transition ${
                  isSelected
                    ? "border-emerald-600 ring-1 ring-emerald-600 bg-emerald-50"
                    : "border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="jobPost"
                    checked={isSelected}
                    onChange={() => setSelectedId(job._id)}
                    className="mt-1 accent-emerald-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{job.title}</p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {job.designation}{job.department ? ` • ${job.department}` : ""}
                        </p>
                      </div>
                      {isSelected && <FaCheckCircle className="text-emerald-600 shrink-0" />}
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-slate-400" />
                        {job.city}{job.campus ? ` — ${job.campus}` : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMoneyBillWave className="text-slate-400" />
                        {formatSalary(job.salaryRange)}
                      </span>
                      {job.deadline && (
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-slate-400" />
                          Apply by {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-4 py-2.5 text-sm font-medium"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="submit"
          disabled={loading || fetching || jobs.length === 0}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Saving...
            </>
          ) : (
            "Save Selection"
          )}
        </button>
      </div>
    </form>
  );
}