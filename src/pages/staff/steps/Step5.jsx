// src/pages/staff/steps/Step5.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaBullseye, FaArrowLeft, FaArrowRight, FaSpinner } from "react-icons/fa";

export default function Step5({ initialData = {}, onSubmit, onBack, loading = false }) {
  const [form, setForm] = useState({
    expectedSalary: initialData.expectedSalary || "",
    joiningDate: initialData.joiningDate
      ? new Date(initialData.joiningDate).toISOString().split("T")[0]
      : "",
    preferredDepartment: initialData.preferredDepartment || "",
    preferredCity: initialData.preferredCity || "",
    additionalNotes: initialData.additionalNotes || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.expectedSalary || Number(form.expectedSalary) <= 0)
      e.expectedSalary = "Please enter your expected salary.";
    if (!form.preferredCity.trim()) e.preferredCity = "Preferred city is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (loading) return;
    if (!validate()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }
    await onSubmit({
      expectedSalary: Number(form.expectedSalary),
      joiningDate: form.joiningDate || null,
      preferredDepartment: form.preferredDepartment.trim(),
      preferredCity: form.preferredCity.trim(),
      additionalNotes: form.additionalNotes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaBullseye />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 5 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Expectations</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Expected Salary (PKR) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="expectedSalary"
            value={form.expectedSalary}
            onChange={handleChange}
            disabled={loading}
            placeholder="e.g. 50000"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.expectedSalary && <p className="text-xs text-red-600 mt-1">{errors.expectedSalary}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Available Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Department</label>
          <input
            type="text"
            name="preferredDepartment"
            value={form.preferredDepartment}
            onChange={handleChange}
            disabled={loading}
            placeholder="e.g. Examination"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Preferred City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="preferredCity"
            value={form.preferredCity}
            onChange={handleChange}
            disabled={loading}
            placeholder="Lahore"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.preferredCity && <p className="text-xs text-red-600 mt-1">{errors.preferredCity}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={form.additionalNotes}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            placeholder="Anything else you'd like us to know"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition resize-none"
          />
        </div>
      </div>

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
          disabled={loading}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              Save & Continue <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}