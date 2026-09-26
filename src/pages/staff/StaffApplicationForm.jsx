// src/pages/staff/StaffApplicationForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StaffAPI from "../../services/staffApi";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

import {
  FaUser,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaBullseye,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";

const STEPS = [
  { number: 1, title: "Personal", icon: <FaUser /> },
  { number: 2, title: "Family", icon: <FaUsers /> },
  { number: 3, title: "Education", icon: <FaGraduationCap /> },
  { number: 4, title: "Experience", icon: <FaBriefcase /> },
  { number: 5, title: "Expectations", icon: <FaBullseye /> },
  { number: 6, title: "Job", icon: <FaBriefcase /> },
];

export default function StaffApplicationForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState([]);
  const [step4Data, setStep4Data] = useState([]);
  const [step5Data, setStep5Data] = useState({});
  const [step6Data, setStep6Data] = useState({});

  // ============================================================
  // LOAD APPLICATION ON MOUNT (resume)
  // ============================================================
  useEffect(() => {
    const loadApplication = async () => {
      try {
        const res = await StaffAPI.get("/staff/application");
        if (res.data?.success && res.data.staff) {
          const s = res.data.staff;

          if (s.isSubmitted) {
            toast.info("You have already submitted your application");
            navigate("/staff/apply/dashboard");
            return;
          }

          setStep1Data(s.step1_personalInfo || {});
          setStep2Data(s.step2_familyInfo || {});
          setStep3Data(s.step3_education || []);
          setStep4Data(s.step4_experience || []);
          setStep5Data(s.step5_expectations || {});
          setStep6Data(s.step6_applyFor || {});

          const last = s.currentStep || 1;
          setCurrentStep(Math.min(Math.max(last, 1), 6));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/staff/apply/login");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    loadApplication();
  }, [navigate]);

  // ============================================================
  // GENERIC STEP SAVE
  // ============================================================
  const saveStep = async (step, body) => {
    setLoading(true);
    try {
      const res = await StaffAPI.post(`/staff/step/${step}`, body);
      if (res.data?.success) {
        toast.success(res.data.message || `Step ${step} saved`);
        return true;
      }
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || `Step ${step} failed`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleStep1Submit = async (data) => {
    const ok = await saveStep(1, data);
    if (ok) {
      setStep1Data(data);
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = async (data) => {
    const ok = await saveStep(2, data);
    if (ok) {
      setStep2Data(data);
      setCurrentStep(3);
    }
  };

  const handleStep3Submit = async (list) => {
    const ok = await saveStep(3, list);
    if (ok) {
      setStep3Data(list);
      setCurrentStep(4);
    }
  };

  const handleStep4Submit = async (list) => {
    const ok = await saveStep(4, list);
    if (ok) {
      setStep4Data(list);
      setCurrentStep(5);
    }
  };

  const handleStep5Submit = async (data) => {
    const ok = await saveStep(5, data);
    if (ok) {
      setStep5Data(data);
      setCurrentStep(6);
    }
  };

  const handleStep6Submit = async (data) => {
    const ok = await saveStep(6, data);
    if (!ok) return;
    setStep6Data(data);

    // All 6 steps are complete — submit the application for review.
    setLoading(true);
    try {
      const res = await StaffAPI.post("/staff/submit");
      if (res.data?.success) {
        toast.success(res.data.message || "Application submitted successfully!");
        setTimeout(() => navigate("/staff/apply/dashboard"), 1200);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <FaSpinner className="text-3xl text-emerald-700 animate-spin mx-auto" />
          <p className="mt-4 text-slate-500 text-sm">Loading your application...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-600 text-white"
                          : isActive
                          ? "bg-emerald-700 text-white ring-4 ring-emerald-100"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <FaCheck /> : step.icon}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold text-center hidden sm:block ${
                        isActive ? "text-emerald-700" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step.number ? "bg-emerald-600" : "bg-slate-100"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-slate-500">Step {currentStep} of 6</span>
            <span className="font-semibold text-emerald-700">
              {Math.round((currentStep / 6) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          {currentStep === 1 && (
            <Step1 initialData={step1Data} onSubmit={handleStep1Submit} loading={loading} />
          )}
          {currentStep === 2 && (
            <Step2
              initialData={step2Data}
              onSubmit={handleStep2Submit}
              onBack={() => setCurrentStep(1)}
              loading={loading}
            />
          )}
          {currentStep === 3 && (
            <Step3
              initialData={step3Data}
              onSubmit={handleStep3Submit}
              onBack={() => setCurrentStep(2)}
              loading={loading}
            />
          )}
          {currentStep === 4 && (
            <Step4
              initialData={step4Data}
              onSubmit={handleStep4Submit}
              onBack={() => setCurrentStep(3)}
              loading={loading}
            />
          )}
          {currentStep === 5 && (
            <Step5
              initialData={step5Data}
              onSubmit={handleStep5Submit}
              onBack={() => setCurrentStep(4)}
              loading={loading}
            />
          )}
          {currentStep === 6 && (
            <Step6
              initialData={step6Data}
              onSubmit={handleStep6Submit}
              onBack={() => setCurrentStep(5)}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}