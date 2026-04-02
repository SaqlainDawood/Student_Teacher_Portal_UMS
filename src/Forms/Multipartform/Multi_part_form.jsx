import React, { useState , useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";
import API from "../../api";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const MultiPartForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Store all form data in parent state
  const [formData, setFormData] = useState({
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null
  });
  useEffect(() => {
  // Load saved data from localStorage
  const savedData = localStorage.getItem('registrationFormData');
  if (savedData) {
    const parsed = JSON.parse(savedData);
    setFormData(parsed);
    if (parsed.step1Data) setStudentId(parsed.studentId);
  }
}, []);
useEffect(() => {
  localStorage.setItem('registrationFormData', JSON.stringify({
    ...formData,
    studentId
  }));
}, [formData, studentId]);

  const next = () => setStep((nxt) => nxt + 1);
  const previous = () => setStep((prev) => prev - 1);

  const handleStep1Submit = async (formData) => {
    try {
      setLoading(true);
      const res = await API.post('/step1', formData, {
        withCredentials: true
      });
      if (res.data.success) {
        setStudentId(res.data.studentId);
        // Store step1 data
        setFormData(prev => ({ ...prev, step1Data: formData }));
        next();
      } else {
        toast.error('Error: ' + res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Server error on Step1");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (data) => {
    try {
      setLoading(true);
      await API.post(`/step2/${studentId}`, data);
      // Store step2 data
      setFormData(prev => ({ ...prev, step2Data: data }));
      next();
    } catch (err) {
      console.error(err);
      toast.error('Server error on Step2');
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async (educationList) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("educationList", JSON.stringify(educationList));

      educationList.forEach((edu, index) => {
        if (edu.marksheetFile) {
          formData.append(`marksheet_${index}`, edu.marksheetFile);
        }
      });

      await API.post(`/step3/${studentId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      // Store step3 data
      setFormData(prev => ({ ...prev, step3Data: educationList }));
      
      toast.success("Education details submitted successfully");
      next();
    } catch (err) {
      console.error("Step3 Error:", err);
      toast.error("Server error on Step3");
    } finally {
      setLoading(false);
    }
  };

  const handleStep4Submit = async (data) => {
    try {
      setLoading(true);
      const res = await API.post(`/step4/${studentId}`, data);
      if (res.data.success) {
        // Store step4 data
        localStorage.removeItem('registrationFormData');
        toast.success('Student enrollment completed!');
        setTimeout(() => {
          navigate("/student/enroll");
        }, 2500);
      } else {
        alert('Error on final step');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error on Step4');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="py-5">
      <header className="mb-4">
        <h2 className="text-center text-dark">Registration Form</h2>
      </header>
      
      {/* Progress Bar */}
      <MDBRow className="mb-5 step-progress">
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <h6>Personal Details</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <h6>Family Details</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <h6>Academic Info</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
            <span className="step-number">4</span>
            <h6>Enrollment</h6>
          </div>
        </MDBCol>
      </MDBRow>
      
      <div>
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
    </MDBContainer>
  );
};

export default MultiPartForm;