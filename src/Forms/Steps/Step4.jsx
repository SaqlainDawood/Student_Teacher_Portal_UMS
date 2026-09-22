
import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";

import {
  FaUniversity,
  FaBuilding,
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaSpinner,
  FaInfoCircle,
  FaBookOpen,
} from "react-icons/fa";
import "./Step4.css";
const API_ROOT = import.meta.env.VITE_API_URL || "";
const API_BASE = API_ROOT.endsWith("/api")
  ? API_ROOT
  : `${API_ROOT}/api`;

const Step4 = ({
  initialData = {},
  onBack,
  onSubmit,
}) => {
  // ============================================================
  // STATE
  // ============================================================

  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [degreeClasses, setDegreeClasses] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [loadingCampuses, setLoadingCampuses] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingShifts, setLoadingShifts] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [enrollmentInfo, setEnrollmentInfo] = useState({
    campusId: "",
    campus: "",
    departmentId: "",
    programType: "",
    degreeClassId: "",
    shiftId: "",
  });

  // ============================================================
  // GENERIC FIELD SETTER
  // ============================================================

  const setField = (name, value) => {
    setEnrollmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // RESTORE INITIAL DATA
  // Batch intentionally ignored
  // ============================================================

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const { batchId, ...rest } = initialData;

      setEnrollmentInfo((prev) => ({
        ...prev,
        ...rest,
      }));
    }
  }, [initialData]);

  // ============================================================
  // LOAD CAMPUSES
  // ============================================================

  useEffect(() => {
    const loadCampuses = async () => {
      setLoadingCampuses(true);

      try {
        const response = await fetch(
          `${API_BASE}/campuses?isActive=true`
        );

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load campuses"
          );
        }

        setCampuses(json.data || []);
      } catch (error) {
        console.error("Campus loading error:", error);
        toast.error(
          error.message || "Failed to load campuses"
        );
        setCampuses([]);
      } finally {
        setLoadingCampuses(false);
      }
    };

    loadCampuses();
  }, []);

  // ============================================================
  // LOAD DEPARTMENTS WHEN CAMPUS CHANGES
  // ============================================================

  useEffect(() => {
    if (!enrollmentInfo.campusId) {
      setDepartments([]);
      return;
    }

    const loadDepartments = async () => {
      setLoadingDepartments(true);

      try {
        const response = await fetch(
          `${API_BASE}/departments?campusId=${enrollmentInfo.campusId}`
        );

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load departments"
          );
        }

        setDepartments(json.data || []);
      } catch (error) {
        console.error("Department loading error:", error);
        toast.error(
          error.message || "Failed to load departments"
        );
        setDepartments([]);
      } finally {
        setLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, [enrollmentInfo.campusId]);

  // ============================================================
  // LOAD DEGREE CLASSES WHEN DEPARTMENT CHANGES
  // ============================================================

  useEffect(() => {
    if (!enrollmentInfo.departmentId) {
      setDegreeClasses([]);
      return;
    }

    const loadDegreeClasses = async () => {
      setLoadingClasses(true);

      try {
        const response = await fetch(
          `${API_BASE}/degree-classes?departmentId=${enrollmentInfo.departmentId}`
        );

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load degree classes"
          );
        }

        setDegreeClasses(json.data || []);
      } catch (error) {
        console.error("Degree class loading error:", error);
        toast.error(
          error.message || "Failed to load degree classes"
        );
        setDegreeClasses([]);
      } finally {
        setLoadingClasses(false);
      }
    };

    loadDegreeClasses();
  }, [enrollmentInfo.departmentId]);

  // ============================================================
  // LOAD SHIFTS WHEN DEGREE CLASS CHANGES
  // ============================================================

  useEffect(() => {
    if (!enrollmentInfo.degreeClassId) {
      setShifts([]);
      return;
    }

    const loadShifts = async () => {
      setLoadingShifts(true);

      try {
        const response = await fetch(
          `${API_BASE}/shifts?degreeClassId=${enrollmentInfo.degreeClassId}`
        );

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load shifts"
          );
        }

        const shiftList = json.data || [];

        setShifts(shiftList);

        // If no shifts are available, clear selected shift
        if (shiftList.length === 0) {
          setField("shiftId", "");

          toast.info(
            "No shift is configured for this degree class."
          );
        }
      } catch (error) {
        console.error("Shift loading error:", error);

        toast.error(
          error.message || "Failed to load shifts"
        );

        setShifts([]);
        setField("shiftId", "");
      } finally {
        setLoadingShifts(false);
      }
    };

    loadShifts();
  }, [enrollmentInfo.degreeClassId]);

  // ============================================================
  // CAMPUS CHANGE
  // ============================================================

  const handleCampusChange = (event) => {
    const campusId = event.target.value;

    const selectedCampus = campuses.find(
      (campus) => campus._id === campusId
    );

    setEnrollmentInfo({
      campusId,
      campus: selectedCampus?.name || "",
      departmentId: "",
      programType: "",
      degreeClassId: "",
      shiftId: "",
    });

    setDepartments([]);
    setDegreeClasses([]);
    setShifts([]);
  };

  // ============================================================
  // DEPARTMENT CHANGE
  // ============================================================

  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      departmentId,
      programType: "",
      degreeClassId: "",
      shiftId: "",
    }));

    setDegreeClasses([]);
    setShifts([]);
  };

  // ============================================================
  // PROGRAM TYPE CHANGE
  // ============================================================

  const handleProgramTypeChange = (event) => {
    const programType = event.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      programType,
      degreeClassId: "",
      shiftId: "",
    }));

    setShifts([]);
  };

  // ============================================================
  // DEGREE CLASS CHANGE
  // ============================================================

  const handleDegreeClassChange = (event) => {
    const degreeClassId = event.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      degreeClassId,
      shiftId: "",
    }));

    // Clear old shifts immediately
    setShifts([]);
  };

  // ============================================================
  // SHIFT CHANGE
  // ============================================================

  const handleShiftChange = (event) => {
    setField("shiftId", event.target.value);
  };

  // ============================================================
  // FILTER DEGREE CLASSES BY PROGRAM TYPE
  // ============================================================

  const filteredDegreeClasses = degreeClasses.filter(
    (degreeClass) =>
      !enrollmentInfo.programType ||
      degreeClass.programType === enrollmentInfo.programType
  );

  // ============================================================
  // SELECTED DATA
  // ============================================================

  const selectedCampus = campuses.find(
    (item) => item._id === enrollmentInfo.campusId
  );

  const selectedDepartment = departments.find(
    (item) => item._id === enrollmentInfo.departmentId
  );

  const selectedDegreeClass = degreeClasses.find(
    (item) => item._id === enrollmentInfo.degreeClassId
  );

  const selectedShift = shifts.find(
    (item) => item._id === enrollmentInfo.shiftId
  );

  // ============================================================
  // PROGRAM TYPE LABEL
  // ============================================================

  const getProgramTypeLabel = (value) => {
    return (
      {
        BS: "BS",
        ADP: "ADP",
        POST_ADP: "Post ADP",
      }[value] ||
      value ||
      "Not selected"
    );
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async () => {
    if (!enrollmentInfo.programType) {
      toast.error("Please select a program type.");
      return;
    }

    if (!enrollmentInfo.degreeClassId) {
      toast.error("Please select a degree class.");
      return;
    }

    if (!enrollmentInfo.shiftId) {
      toast.error("Please select a shift.");
      return;
    }

    const payload = {
      degreeClassId: enrollmentInfo.degreeClassId,
      shiftId: enrollmentInfo.shiftId,
    };

    try {
      setSubmitting(true);

      await onSubmit(payload);
    } catch (error) {
      console.error("Enrollment submission error:", error);

      toast.error(
        error?.message ||
          "Failed to submit enrollment information."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="step4-container">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="step4-header">
        <div className="step4-header-icon">
          <FaUniversity />
        </div>

        <div>
          <div className="step4-step-label">
            STEP 4 OF 4
          </div>

          <h2>Enrollment Information</h2>

          <p>
            Choose your campus, department, program type,
            degree class and shift to complete your registration.
          </p>
        </div>
      </div>

      {/* ======================================================
          MAIN CARD
      ====================================================== */}

      <div className="step4-card">

        <div className="step4-card-header">
          <div>
            <h3>
              <FaBookOpen />
              Academic Enrollment
            </h3>

            <p>
              Select your academic information in the correct order.
            </p>
          </div>
        </div>

        <div className="step4-card-body">

          {/* ==================================================
              CAMPUS
          ================================================== */}

          <MDBRow className="g-4">

            <MDBCol md="6">

              <div className="step4-field">

                <label>
                  <FaUniversity />
                  Campus
                </label>

                <select
                  className="form-select"
                  value={enrollmentInfo.campusId}
                  onChange={handleCampusChange}
                  disabled={
                    loadingCampuses || submitting
                  }
                >
                  <option value="">
                    {loadingCampuses
                      ? "Loading campuses..."
                      : "Select Campus"}
                  </option>

                  {campuses.map((campus) => (
                    <option
                      key={campus._id}
                      value={campus._id}
                    >
                      {campus.name}
                      {campus.code
                        ? ` — ${campus.code}`
                        : ""}
                    </option>
                  ))}
                </select>

              </div>

            </MDBCol>

            {/* ==================================================
                DEPARTMENT
            ================================================== */}

            <MDBCol md="6">

              <div className="step4-field">

                <label>
                  <FaBuilding />
                  Department
                </label>

                <select
                  className="form-select"
                  value={enrollmentInfo.departmentId}
                  onChange={handleDepartmentChange}
                  disabled={
                    !enrollmentInfo.campusId ||
                    loadingDepartments ||
                    submitting
                  }
                >
                  <option value="">
                    {!enrollmentInfo.campusId
                      ? "Select Campus First"
                      : loadingDepartments
                      ? "Loading departments..."
                      : "Select Department"}
                  </option>

                  {departments.map((department) => (
                    <option
                      key={department._id}
                      value={department._id}
                    >
                      {department.name}
                      {department.code
                        ? ` — ${department.code}`
                        : ""}
                    </option>
                  ))}
                </select>

              </div>

            </MDBCol>

            {/* ==================================================
                PROGRAM TYPE
            ================================================== */}

            <MDBCol md="6">

              <div className="step4-field">

                <label>
                  <FaGraduationCap />
                  Program Type
                </label>

                <select
                  className="form-select"
                  value={enrollmentInfo.programType}
                  onChange={handleProgramTypeChange}
                  disabled={
                    !enrollmentInfo.departmentId ||
                    submitting
                  }
                >
                  <option value="">
                    {!enrollmentInfo.departmentId
                      ? "Select Department First"
                      : "Select Program Type"}
                  </option>

                  <option value="BS">
                    BS
                  </option>

                  <option value="ADP">
                    ADP
                  </option>

                  <option value="POST_ADP">
                    Post ADP
                  </option>
                </select>

              </div>

            </MDBCol>

            {/* ==================================================
                DEGREE CLASS
            ================================================== */}

            <MDBCol md="6">

              <div className="step4-field">

                <label>
                  <FaGraduationCap />
                  Degree Class
                </label>

                <select
                  className="form-select"
                  value={enrollmentInfo.degreeClassId}
                  onChange={handleDegreeClassChange}
                  disabled={
                    !enrollmentInfo.programType ||
                    loadingClasses ||
                    submitting
                  }
                >
                  <option value="">
                    {!enrollmentInfo.programType
                      ? "Select Program Type First"
                      : loadingClasses
                      ? "Loading degree classes..."
                      : filteredDegreeClasses.length === 0
                      ? "No degree classes available"
                      : "Select Degree Class"}
                  </option>

                  {filteredDegreeClasses.map(
                    (degreeClass) => (
                      <option
                        key={degreeClass._id}
                        value={degreeClass._id}
                      >
                        {degreeClass.name}
                        {degreeClass.code
                          ? ` — ${degreeClass.code}`
                          : ""}
                      </option>
                    )
                  )}
                </select>

              </div>

            </MDBCol>

            {/* ==================================================
                SHIFT
            ================================================== */}

            <MDBCol md="6">

              <div className="step4-field">

                <label>
                  <FaClock />
                  Shift
                </label>

                <select
                  className="form-select"
                  value={enrollmentInfo.shiftId}
                  onChange={handleShiftChange}
                  disabled={
                    !enrollmentInfo.degreeClassId ||
                    loadingShifts ||
                    submitting
                  }
                >
                  <option value="">
                    {!enrollmentInfo.degreeClassId
                      ? "Select Degree Class First"
                      : loadingShifts
                      ? "Loading shifts..."
                      : shifts.length === 0
                      ? "No shifts available"
                      : "Select Shift"}
                  </option>

                  {shifts.map((shift) => (
                    <option
                      key={shift._id}
                      value={shift._id}
                    >
                      {shift.name}
                    </option>
                  ))}
                </select>

                {loadingShifts && (
                  <small className="text-muted mt-2 d-block">
                    <FaSpinner className="fa-spin me-1" />
                    Loading shifts for this degree class...
                  </small>
                )}

                {!loadingShifts &&
                  enrollmentInfo.degreeClassId &&
                  shifts.length > 0 && (
                    <small className="text-muted mt-2 d-block">
                      <FaInfoCircle className="me-1" />
                      Only shifts associated with this degree
                      class are shown.
                    </small>
                  )}

              </div>

            </MDBCol>

          </MDBRow>

          {/* ==================================================
              SELECTED SHIFT INFO
          ================================================== */}

          {selectedShift && (
            <div className="step4-success-box mt-4">

              <FaCheckCircle />

              <div>
                <strong>
                  Shift Selected
                </strong>

                <p className="mb-0">
                  You selected the{" "}
                  <strong>{selectedShift.name}</strong>{" "}
                  shift for{" "}
                  <strong>
                    {selectedDegreeClass?.name || "your degree class"}
                  </strong>
                  .
                </p>
              </div>

            </div>
          )}

          {/* ==================================================
              ENROLLMENT SUMMARY
          ================================================== */}

          <div className="step4-summary mt-4">

            <div className="step4-summary-header">
              <h4>
                Enrollment Summary
              </h4>

              <span>
                Review your selections
              </span>
            </div>

            <MDBRow className="g-3">

              <MDBCol md="6">
                <div className="step4-summary-item">
                  <span>Campus</span>
                  <strong>
                    {selectedCampus?.name ||
                      enrollmentInfo.campus ||
                      "Not selected"}
                  </strong>
                </div>
              </MDBCol>

              <MDBCol md="6">
                <div className="step4-summary-item">
                  <span>Department</span>
                  <strong>
                    {selectedDepartment?.name ||
                      "Not selected"}
                  </strong>
                </div>
              </MDBCol>

              <MDBCol md="6">
                <div className="step4-summary-item">
                  <span>Program Type</span>
                  <strong>
                    {getProgramTypeLabel(
                      enrollmentInfo.programType
                    )}
                  </strong>
                </div>
              </MDBCol>

              <MDBCol md="6">
                <div className="step4-summary-item">
                  <span>Degree Class</span>
                  <strong>
                    {selectedDegreeClass?.name ||
                      "Not selected"}
                  </strong>
                </div>
              </MDBCol>

              <MDBCol md="6">
                <div className="step4-summary-item">
                  <span>Shift</span>
                  <strong>
                    {selectedShift?.name ||
                      "Not selected"}
                  </strong>
                </div>
              </MDBCol>

            </MDBRow>

          </div>

          {/* ==================================================
              INFORMATION NOTICE
          ================================================== */}

          <div className="step4-info-box mt-4">

            <FaInfoCircle />

            <div>
              <strong>
                Registration Information
              </strong>

              <p className="mb-0">
                Your selected degree class and shift will be
                associated with your registration. The available
                shifts are loaded specifically for the selected
                degree class.
              </p>
            </div>

          </div>

        </div>

        {/* ====================================================
            FOOTER BUTTONS
        ==================================================== */}

        <div className="step4-card-footer">

          <MDBBtn
            color="light"
            className="step4-back-btn"
            onClick={onBack}
            disabled={submitting}
          >
            <FaArrowLeft className="me-2" />
            Back
          </MDBBtn>

          <MDBBtn
            color="primary"
            className="step4-submit-btn"
            onClick={handleSubmit}
            disabled={
              submitting ||
              loadingCampuses ||
              loadingDepartments ||
              loadingClasses ||
              loadingShifts ||
              !enrollmentInfo.programType ||
              !enrollmentInfo.degreeClassId ||
              !enrollmentInfo.shiftId
            }
          >
            {submitting ? (
              <>
                <FaSpinner className="fa-spin me-2" />
                Submitting...
              </>
            ) : (
              <>
                Complete Registration
                <FaArrowRight className="ms-2" />
              </>
            )}
          </MDBBtn>

        </div>

      </div>

    </div>
  );
};

export default Step4;
