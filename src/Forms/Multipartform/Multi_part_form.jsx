import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import API from "../../services/api";

export default function MultiPartForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const draftId = searchParams.get("draftId");

  const [currentStep, setCurrentStep] = useState(1);
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );

  const [loading, setLoading] = useState(false);

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
  // Load Draft
  // ==================================================
  useEffect(() => {
    const loadDraft = async () => {
      if (!draftId) {
        return;
      }

      try {
        setLoading(true);

        const response = await API.get(
          `/draft/${draftId}`
        );

        const data = response.data;

        const student =
          data?.student ||
          data?.data?.student ||
          data?.data ||
          data;

        if (!student) {
          return;
        }

        if (student._id || student.studentId) {
          const id =
            student._id || student.studentId;

          setStudentId(id);
          localStorage.setItem(
            "studentId",
            id
          );
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
          presentAddress:
            student.presentAddress || "",
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
        // Restore current step
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
      // Append normal data
      // ----------------------------------------------
      Object.keys(data).forEach((key) => {
        // VERY IMPORTANT:
        // File fields must NOT be appended here.
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
      if (studentId) {
        formDataToSend.append(
          "studentId",
          studentId
        );
      }

      // ----------------------------------------------
      // Profile Image
      // Append EXACTLY ONCE
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
        files.marksheets.forEach((file) => {
          if (file instanceof File) {
            formDataToSend.append(
              "marksheets",
              file
            );
          }
        });
      }

      // ----------------------------------------------
      // API Request
      // IMPORTANT:
      // Do NOT manually set Content-Type.
      // Axios/browser automatically creates the
      // multipart boundary.
      // ----------------------------------------------
      const response = await API.post(
        `/step/${stepNumber}`,
        formDataToSend
      );

      const result = response.data;

      // ----------------------------------------------
      // Save student ID
      // ----------------------------------------------
      if (result?.studentId) {
        setStudentId(result.studentId);

        localStorage.setItem(
          "studentId",
          result.studentId
        );
      }

      // ----------------------------------------------
      // Save draft ID if backend returns it
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

        // Update URL with student ID
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
      const result = await submitStep(
        2,
        data,
        {}
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
    }
  };

  // ==================================================
  // Step 3 Submit
  // ==================================================
  const handleStep3Submit = async (
    data,
    files = []
  ) => {
    try {
      const cleanData = {
        ...data,
      };

      // Do not send file objects as JSON
      if (
        Array.isArray(cleanData.educationList)
      ) {
        cleanData.educationList =
          cleanData.educationList.map(
            (item) => {
              const {
                marksheetFile,
                ...rest
              } = item;

              return rest;
            }
          );
      }

      const result = await submitStep(
        3,
        cleanData,
        {
          marksheets: files,
        }
      );

      if (result?.success) {
        setStep3Data(cleanData);

        toast.success(
          result.message ||
            "Step 3 saved successfully."
        );

        setCurrentStep(4);
      }

    } catch (error) {
      console.error(
        "Step 3 handler error:",
        error
      );
    }
  };

  // ==================================================
  // Step 4 Submit
  // ==================================================
  const handleStep4Submit = async (
    data
  ) => {
    try {
      const result = await submitStep(
        4,
        data,
        {}
      );

      if (result?.success) {
        setStep4Data(data);

        toast.success(
          result.message ||
            "Registration completed successfully."
        );

        if (result.studentId) {
          localStorage.setItem(
            "studentId",
            result.studentId
          );
        }

        navigate("/student/login");
      }

    } catch (error) {
      console.error(
        "Step 4 handler error:",
        error
      );
    }
  };

  // ==================================================
  // Progress
  // ==================================================
  const progress =
    (currentStep / 4) * 100;

  return (
    <MDBContainer className="py-4">

      {/* ============================================
          Progress
      ============================================ */}
      <div className="mb-4">

        <div className="d-flex justify-content-between mb-2">
          <span className="fw-semibold">
            Step {currentStep} of 4
          </span>

          <span className="text-muted">
            {Math.round(progress)}%
          </span>
        </div>

        <MDBProgress height="8">
          <MDBProgressBar
            width={progress}
            valuemin={0}
            valuemax={100}
          />
        </MDBProgress>

      </div>

      {/* ============================================
          Steps
      ============================================ */}

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
          loading={loading}
          onBack={() =>
            setCurrentStep(1)
          }
        />
      )}

      {currentStep === 3 && (
        <Step3
          initialData={step3Data}
          onSubmit={handleStep3Submit}
          loading={loading}
          onBack={() =>
            setCurrentStep(2)
          }
        />
      )}

      {currentStep === 4 && (
        <Step4
          initialData={step4Data}
          onSubmit={handleStep4Submit}
          loading={loading}
          onBack={() =>
            setCurrentStep(3)
          }
        />
      )}

    </MDBContainer>
  );
}