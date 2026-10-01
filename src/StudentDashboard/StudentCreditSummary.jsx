import React, { useEffect, useState } from "react";
import { getStudentCreditSummary } from "../services/studentCreditService";

const badgeClasses = {
  passed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-slate-200 text-slate-700",
  blocked: "bg-amber-100 text-amber-700",
};

const StudentCreditSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      setError("Student ID not found.");
      setLoading(false);
      return;
    }

    const loadSummary = async () => {
      try {
        const response = await getStudentCreditSummary(studentId);
        setSummary(response || null);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load credit summary");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-600">Loading credit summary...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  const subjects = summary?.subjects ?? [];
  const semesters = summary?.semesters ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Credit Summary</h2>
        <p className="text-sm text-slate-500">Semester-wise academic credit progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Total</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{summary?.classTotalCreditHours ?? 0}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Passed</div>
          <div className="mt-2 text-2xl font-semibold text-green-700">{summary?.passedCreditHours ?? 0}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Failed</div>
          <div className="mt-2 text-2xl font-semibold text-red-700">{summary?.failedCreditHours ?? 0}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-500">Pending</div>
          <div className="mt-2 text-2xl font-semibold text-slate-700">{summary?.pendingCreditHours ?? 0}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Semester breakdown</h3>
        <div className="space-y-3">
          {semesters.length === 0 ? (
            <p className="text-sm text-slate-500">No semester data available.</p>
          ) : (
            semesters.map((semester) => (
              <div key={semester.semesterId} className="rounded-lg border border-slate-200 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-800">Semester {semester.semesterNumber}</span>
                  <span className="text-xs text-slate-500">
                    Passed {semester.passedCreditHours || 0} / Failed {semester.failedCreditHours || 0}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${
                        Math.min(
                          100,
                          ((semester.passedCreditHours || 0) /
                            Math.max(summary?.classTotalCreditHours || 1, 1)) * 100
                        )
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Subject status</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Credit</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {subjects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-3 py-8 text-center text-slate-500">
                    No subject data available.
                  </td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject.subjectId}>
                    <td className="px-3 py-2">
                      <div className="font-medium text-slate-800">{subject.name}</div>
                      {subject.blockedBy && (
                        <div className="text-xs text-amber-700" title={`Prerequisite ${subject.blockedBy} not passed`}>
                          Blocked by {subject.blockedBy}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">{subject.creditHours || 0}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${badgeClasses[subject.status] || badgeClasses.pending}`}>
                        {subject.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentCreditSummary;
