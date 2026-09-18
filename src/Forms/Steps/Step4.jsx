import React, { useEffect, useState, useCallback } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import {
  FaUniversity,
  FaBuilding,
  FaGraduationCap,
  FaLayerGroup,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaSpinner,
  FaInfoCircle,
  FaBookOpen,
} from "react-icons/fa";
import "./Step4.css";

// ==================================================
// VITE API BASE
// ==================================================
const API_ROOT = import.meta.env.VITE_API_URL || "";

const API_BASE = API_ROOT.endsWith("/api")
  ? API_ROOT
  : `${API_ROOT}/api`;

// ==================================================
// STEP 4
// ==================================================
const Step4 = ({ onSubmit, onBack, initialData, loading }) => {
  // ==================================================
  // Dropdown Data
  // ==================================================
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [degreeClasses, setDegreeClasses] = useState([]);
  const [batches, setBatches] = useState([]);

  // ==================================================
  // Loading States
  // ==================================================
  const [loadingCampuses, setLoadingCampuses] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ==================================================
  // Enrollment State
  // ==================================================
  const [enrollmentInfo, setEnrollmentInfo] = useState({
    campusId: "",
    campus: "",
    departmentId: "",
    programType: "",
    degreeClassId: "",
    batchId: "",
    shiftId: "",
  });

  // ==================================================
  // Generic Field Setter
  // ==================================================
  const setField = (name, value) => {
    setEnrollmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==================================================
  // Restore Initial Data
  // ==================================================
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setEnrollmentInfo((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  // ==================================================
  // Load Campuses
  // ==================================================
  useEffect(() => {
    const loadCampuses = async () => {
      setLoadingCampuses(true);

      try {
        const res = await fetch(
          `${API_BASE}/campuses?isActive=true`
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load campuses"
          );
        }

        setCampuses(json.data || []);
      } catch (error) {
        console.error("Campus loading error:", error);

        toast.error(
          error.message || "Could not load campuses"
        );
      } finally {
        setLoadingCampuses(false);
      }
    };

    loadCampuses();
  }, []);

  // ==================================================
  // Campus -> Departments
  // ==================================================
  useEffect(() => {
    if (!enrollmentInfo.campusId) {
      setDepartments([]);
      return;
    }

    const loadDepartments = async () => {
      setLoadingDepartments(true);

      try {
        const res = await fetch(
          `${API_BASE}/departments?campusId=${enrollmentInfo.campusId}`
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load departments"
          );
        }

        setDepartments(json.data || []);
      } catch (error) {
        console.error(
          "Department loading error:",
          error
        );

        toast.error(
          error.message || "Could not load departments"
        );
      } finally {
        setLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, [enrollmentInfo.campusId]);

  // ==================================================
  // Department -> Degree Classes
  // ==================================================
  useEffect(() => {
    if (!enrollmentInfo.departmentId) {
      setDegreeClasses([]);
      return;
    }

    const loadDegreeClasses = async () => {
      setLoadingClasses(true);

      try {
        const res = await fetch(
          `${API_BASE}/degree-classes?departmentId=${enrollmentInfo.departmentId}`
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(
            json.message || "Failed to load degree classes"
          );
        }

        setDegreeClasses(json.data || []);
      } catch (error) {
        console.error(
          "Degree class loading error:",
          error
        );

        toast.error(
          error.message || "Could not load degree classes"
        );
      } finally {
        setLoadingClasses(false);
      }
    };

    loadDegreeClasses();
  }, [enrollmentInfo.departmentId]);

  // ==================================================
  // FILTER DEGREE CLASSES BY PROGRAM TYPE
  // ==================================================
  const filteredDegreeClasses = degreeClasses.filter(
    (degreeClass) =>
      !enrollmentInfo.programType ||
      degreeClass.programType === enrollmentInfo.programType
  );

  // ==================================================
  // Degree Class -> Batches
  // ==================================================
  const loadBatches = useCallback(async () => {
    if (
      !enrollmentInfo.departmentId ||
      !enrollmentInfo.degreeClassId
    ) {
      setBatches([]);
      return;
    }

    setLoadingBatches(true);

    try {
      const params = new URLSearchParams({
        departmentId: enrollmentInfo.departmentId,
        degreeClassId: enrollmentInfo.degreeClassId,
        status: "active",
        currentSemester: "1",
      });

      const res = await fetch(
        `${API_BASE}/batches?${params.toString()}`
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(
          json.message || "Failed to load batches"
        );
      }

      const list = json.data || [];

      setBatches(list);

      // ==================================================
      // Automatically assign first available batch
      // ==================================================
      if (list.length === 1) {
        const batch = list[0];

        const shiftId =
          batch.shiftId?._id ||
          batch.shiftId ||
          "";

        setField("batchId", batch._id);
        setField("shiftId", shiftId);

        console.log(
          "STEP 4 SELECTED BATCH:",
          batch
        );

        console.log(
          "STEP 4 SHIFT ID:",
          shiftId
        );
      } else if (list.length > 1) {
        const batch = list[0];

        const shiftId =
          batch.shiftId?._id ||
          batch.shiftId ||
          "";

        setField("batchId", batch._id);
        setField("shiftId", shiftId);

        toast.info(
          `This class has ${list.length} open sections — assigned to ${
            batch.shiftId?.name ||
            "the first available shift"
          } automatically.`
        );

        console.log(
          "STEP 4 SELECTED BATCH:",
          batch
        );

        console.log(
          "STEP 4 SHIFT ID:",
          shiftId
        );
      } else {
        setField("batchId", "");
        setField("shiftId", "");

        toast.info(
          "This class has no batch currently accepting new admissions."
        );
      }
    } catch (error) {
      console.error(
        "Batch loading error:",
        error
      );

      toast.error(
        error.message || "Could not load batches"
      );
    } finally {
      setLoadingBatches(false);
    }
  }, [
    enrollmentInfo.departmentId,
    enrollmentInfo.degreeClassId,
  ]);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  // ==================================================
  // Campus Change
  // ==================================================
  const handleCampusChange = (e) => {
    const campusId = e.target.value;

    const campusObj = campuses.find(
      (campus) => campus._id === campusId
    );

    setEnrollmentInfo({
      campusId,
      campus: campusObj
        ? campusObj.name
        : "",
      departmentId: "",
      programType: "",
      degreeClassId: "",
      batchId: "",
      shiftId: "",
    });

    setDepartments([]);
    setDegreeClasses([]);
    setBatches([]);
  };

  // ==================================================
  // Department Change
  // ==================================================
  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      departmentId,
      programType: "",
      degreeClassId: "",
      batchId: "",
      shiftId: "",
    }));

    setDegreeClasses([]);
    setBatches([]);
  };

  // ==================================================
  // Program Type Change
  // ==================================================
  const handleProgramTypeChange = (e) => {
    const programType = e.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      programType,
      degreeClassId: "",
      batchId: "",
      shiftId: "",
    }));

    setBatches([]);
  };

  // ==================================================
  // Degree Class Change
  // ==================================================
  const handleClassChange = (e) => {
    const degreeClassId = e.target.value;

    setEnrollmentInfo((prev) => ({
      ...prev,
      degreeClassId,
      batchId: "",
      shiftId: "",
    }));

    setBatches([]);
  };

  // ==================================================
  // Submit Step 4
  // ==================================================
  const submit = async (e) => {
    e.preventDefault();

    if (!enrollmentInfo.programType) {
      toast.error(
        "Please select a program type."
      );
      return;
    }

    if (!enrollmentInfo.degreeClassId) {
      toast.error(
        "Please select a degree class."
      );
      return;
    }

    if (!enrollmentInfo.shiftId) {
      toast.error(
        "No shift is available for the selected degree class."
      );
      return;
    }

    if (!enrollmentInfo.batchId) {
      toast.error(
        "No open batch is available for this class right now."
      );
      return;
    }

    const payload = {
      degreeClassId:
        enrollmentInfo.degreeClassId,

      shiftId:
        enrollmentInfo.shiftId,
    };

    console.log(
      "STEP 4 FINAL PAYLOAD:",
      payload
    );

    try {
      setSubmitting(true);

      await onSubmit(payload);
    } catch (error) {
      console.error(
        "Step 4 submit error:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==================================================
  // Combined Loading
  // ==================================================
  const isSubmitting =
    submitting || loading;

  // ==================================================
  // Selected Data
  // ==================================================
  const selectedDegreeClass =
    degreeClasses.find(
      (item) =>
        item._id ===
        enrollmentInfo.degreeClassId
    );

  const selectedBatch =
    batches.find(
      (item) =>
        item._id ===
        enrollmentInfo.batchId
    );

  const selectedShift =
    selectedBatch?.shiftId?.name || "";

  // ==================================================
  // Program Type Label
  // ==================================================
  const getProgramTypeLabel = (value) => {
    const labels = {
      BS: "BS",
      ADP: "ADP",
      POST_ADP: "Post ADP",
    };

    return labels[value] || value || "Not selected";
  };

  // ==================================================
  // UI
  // ==================================================
  return (
    <form
      onSubmit={submit}
      className="step4-wrapper"
    >
      {/* ==================================================
          Header
      ================================================== */}
      <div className="step4-header">
        <div className="step4-header-icon">
          <FaGraduationCap />
        </div>

        <div>
          <span className="step4-eyebrow">
            STEP 4 OF 4
          </span>

          <h3>
            Enrollment Information
          </h3>

          <p>
            Choose your campus, department,
            program type and degree class to
            complete your registration.
          </p>
        </div>
      </div>

      {/* ==================================================
          Main Enrollment Card
      ================================================== */}
      <div className="step4-card">
        <div className="step4-card-header">
          <div className="step4-section-icon">
            <FaUniversity />
          </div>

          <div>
            <h5>Academic Enrollment</h5>

            <p>
              Select the academic information
              for your admission.
            </p>
          </div>
        </div>

        {/* ==================================================
            Campus + Department
        ================================================== */}
        <MDBRow className="g-4">

          {/* ==================================================
              Campus
          ================================================== */}
          <MDBCol md="6">
            <div className="step4-field">

              <label>
                <FaUniversity />
                Campus
                <span>*</span>
              </label>

              <div className="step4-select-wrapper">

                <select
                  className="step4-select"
                  value={
                    enrollmentInfo.campusId
                  }
                  onChange={
                    handleCampusChange
                  }
                  disabled={
                    loadingCampuses ||
                    isSubmitting
                  }
                >

                  <option value="">
                    {loadingCampuses
                      ? "Loading campuses..."
                      : "Select Campus"}
                  </option>

                  {campuses.map(
                    (campus) => (
                      <option
                        key={campus._id}
                        value={campus._id}
                      >
                        {campus.name}
                      </option>
                    )
                  )}

                </select>

                {loadingCampuses && (
                  <FaSpinner className="step4-spinner" />
                )}

              </div>

              <small>
                Select the campus where you
                want to enroll.
              </small>

            </div>
          </MDBCol>

          {/* ==================================================
              Department
          ================================================== */}
          <MDBCol md="6">
            <div className="step4-field">

              <label>
                <FaBuilding />
                Department
                <span>*</span>
              </label>

              <div className="step4-select-wrapper">

                <select
                  className="step4-select"
                  value={
                    enrollmentInfo.departmentId
                  }
                  onChange={
                    handleDepartmentChange
                  }
                  disabled={
                    !enrollmentInfo.campusId ||
                    loadingDepartments ||
                    isSubmitting
                  }
                >

                  <option value="">
                    {loadingDepartments
                      ? "Loading departments..."
                      : !enrollmentInfo.campusId
                      ? "Select campus first"
                      : "Select Department"}
                  </option>

                  {departments.map(
                    (department) => (
                      <option
                        key={department._id}
                        value={department._id}
                      >
                        {department.name}
                      </option>
                    )
                  )}

                </select>

                {loadingDepartments && (
                  <FaSpinner className="step4-spinner" />
                )}

              </div>

              <small>
                Departments are filtered by
                your selected campus.
              </small>

            </div>
          </MDBCol>

          {/* ==================================================
              Program Type
          ================================================== */}
          <MDBCol md="6">
            <div className="step4-field">

              <label>
                <FaBookOpen />
                Program Type
                <span>*</span>
              </label>

              <div className="step4-select-wrapper">

                <select
                  className="step4-select"
                  value={
                    enrollmentInfo.programType
                  }
                  onChange={
                    handleProgramTypeChange
                  }
                  disabled={
                    !enrollmentInfo.departmentId ||
                    isSubmitting
                  }
                >

                  <option value="">
                    {!enrollmentInfo.departmentId
                      ? "Select department first"
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

              <small>
                Select the program type you
                want to apply for.
              </small>

            </div>
          </MDBCol>

          {/* ==================================================
              Degree Class
          ================================================== */}
          <MDBCol md="6">
            <div className="step4-field">

              <label>
                <FaGraduationCap />
                Degree Class
                <span>*</span>
              </label>

              <div className="step4-select-wrapper">

                <select
                  className="step4-select"
                  value={
                    enrollmentInfo.degreeClassId
                  }
                  onChange={
                    handleClassChange
                  }
                  disabled={
                    !enrollmentInfo.programType ||
                    loadingClasses ||
                    isSubmitting
                  }
                >

                  <option value="">
                    {loadingClasses
                      ? "Loading degree classes..."
                      : !enrollmentInfo.departmentId
                      ? "Select department first"
                      : !enrollmentInfo.programType
                      ? "Select program type first"
                      : filteredDegreeClasses.length === 0
                      ? "No classes available"
                      : "Select Degree Class"}
                  </option>

                  {filteredDegreeClasses.map(
                    (degreeClass) => (
                      <option
                        key={degreeClass._id}
                        value={degreeClass._id}
                      >
                        {degreeClass.name}
                      </option>
                    )
                  )}

                </select>

                {loadingClasses && (
                  <FaSpinner className="step4-spinner" />
                )}

              </div>

              <small>
                Only classes belonging to the
                selected program type are shown.
              </small>

            </div>
          </MDBCol>

          {/* ==================================================
              Batch
          ================================================== */}
          <MDBCol md="6">
            <div className="step4-field">

              <label>
                <FaLayerGroup />
                Batch
                <span>*</span>
              </label>

              <div className="step4-select-wrapper">

                <select
                  className="step4-select step4-readonly-select"
                  value={
                    enrollmentInfo.batchId
                  }
                  disabled
                >

                  <option value="">
                    {loadingBatches
                      ? "Loading batches..."
                      : "Batch assigned automatically"}
                  </option>

                  {batches.map(
                    (batch) => (
                      <option
                        key={batch._id}
                        value={batch._id}
                      >
                        {batch.name ||
                          batch.batchName ||
                          "Batch"}
                        {batch.shiftId?.name
                          ? ` — ${batch.shiftId.name}`
                          : ""}
                      </option>
                    )
                  )}

                </select>

                {loadingBatches && (
                  <FaSpinner className="step4-spinner" />
                )}

              </div>

              {!loadingBatches &&
                enrollmentInfo.batchId && (
                  <small className="step4-success-text">
                    <FaCheckCircle />
                    Batch assigned automatically
                  </small>
                )}

            </div>
          </MDBCol>

        </MDBRow>

        {/* ==================================================
            Shift
        ================================================== */}
        <div className="step4-shift-box">

          <div className="step4-shift-icon">
            <FaClock />
          </div>

          <div className="step4-shift-content">

            <span>
              Assigned Shift
            </span>

            <strong>
              {selectedShift ||
                "Will be assigned automatically"}
            </strong>

            <small>
              Your shift is determined by the
              available batch.
            </small>

          </div>

          {selectedShift && (
            <FaCheckCircle className="step4-shift-check" />
          )}

        </div>

      </div>

      {/* ==================================================
          Enrollment Summary
      ================================================== */}
      <div className="step4-summary">

        <div className="step4-summary-header">

          <div className="step4-summary-icon">
            <FaCheckCircle />
          </div>

          <div>

            <h5>
              Enrollment Summary
            </h5>

            <p>
              Review your selected academic
              information before submitting.
            </p>

          </div>

        </div>

        <div className="step4-summary-grid">

          {/* Campus */}
          <div className="step4-summary-item">

            <span>
              Campus
            </span>

            <strong>
              {enrollmentInfo.campus ||
                "Not selected"}
            </strong>

          </div>

          {/* Department */}
          <div className="step4-summary-item">

            <span>
              Department
            </span>

            <strong>
              {departments.find(
                (item) =>
                  item._id ===
                  enrollmentInfo.departmentId
              )?.name ||
                "Not selected"}
            </strong>

          </div>

          {/* Program Type */}
          <div className="step4-summary-item">

            <span>
              Program Type
            </span>

            <strong>
              {getProgramTypeLabel(
                enrollmentInfo.programType
              )}
            </strong>

          </div>

          {/* Degree Class */}
          <div className="step4-summary-item">

            <span>
              Degree Class
            </span>

            <strong>
              {selectedDegreeClass?.name ||
                "Not selected"}
            </strong>

          </div>

          {/* Batch */}
          <div className="step4-summary-item">

            <span>
              Batch
            </span>

            <strong>
              {selectedBatch?.name ||
                selectedBatch?.batchName ||
                (enrollmentInfo.batchId
                  ? "Assigned"
                  : "Not selected")}
            </strong>

          </div>

          {/* Shift */}
          <div className="step4-summary-item">

            <span>
              Shift
            </span>

            <strong>
              {selectedShift ||
                "Assigned automatically"}
            </strong>

          </div>

        </div>

      </div>

      {/* ==================================================
          Information Notice
      ================================================== */}
      <div className="step4-notice">

        <FaInfoCircle />

        <div>

          <strong>
            Almost there!
          </strong>

          <p>
            Please review your enrollment
            information carefully. Once submitted,
            your registration will be completed.
          </p>

        </div>

      </div>

      {/* ==================================================
          Buttons
      ================================================== */}
      <div className="step4-actions">

        <MDBBtn
          type="button"
          className="step4-back-btn"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <FaArrowLeft />
          Back
        </MDBBtn>

        <MDBBtn
          type="submit"
          className="step4-submit-btn"
          disabled={
            isSubmitting ||
            loadingBatches ||
            !enrollmentInfo.programType ||
            !enrollmentInfo.degreeClassId ||
            !enrollmentInfo.shiftId ||
            !enrollmentInfo.batchId
          }
        >

          {isSubmitting ? (
            <>
              <FaSpinner className="step4-button-spinner" />
              Submitting...
            </>
          ) : (
            <>
              Complete Registration
              <FaArrowRight />
            </>
          )}

        </MDBBtn>

      </div>

    </form>
  );
};

export default Step4;