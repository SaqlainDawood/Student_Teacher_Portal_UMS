// src/pages/staff/steps/Step2.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUsers, FaArrowLeft, FaArrowRight, FaSpinner } from "react-icons/fa";

const phoneRegex = /^03\d{9}$/;

export default function Step2({ initialData = {}, onSubmit, onBack, loading = false }) {
  const [form, setForm] = useState({
    fatherName: initialData.fatherName || "",
    fatherOccupation: initialData.fatherOccupation || "",
    motherName: initialData.motherName || "",
    maritalStatus: initialData.maritalStatus || "",
    emergencyContactPerson: initialData.emergencyContactPerson || "",
    emergencyContactPhone: initialData.emergencyContactPhone || "",
    emergencyContactRelation: initialData.emergencyContactRelation || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fatherName.trim()) e.fatherName = "Father's name is required.";
    if (!form.emergencyContactPerson.trim())
      e.emergencyContactPerson = "Emergency contact person is required.";
    if (!form.emergencyContactPhone.trim()) {
      e.emergencyContactPhone = "Emergency contact phone is required.";
    } else if (!phoneRegex.test(form.emergencyContactPhone.trim())) {
      e.emergencyContactPhone = "Phone must be 11 digits and start with 03.";
    }
    if (!form.emergencyContactRelation.trim())
      e.emergencyContactRelation = "Relation is required.";
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
      fatherName: form.fatherName.trim(),
      fatherOccupation: form.fatherOccupation.trim(),
      motherName: form.motherName.trim(),
      maritalStatus: form.maritalStatus || null,
      emergencyContactPerson: form.emergencyContactPerson.trim(),
      emergencyContactPhone: form.emergencyContactPhone.trim(),
      emergencyContactRelation: form.emergencyContactRelation.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaUsers />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 2 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Family Information</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Father's Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.fatherName && <p className="text-xs text-red-600 mt-1">{errors.fatherName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Father's Occupation</label>
          <input
            type="text"
            name="fatherOccupation"
            value={form.fatherOccupation}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={form.motherName}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Marital Status</label>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition bg-white"
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="text-sm font-semibold text-slate-800 mb-4">Emergency Contact</p>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Contact Person <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emergencyContactPerson"
              value={form.emergencyContactPerson}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
            />
            {errors.emergencyContactPerson && (
              <p className="text-xs text-red-600 mt-1">{errors.emergencyContactPerson}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emergencyContactPhone"
              value={form.emergencyContactPhone}
              onChange={handleChange}
              disabled={loading}
              maxLength={11}
              inputMode="numeric"
              placeholder="03001234567"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
            />
            {errors.emergencyContactPhone && (
              <p className="text-xs text-red-600 mt-1">{errors.emergencyContactPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Relation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emergencyContactRelation"
              value={form.emergencyContactRelation}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. Brother"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
            />
            {errors.emergencyContactRelation && (
              <p className="text-xs text-red-600 mt-1">{errors.emergencyContactRelation}</p>
            )}
          </div>
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