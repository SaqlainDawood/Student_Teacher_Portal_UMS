// src/pages/staff/steps/Step3.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaGraduationCap,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

const emptyRecord = {
  degree: "",
  institution: "",
  year: "",
  grade: "",
  certificateUrl: "",
};

export default function Step3({ initialData = [], onSubmit, onBack, loading = false }) {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [record, setRecord] = useState(emptyRecord);

  useEffect(() => {
    if (Array.isArray(initialData) && initialData.length > 0) {
      setList(initialData);
    }
  }, [initialData]);

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!record.degree.trim()) return toast.error("Please enter Degree");
    if (!record.institution.trim()) return toast.error("Please enter Institution");
    if (!record.year) return toast.error("Please enter Passing Year");

    setList((prev) => [
      ...prev,
      { ...record, year: Number(record.year) },
    ]);
    setRecord(emptyRecord);
    setModalOpen(false);
    toast.success("Education record added");
  };

  const removeRecord = (idx) => {
    setList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (list.length === 0) {
      toast.error("Please add at least one education record");
      return;
    }
    await onSubmit(list);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          <FaGraduationCap />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-700">STEP 3 OF 6</p>
          <h2 className="text-lg font-semibold text-slate-900">Education</h2>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Add your academic qualifications, most recent first.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
        >
          <FaPlus /> Add Record
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-lg">
          <FaGraduationCap className="text-3xl text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No education records added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((edu, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 border border-slate-200 rounded-lg p-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{edu.degree}</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {edu.institution} • {edu.year}{edu.grade ? ` • ${edu.grade}` : ""}
                </p>
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
              <h3 className="font-semibold text-slate-900">Add Education Record</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={record.degree}
                  onChange={handleRecordChange}
                  placeholder="e.g. BS Computer Science"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={record.institution}
                  onChange={handleRecordChange}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Passing Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={record.year}
                    onChange={handleRecordChange}
                    placeholder="2023"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Grade</label>
                  <input
                    type="text"
                    name="grade"
                    value={record.grade}
                    onChange={handleRecordChange}
                    placeholder="e.g. 3.6 CGPA"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Certificate URL <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="certificateUrl"
                  value={record.certificateUrl}
                  onChange={handleRecordChange}
                  placeholder="Link to uploaded certificate, if any"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
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