import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";

import API from "../../services/api";
import {
  FaUser,
  FaUsers,
  FaGraduationCap,
  FaUniversity,
  FaCheck,
} from "react-icons/fa";

const STEPS = [
  { number: 1, title: "Personal Info", icon: <FaUser /> },
  { number: 2, title: "Family Info", icon: <FaUsers /> },
  { number: 3, title: "Education", icon: <FaGraduationCap /> },
  { number: 4, title: "Enrollment", icon: <FaUniversity /> },
];

export default function MultiPartForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Step data cache
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState([]);
  const [step4Data, setStep4Data] = useState({});

  // ============================================================
  // LOAD PROFILE ON MOUNT (resume)
  // ============================================================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/students/steps/profile");
        if (res.data?.success && res.data.student) {
          const s = res.data.student;

          // Restore step data
          setStep1Data(s.personalInfo || {});
          setStep2Data(s.familyInfo || {});
          setStep3Data(s.education || []);

          if (res.data.applications?.length > 0) {
            const app = res.data.applications[0];
            setStep4Data({
              degreeClassId: app.degreeClassId?._id || app.degreeClassId,
              shiftId: app.shiftId?._id || app.shiftId,
            });
          }

          // Set current step
          const last = s.lastStepCompleted || 0;
          if (last < 4) {
            setCurrentStep(Math.min(last + 1, 4));
          } else {
            setCurrentStep(4);
          }
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/students/auth/login");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  // ============================================================
  // SUBMIT STEP 1
  // ============================================================
  const handleStep1Submit = async (fd, cleanData) => {
    try {
      setLoading(true);

      // Append data to FormData
      Object.entries(cleanData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          fd.append(key, value);
        }
      });

      const res = await API.post("/students/steps/step/1", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Step 1 saved");
        setStep1Data(cleanData);
        setCurrentStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Step 1 failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUBMIT STEP 2
  // ============================================================
  const handleStep2Submit = async (data) => {
    try {
      setLoading(true);
      const res = await API.post("/students/steps/step/2", data);
      if (res.data?.success) {
        toast.success(res.data.message || "Step 2 saved");
        setStep2Data(data);
        setCurrentStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Step 2 failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUBMIT STEP 3 (with marksheets)
  // ============================================================
  const handleStep3Submit = async (educationList) => {
    try {
      setLoading(true);

      const formData = new FormData();
      const cleanList = educationList.map((item) => {
        const { marksheetFile, marksheet, ...rest } = item;
        return rest;
      });

      formData.append("educationList", JSON.stringify(cleanList));

      educationList.forEach((item, index) => {
        if (item.marksheetFile instanceof File) {
          formData.append(`marksheet_${index}`, item.marksheetFile);
        }
      });

      const res = await API.post("/students/steps/step/3", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Step 3 saved");
        setStep3Data(educationList);
        setCurrentStep(4);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Step 3 failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUBMIT STEP 4 (Apply)
  // ============================================================
  const handleStep4Submit = async (data) => {
    try {
      setLoading(true);
     const res = await API.post("/students/steps/step/4", {
        degreeClassId: data.degreeClassId,
        shiftId: data.shiftId,
      });

      if (res.data?.success) {
        toast.success(
          res.data.message || "Application submitted successfully!"
        );
        setStep4Data(data);
        setTimeout(() => navigate("/student/dashboard"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Step 4 failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading your application...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ================================================== */}
        {/* STEPPER */}
        {/* ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <React.Fragment key={step.number}>
                  {/* Step Circle */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <FaCheck /> : step.icon}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold text-center ${
                        isActive ? "text-indigo-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Connector */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Progress Info */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Step {currentStep} of 4
            </span>
            <span className="font-semibold text-indigo-600">
              {Math.round((currentStep / 4) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* ================================================== */}
        {/* STEP CONTENT */}
        {/* ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {currentStep === 1 && (
            <Step1
              initialData={step1Data}
              onSubmit={handleStep1Submit}
              loading={loading}
            />
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
        </div>
      </div>
    </div>
  );
}