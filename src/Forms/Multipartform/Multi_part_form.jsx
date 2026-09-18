import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";

import API from "../../api";
import "./MultiPartForm.css";

export default function MultiPartForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const draftId = searchParams.get("draftId");

  const [currentStep, setCurrentStep] = useState(1);

  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );

  const [loading, setLoading] = useState(false);

  // ==================================================
  // Step Data
  // ==================================================

  const [step1Data, setStep1Data] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    phoneNo: "",
    email: "",
    presentAddress: "",
    permanentAddress: "",
    religion: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    nationality: "",
    DOB: "",
    province: "",
    domicile: "",
  });

  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});
  const [step4Data, setStep4Data] = useState({});

  // ==================================================
  // Step Configuration
  // ==================================================

  const steps = [
    {
      number: 1,
      title: "Personal Information",
      shortTitle: "Personal",
      icon: "fas fa-user",
    },
    {
      number: 2,
      title: "Parents Information",
      shortTitle: "Parents",
      icon: "fas fa-users",
    },
    {
      number: 3,
      title: "Education Details",
      shortTitle: "Education",
      icon: "fas fa-graduation-cap",
    },
    {
      number: 4,
      title: "Enrollment Information",
      shortTitle: "Enrollment",
      icon: "fas fa-university",
    },
  ];

  // ==================================================
  // Load Draft
  // ==================================================

  useEffect(() => {
    const loadDraft = async () => {
      if (!draftId) {
        return;
      }

      try {
        setLoading(true);

        const response = await API.get(`/draft/${draftId}`);

        const data = response.data;

        const student =
          data?.student ||
          data?.data?.student ||
          data?.data ||
          data;

        if (!student) {
          return;
        }

        // ----------------------------------------------
        // Restore Student ID
        // ----------------------------------------------

        if (student._id || student.studentId) {
          const id = student._id || student.studentId;

          setStudentId(id);

          localStorage.setItem("studentId", id);
        }

        // ----------------------------------------------
        // Restore Step 1
        // ----------------------------------------------

        setStep1Data({
          firstName: student.firstName || "",
          lastName: student.lastName || "",
          cnic: student.cnic || "",
          phoneNo: student.phoneNo || "",
          email: student.email || "",

          presentAddress: student.presentAddress || "",

          permanentAddress:
            student.permanentAddress || "",

          religion: student.religion || "",
          gender: student.gender || "",

          bloodGroup:
            student.bloodGroup || "",

          maritalStatus:
            student.maritalStatus || "",

          nationality:
            student.nationality || "",

          DOB: student.DOB
            ? String(student.DOB).split("T")[0]
            : "",

          province: student.province || "",
          domicile: student.domicile || "",

          profileImage:
            student.profileImage || null,
        });

        // ----------------------------------------------
        // Restore Current Step
        // ----------------------------------------------

        if (student.lastStepCompleted) {
          const nextStep =
            Number(student.lastStepCompleted) + 1;

          setCurrentStep(
            nextStep > 4 ? 4 : nextStep
          );
        }
      } catch (error) {
        console.error(
          "Draft loading error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Unable to load draft."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDraft();
  }, [draftId]);

  // ==================================================
  // Submit Step
  // ==================================================

  const submitStep = async (
    stepNumber,
    data = {},
    files = {}
  ) => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();

      // ----------------------------------------------
      // Append Normal Data
      // ----------------------------------------------

      Object.keys(data).forEach((key) => {
        if (
          key === "profileImage" ||
          key === "marksheetFile" ||
          key === "marksheets"
        ) {
          return;
        }

        const value = data[key];

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          if (
            typeof value === "object" &&
            !(value instanceof File) &&
            !(value instanceof Blob)
          ) {
            formDataToSend.append(
              key,
              JSON.stringify(value)
            );
          } else {
            formDataToSend.append(
              key,
              value
            );
          }
        }
      });

      // ----------------------------------------------
      // Student ID
      // ----------------------------------------------

      const currentStudentId =
        localStorage.getItem("studentId") ||
        studentId;

      if (currentStudentId) {
        formDataToSend.append(
          "studentId",
          currentStudentId
        );
      }

      // ----------------------------------------------
      // Profile Image
      // ----------------------------------------------

      if (
        files?.profileImage instanceof File
      ) {
        formDataToSend.append(
          "profileImage",
          files.profileImage
        );
      }

      // ----------------------------------------------
      // Marksheets
      // ----------------------------------------------

      if (Array.isArray(files?.marksheets)) {
        files.marksheets.forEach(
          (file, index) => {
            if (file instanceof File) {
              formDataToSend.append(
                `marksheet_${index}`,
                file
              );
            }
          }
        );
      }

      // ==================================================
      // STEP 3 DEBUG
      // ==================================================

      if (stepNumber === 3) {
        console.log(
          "=========================================="
        );

        console.log(
          "STEP 3 - FINAL FORMDATA BEFORE REQUEST"
        );

        console.log(
          "=========================================="
        );

        for (
          const [key, value]
          of formDataToSend.entries()
        ) {
          if (value instanceof File) {
            console.log(
              `${key} => FILE`,
              {
                name: value.name,
                type: value.type,
                size: value.size,
                lastModified:
                  value.lastModified,
              }
            );
          } else {
            console.log(
              `${key} =>`,
              value
            );
          }
        }

        console.log(
          "=========================================="
        );
      }

      // ----------------------------------------------
      // API Request
      // ----------------------------------------------

      const response = await API.post(
        `/step/${stepNumber}`,
        formDataToSend
      );

      const result = response.data;

      console.log(
        `STEP ${stepNumber} API RESPONSE:`,
        result
      );

      // ----------------------------------------------
      // Save Student ID
      // ----------------------------------------------

      if (result?.studentId) {
        console.log(
          "SAVING STUDENT ID:",
          result.studentId
        );

        setStudentId(result.studentId);

        localStorage.setItem(
          "studentId",
          result.studentId
        );
      }

      // ----------------------------------------------
      // Save Draft ID
      // ----------------------------------------------

      if (result?.draftId) {
        localStorage.setItem(
          "studentDraftId",
          result.draftId
        );
      }

      return result;
    } catch (error) {
      console.error(
        `Step ${stepNumber} submit error:`,
        error
      );

      console.error(
        `Step ${stepNumber} response data:`,
        error?.response?.data
      );

      console.error(
        `Step ${stepNumber} response status:`,
        error?.response?.status
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        `Step ${stepNumber} submission failed.`;

      toast.error(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // Step 1 Submit
  // ==================================================

  const handleStep1Submit = async (
    fd,
    plainData
  ) => {
    try {
      const profileImage =
        fd.get("profileImage");

      const result = await submitStep(
        1,
        plainData,
        {
          profileImage:
            profileImage instanceof File
              ? profileImage
              : null,
        }
      );

      if (result?.success) {
        setStep1Data(plainData);

        toast.success(
          result.message ||
            "Personal information saved successfully."
        );

        setCurrentStep(2);

        if (result.studentId) {
          navigate(
            `/student/register?draftId=${result.studentId}`,
            {
              replace: true,
            }
          );
        }
      }
    } catch (error) {
      console.error(
        "Step 1 handler error:",
        error
      );
    }
  };

  // ==================================================
  // Step 2 Submit
  // ==================================================

  const handleStep2Submit = async (
    data
  ) => {
    try {
      setLoading(true);

      const currentStudentId =
        localStorage.getItem("studentId");

      console.log(
        "Step 2 studentId:",
        currentStudentId
      );

      console.log(
        "Step 2 data:",
        data
      );

      if (!currentStudentId) {
        toast.error(
          "Student ID not found. Please complete Step 1 first."
        );

        return;
      }

      const payload = {
        studentId: currentStudentId,
        fatherName: data.fatherName,
        motherName: data.motherName,
        fatherCnic: data.fatherCnic,
        fatherMobile: data.fatherMobile,
      };

      console.log(
        "STEP 2 FINAL PAYLOAD:",
        payload
      );

      const response = await API.post(
        "/step/2",
        payload
      );

      const result = response.data;

      console.log(
        "STEP 2 API RESPONSE:",
        result
      );

      if (result?.success) {
        setStep2Data(data);

        toast.success(
          result.message ||
            "Step 2 saved successfully."
        );

        setCurrentStep(3);
      }
    } catch (error) {
      console.error(
        "Step 2 handler error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Step 2 submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // Step 3 Submit
  // ==================================================

const handleStep3Submit = async (educationList) => {
  try {
    setLoading(true);

    const currentStudentId = localStorage.getItem("studentId");

    if (!currentStudentId) {
      toast.error(
        "Student ID not found. Please complete Step 1 first."
      );
      return;
    }

    const cleanEducationList = educationList.map((item) => {
      const {
        marksheetFile,
        marksheet,
        ...rest
      } = item;

      return rest;
    });

    const formData = new FormData();

    formData.append("studentId", currentStudentId);

    formData.append(
      "educationList",
      JSON.stringify(cleanEducationList)
    );

    educationList.forEach((item, index) => {
      if (item.marksheetFile instanceof File) {
        formData.append(
          `marksheet_${index}`,
          item.marksheetFile,
          item.marksheetFile.name
        );
      }
    });

    console.log("STEP 3 FORM DATA");

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          type: value.type,
          size: value.size,
        });
      } else {
        console.log(`${key}:`, value);
      }
    }

    const response = await API.post(
      "/step/3",
      formData
    );

    console.log(
      "STEP 3 RESPONSE:",
      response.data
    );

    if (response.data?.success) {
      setStep3Data(educationList);

      toast.success(
        response.data.message ||
          "Step 3 saved successfully."
      );

      setCurrentStep(4);
      return;
    }

    toast.error(
      response.data?.message ||
        "Failed to save Step 3."
    );
  } catch (error) {
    console.error(
      "STEP 3 ERROR:",
      error
    );

    console.error(
      "STEP 3 RESPONSE:",
      error?.response?.data
    );

    console.error(
      "STEP 3 STATUS:",
      error?.response?.status
    );

    toast.error(
      error?.response?.data?.message ||
        "Failed to save Step 3."
    );
  } finally {
    setLoading(false);
  }
};

  // ==================================================
  // Step 4 Submit
  // ==================================================

  const handleStep4Submit = async (
    data
  ) => {
    try {
      setLoading(true);

      const currentStudentId =
        localStorage.getItem(
          "studentId"
        ) || studentId;

      const payload = {
        studentId:
          currentStudentId,

        degreeClassId:
          data.degreeClassId,

        shiftId:
          data.shiftId,
      };

      console.log(
        "STEP 4 FINAL PAYLOAD:",
        payload
      );

      const response =
        await API.post(
          "/step/4",
          payload
        );

      const result =
        response.data;

      console.log(
        "STEP 4 API RESPONSE:",
        result
      );

      if (result?.success) {
        setStep4Data(data);

        toast.success(
          result.message ||
            "Registration completed successfully."
        );

        navigate("/std/dashboard");
      }
    } catch (error) {
      console.error(
        "Step 4 handler error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Step 4 submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <MDBContainer className="multipart-container py-4">

      {/* ==================================================
          PREMIUM PURPLE REGISTRATION STEPPER
      ================================================== */}

      <div className="registration-stepper">

        <div className="stepper-top">

          <div className="stepper-heading">

            <span className="stepper-eyebrow">
              STUDENT REGISTRATION
            </span>

            <h2 className="stepper-title">
              Complete Your Application
            </h2>

            <p className="stepper-subtitle">
              Follow the steps below to complete
              your student registration.
            </p>

          </div>

          <div className="step-counter">

            <span className="step-counter-current">
              {currentStep}
            </span>

            <span className="step-counter-divider">
              /
            </span>

            <span className="step-counter-total">
              4
            </span>

          </div>

        </div>

        <div className="stepper-wrapper">

          {steps.map(
            (step, index) => {

              const isCompleted =
                currentStep >
                step.number;

              const isActive =
                currentStep ===
                step.number;

              const isUpcoming =
                currentStep <
                step.number;

              return (
                <React.Fragment
                  key={step.number}
                >

                  <div
                    className={`
                      wizard-step
                      ${
                        isCompleted
                          ? "completed"
                          : ""
                      }
                      ${
                        isActive
                          ? "active"
                          : ""
                      }
                      ${
                        isUpcoming
                          ? "upcoming"
                          : ""
                      }
                    `}
                  >

                    <div className="wizard-step-circle">

                      {isCompleted ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i
                          className={
                            step.icon
                          }
                        ></i>
                      )}

                    </div>

                    <div className="wizard-step-content">

                      <span className="wizard-step-number">
                        STEP{" "}
                        {step.number}
                      </span>

                      <span className="wizard-step-title">
                        {step.title}
                      </span>

                      <span className="wizard-step-mobile-title">
                        {
                          step.shortTitle
                        }
                      </span>

                    </div>

                  </div>

                  {index <
                    steps.length -
                      1 && (
                    <div
                      className={`
                        wizard-connector
                        ${
                          currentStep >
                          step.number
                            ? "completed"
                            : ""
                        }
                      `}
                    >
                      <div className="wizard-connector-fill"></div>
                    </div>
                  )}

                </React.Fragment>
              );
            }
          )}

        </div>

        <div className="stepper-progress-info">

          <div className="progress-status">

            <span className="progress-status-icon">
              <i className="fas fa-circle-notch"></i>
            </span>

            <span>
              Step {currentStep} of 4
            </span>

          </div>

          <span className="progress-percentage">
            {Math.round(
              (currentStep / 4) *
                100
            )}
            % Complete
          </span>

        </div>

      </div>

      {/* ==================================================
          STEP 1
      ================================================== */}

      {currentStep === 1 && (
        <Step1
          initialData={
            step1Data
          }
          onSubmit={
            handleStep1Submit
          }
          loading={loading}
        />
      )}

      {/* ==================================================
          STEP 2
      ================================================== */}

      {currentStep === 2 && (
        <Step2
          initialData={
            step2Data
          }
          onSubmit={
            handleStep2Submit
          }
          loading={loading}
          onBack={() =>
            setCurrentStep(1)
          }
        />
      )}

      {/* ==================================================
          STEP 3
      ================================================== */}

      {currentStep === 3 && (
        <Step3
          initialData={
            step3Data
          }
          onSubmit={
            handleStep3Submit
          }
          loading={loading}
          onBack={() =>
            setCurrentStep(2)
          }
        />
      )}

      {/* ==================================================
          STEP 4
      ================================================== */}

      {currentStep === 4 && (
        <Step4
          initialData={
            step4Data
          }
          onSubmit={
            handleStep4Submit
          }
          loading={loading}
          onBack={() =>
            setCurrentStep(3)
          }
        />
      )}

    </MDBContainer>
  );
}