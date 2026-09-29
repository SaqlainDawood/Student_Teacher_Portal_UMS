// src/pages/staff/steps/Step1.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaArrowRight, FaSpinner } from "react-icons/fa";

const phoneRegex = /^03\d{9}$/;
const cnicRegex = /^\d{13}$/;

export default function Step1({ initialData = {}, onSubmit, loading = false }) {
  const [form, setForm] = useState({
    fullName: initialData.fullName || "",
    phone: initialData.phone || "",
    cnic: initialData.cnic || "",
    dateOfBirth: initialData.dateOfBirth
      ? new Date(initialData.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: initialData.gender || "",
    city: initialData.city || "",
    address: initialData.address || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!phoneRegex.test(form.phone.trim()))
      e.phone = "Phone must be 11 digits and start with 03.";
    if (form.cnic.trim() && !cnicRegex.test(form.cnic.trim()))
      e.cnic = "CNIC must be exactly 13 digits.";
    if (!form.city.trim()) e.city = "City is required.";
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
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      cnic: form.cnic.trim(),
      dateOfBirth: form.dateOfBirth || null,
      gender: form.gender || null,
      city: form.city.trim(),
      address: form.address.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaUser />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 1 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter your full name"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            maxLength={11}
            inputMode="numeric"
            placeholder="03001234567"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">CNIC</label>
          <input
            type="text"
            name="cnic"
            value={form.cnic}
            onChange={handleChange}
            disabled={loading}
            maxLength={13}
            inputMode="numeric"
            placeholder="3520212345671"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.cnic && <p className="text-xs text-red-600 mt-1">{errors.cnic}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            disabled={loading}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={loading}
            placeholder="Lahore"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
          />
          {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={loading}
            rows={3}
            placeholder="Enter your full address"
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
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