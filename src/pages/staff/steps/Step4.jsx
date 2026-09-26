// src/pages/staff/steps/Step4.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

const emptyRecord = {
  companyName: "",
  designation: "",
  fromDate: "",
  toDate: "",
  description: "",
  lastSalary: "",
};

export default function Step4({ initialData = [], onSubmit, onBack, loading = false }) {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [record, setRecord] = useState(emptyRecord);

  useEffect(() => {
    if (Array.isArray(initialData) && initialData.length > 0) {
      setList(
        initialData.map((item) => ({
          ...item,
          fromDate: item.fromDate ? new Date(item.fromDate).toISOString().split("T")[0] : "",
          toDate: item.toDate ? new Date(item.toDate).toISOString().split("T")[0] : "",
        }))
      );
    }
  }, [initialData]);

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!record.companyName.trim()) return toast.error("Please enter Company Name");
    if (!record.designation.trim()) return toast.error("Please enter Designation");
    if (!record.fromDate) return toast.error("Please enter Start Date");

    setList((prev) => [
      ...prev,
      { ...record, lastSalary: Number(record.lastSalary) || 0 },
    ]);
    setRecord(emptyRecord);
    setModalOpen(false);
    toast.success("Experience record added");
  };

  const removeRecord = (idx) => {
    setList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    // Experience is optional — a fresh graduate may have none.
    await onSubmit(list);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaBriefcase />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 4 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Work Experience</h2>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Add previous roles, if any. This step is optional for fresh graduates.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-lg">
          <FaBriefcase className="text-3xl text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((exp, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 border border-slate-200 rounded-lg p-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{exp.designation}</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {exp.companyName} • {exp.fromDate || "—"} to {exp.toDate || "Present"}
                </p>
                {exp.description && (
                  <p className="text-sm text-slate-600 mt-1.5">{exp.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeRecord(idx)}
                className="text-red-500 hover:text-red-700 shrink-0"
              >
                <FaTrash />
              </button>
            </div>
          ))}
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

      {/* Add record modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 flex items-center justify-center px-4 z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-900">Add Experience</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={record.companyName}
                  onChange={handleRecordChange}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={record.designation}
                  onChange={handleRecordChange}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="fromDate"
                    value={record.fromDate}
                    onChange={handleRecordChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    To Date <span className="text-slate-400 font-normal">(leave blank if current)</span>
                  </label>
                  <input
                    type="date"
                    name="toDate"
                    value={record.toDate}
                    onChange={handleRecordChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Drawn Salary</label>
                <input
                  type="number"
                  name="lastSalary"
                  value={record.lastSalary}
                  onChange={handleRecordChange}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={record.description}
                  onChange={handleRecordChange}
                  rows={3}
                  placeholder="Key responsibilities and achievements"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}