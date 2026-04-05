import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MultiPartForm.css";

const MultiPartForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null,
  });

  // Load data on reload
  useEffect(() => {
    const saved = localStorage.getItem("registrationFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setStudentId(parsed.studentId || null);
      setStep(parsed.step || 1);
    }
  }, []);

  // Save everything including step
  useEffect(() => {
    localStorage.setItem(
      "registrationFormData",
      JSON.stringify({
        ...formData,
        studentId,
        step,
      })
    );
  }, [formData, studentId, step]);

  const next = () => setStep((prev) => prev + 1);
  const previous = () => setStep((prev) => prev - 1);

  // Step handlers (API logic preserved)
  const handleStep1Submit = async (fd, plainData) => {
    try {
      setLoading(true);
      if (studentId) fd.append("studentId", studentId);
      const res = await API.post("/step1", fd);
      if (res.data.success) {
        setStudentId(res.data.studentId);
        setFormData((prev) => ({ ...prev, step1Data: plainData }));
        next();
      }
    } catch (err) {
      toast.error("Step1 Error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (data) => {
    try {
      setLoading(true);
      await API.post(`/step2/${studentId}`, data);
      setFormData((prev) => ({ ...prev, step2Data: data }));
      next();
    } catch {
      toast.error("Step2 Error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async (educationList) => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("educationList", JSON.stringify(educationList));
      educationList.forEach((edu, index) => {
        if (edu.marksheetFile) {
          fd.append(`marksheet_${index}`, edu.marksheetFile);
        }
      });
      await API.post(`/step3/${studentId}`, fd);
      setFormData((prev) => ({ ...prev, step3Data: educationList }));
      next();
    } catch {
      toast.error("Step3 Error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep4Submit = async (data) => {
    try {
      setLoading(true);
      if (!data.program || !data.department) {
        toast.error("Complete Step 4");
        return;
      }
      const res = await API.post(`/step4/${studentId}`, data);
      if (res.data.success) {
        localStorage.removeItem("registrationFormData");
        toast.success("Registration Completed Successfully!");
        setTimeout(() => navigate("/student/enroll"), 2000);
      }
    } catch {
      toast.error("Step4 Error");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Details", icon: "fas fa-user-graduate" },
    { number: 2, title: "Family Details", icon: "fas fa-users" },
    { number: 3, title: "Academic Details", icon: "fas fa-graduation-cap" },
    { number: 4, title: "Enrollment", icon: "fas fa-check-double" },
  ];

  return (
    <div className="registration-wrapper">
      <div className="luxury-container">
        <div className="glass-card">
          <div className="multiform-form-header">
            <h2> <i className="fas fa-user-edit"></i> Student Registration Portal</h2>
            <i className="fas fa-arrow-right"></i><p>Begin your journey with excellence</p>
          </div>

          <div className="steps-container">
            <div className="step-progress">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`step-item ${step >= s.number ? "active" : ""} ${
                    step === s.number ? "current" : ""
                  }`}
                >
                  <div className="step-circle">
                    {step > s.number ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      s.number
                    )}
                  </div>
                  <div className="step-label">
                    <i className={s.icon}></i>
                    <span>{s.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-content">
            {step === 1 && (
              <Step1
                onSubmit={handleStep1Submit}
                loading={loading}
                initialData={formData.step1Data}
              />
            )}
            {step === 2 && (
              <Step2
                onSubmit={handleStep2Submit}
                onBack={previous}
                initialData={formData.step2Data}
              />
            )}
            {step === 3 && (
              <Step3
                onSubmit={handleStep3Submit}
                onBack={previous}
                initialData={formData.step3Data}
              />
            )}
            {step === 4 && (
              <Step4
                onSubmit={handleStep4Submit}
                onBack={previous}
                initialData={formData.step4Data}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPartForm;