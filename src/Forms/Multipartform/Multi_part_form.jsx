import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";
import API from "../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./MultiPartForm.css";

const MultiPartForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId");

  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumingDraft, setResumingDraft] = useState(false);

  const [formData, setFormData] = useState({
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null,
  });

  // Load draft if ID exists in URL
  useEffect(() => {
    const loadDraft = async () => {
      if (draftId) {
        setResumingDraft(true);
        try {
          const response = await API.get(`/student/draft/${draftId}`);
          if (response.data.success) {
            const student = response.data.student;
            setStudentId(draftId);
            setStep(response.data.lastStepCompleted + 1);
            
            // Populate form data from draft
            setFormData({
              step1Data: {
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.user?.email,
                cnic: student.cnic,
                phoneNo: student.phoneNo,
                presentAddress: student.presentAddress,
                permanentAddress: student.permanentAddress,
                province: student.province,
                domicile: student.domicile,
                religion: student.religion,
                gender: student.gender,
                bloodGroup: student.bloodGroup,
                maritalStatus: student.maritalStatus,
                nationality: student.nationality,
                DOB: student.DOB?.split('T')[0],
              },
              step2Data: student.family,
              step3Data: student.academic?.educationList || [],
              step4Data: student.enrollment,
            });
            
            toast.info(`Resuming registration from step ${response.data.lastStepCompleted + 1}`);
          }
        } catch (error) {
          console.error("Error loading draft:", error);
          toast.error("Could not load draft. Starting fresh.");
        } finally {
          setResumingDraft(false);
        }
      }
    };
    
    loadDraft();
  }, [draftId]);

  // Save progress to localStorage
  useEffect(() => {
    if (studentId && !resumingDraft) {
      localStorage.setItem(
        "registrationFormData",
        JSON.stringify({
          ...formData,
          studentId,
          step,
        })
      );
    }
  }, [formData, studentId, step, resumingDraft]);

  const next = () => setStep((prev) => prev + 1);
  const previous = () => setStep((prev) => prev - 1);

  // Atomic step submission (using new API)
  const submitStep = async (stepNumber, data, files = null) => {
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      
      // Add all data fields
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
            formDataToSend.append(key, JSON.stringify(data[key]));
          } else {
            formDataToSend.append(key, data[key]);
          }
        }
      });
      
      // Add student ID if exists
      if (studentId) {
        formDataToSend.append("studentId", studentId);
      }
      
      // Add files if any
      if (files) {
        if (files.profileImage) {
          formDataToSend.append("profileImage", files.profileImage);
        }
        if (files.marksheets) {
          files.marksheets.forEach((file, index) => {
            formDataToSend.append(`marksheet_${index}`, file);
          });
        }
      }
      
      const response = await API.post(`/student/step/${stepNumber}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.data.success) {
        if (!studentId) {
          setStudentId(response.data.studentId);
        }
        
        // Store draft ID in URL for easy resume
        if (!draftId && response.data.studentId) {
          navigate(`?draftId=${response.data.studentId}`, { replace: true });
        }
        
        return { success: true, studentId: response.data.studentId };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(`Step ${stepNumber} error:`, error);
      toast.error(error.response?.data?.message || `Error saving step ${stepNumber}`);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleStep1Submit = async (fd, plainData) => {
    const profileImage = fd.get("profileImage");
    const result = await submitStep(1, plainData, { profileImage });
    
    if (result.success) {
      setFormData((prev) => ({ ...prev, step1Data: plainData }));
      next();
    }
  };

  const handleStep2Submit = async (data) => {
    const result = await submitStep(2, data);
    
    if (result.success) {
      setFormData((prev) => ({ ...prev, step2Data: data }));
      next();
    }
  };

  const handleStep3Submit = async (educationList) => {
    // Prepare marksheets for upload
    const marksheets = educationList
      .filter(edu => edu.marksheetFile)
      .map(edu => edu.marksheetFile);
    
    // Remove File objects from education list before sending
    const cleanEducationList = educationList.map(edu => {
      const { marksheetFile, ...cleanEdu } = edu;
      return cleanEdu;
    });
    
    const result = await submitStep(3, 
      { educationList: cleanEducationList },
      { marksheets }
    );
    
    if (result.success) {
      setFormData((prev) => ({ ...prev, step3Data: educationList }));
      next();
    }
  };

  const handleStep4Submit = async (data) => {
    if (!data.program || !data.department) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const result = await submitStep(4, data);
    
    if (result.success) {
      localStorage.removeItem("registrationFormData");
      toast.success("Registration Completed Successfully!");
      setTimeout(() => navigate("/student/enroll"), 2000);
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
            <h2>
              <i className="fas fa-user-edit"></i> Student Registration Portal
            </h2>
            <p>Begin your journey with excellence</p>
          </div>

          {resumingDraft && (
            <div className="alert alert-info">
              <i className="fas fa-sync-alt"></i> Loading your saved draft...
            </div>
          )}

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
          
          {draftId && step < 4 && (
            <div className="draft-info">
              <i className="fas fa-save"></i>
              <span>Your progress is automatically saved. Use this link to resume: </span>
              <code>{window.location.href}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiPartForm;
// import React, { useState, useEffect } from "react";
// import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
// import Step1 from "../Steps/Step1";
// import Step2 from "../Steps/Step2";
// import Step3 from "../Steps/Step3";
// import Step4 from "../Steps/Step4";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./MultiPartForm.css";

// const MultiPartForm = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [studentId, setStudentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     step1Data: null,
//     step2Data: null,
//     step3Data: null,
//     step4Data: null,
//   });

//   // Load data on reload
//   useEffect(() => {
//     const saved = localStorage.getItem("registrationFormData");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setFormData(parsed);
//       setStudentId(parsed.studentId || null);
//       setStep(parsed.step || 1);
//     }
//   }, []);

//   // Save everything including step
//   useEffect(() => {
//     localStorage.setItem(
//       "registrationFormData",
//       JSON.stringify({
//         ...formData,
//         studentId,
//         step,
//       })
//     );
//   }, [formData, studentId, step]);

//   const next = () => setStep((prev) => prev + 1);
//   const previous = () => setStep((prev) => prev - 1);

//   // Step handlers (API logic preserved)
//   const handleStep1Submit = async (fd, plainData) => {
//     try {
//       setLoading(true);
//       if (studentId) fd.append("studentId", studentId);
//       const res = await API.post("/step1", fd);
//       if (res.data.success) {
//         setStudentId(res.data.studentId);
//         setFormData((prev) => ({ ...prev, step1Data: plainData }));
//         next();
//       }
//     } catch (err) {
//       toast.error("Step1 Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStep2Submit = async (data) => {
//     try {
//       setLoading(true);
//       await API.post(`/step2/${studentId}`, data);
//       setFormData((prev) => ({ ...prev, step2Data: data }));
//       next();
//     } catch {
//       toast.error("Step2 Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStep3Submit = async (educationList) => {
//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("educationList", JSON.stringify(educationList));
//       educationList.forEach((edu, index) => {
//         if (edu.marksheetFile) {
//           fd.append(`marksheet_${index}`, edu.marksheetFile);
//         }
//       });
//       await API.post(`/step3/${studentId}`, fd);
//       setFormData((prev) => ({ ...prev, step3Data: educationList }));
//       next();
//     } catch {
//       toast.error("Step3 Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStep4Submit = async (data) => {
//     try {
//       setLoading(true);
//       if (!data.program || !data.department) {
//         toast.error("Complete Step 4");
//         return;
//       }
//       const res = await API.post(`/step4/${studentId}`, data);
//       if (res.data.success) {
//         localStorage.removeItem("registrationFormData");
//         toast.success("Registration Completed Successfully!");
//         setTimeout(() => navigate("/student/enroll"), 2000);
//       }
//     } catch {
//       toast.error("Step4 Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const steps = [
//     { number: 1, title: "Personal Details", icon: "fas fa-user-graduate" },
//     { number: 2, title: "Family Details", icon: "fas fa-users" },
//     { number: 3, title: "Academic Details", icon: "fas fa-graduation-cap" },
//     { number: 4, title: "Enrollment", icon: "fas fa-check-double" },
//   ];

//   return (
//     <div className="registration-wrapper">
//       <div className="luxury-container">
//         <div className="glass-card">
//           <div className="multiform-form-header">
//             <h2> <i className="fas fa-user-edit"></i> Student Registration Portal</h2>
//             <i className="fas fa-arrow-right"></i><p>Begin your journey with excellence</p>
//           </div>

//           <div className="steps-container">
//             <div className="step-progress">
//               {steps.map((s) => (
//                 <div
//                   key={s.number}
//                   className={`step-item ${step >= s.number ? "active" : ""} ${
//                     step === s.number ? "current" : ""
//                   }`}
//                 >
//                   <div className="step-circle">
//                     {step > s.number ? (
//                       <i className="fas fa-check"></i>
//                     ) : (
//                       s.number
//                     )}
//                   </div>
//                   <div className="step-label">
//                     <i className={s.icon}></i>
//                     <span>{s.title}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="form-content">
//             {step === 1 && (
//               <Step1
//                 onSubmit={handleStep1Submit}
//                 loading={loading}
//                 initialData={formData.step1Data}
//               />
//             )}
//             {step === 2 && (
//               <Step2
//                 onSubmit={handleStep2Submit}
//                 onBack={previous}
//                 initialData={formData.step2Data}
//               />
//             )}
//             {step === 3 && (
//               <Step3
//                 onSubmit={handleStep3Submit}
//                 onBack={previous}
//                 initialData={formData.step3Data}
//               />
//             )}
//             {step === 4 && (
//               <Step4
//                 onSubmit={handleStep4Submit}
//                 onBack={previous}
//                 initialData={formData.step4Data}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiPartForm;

