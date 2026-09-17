import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBModal,
  MDBBtn,
  MDBTableHead,
  MDBTableBody,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import {
  FaGraduationCap,
  FaInfoCircle,
  FaPlus,
  FaTimes,
  FaBook,
  FaSortNumericUp,
  FaCheckCircle,
  FaCalendarAlt,
  FaIdCard,
  FaUniversity,
  FaFileImage,
  FaEye,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";
import "./Step3.css";

const Step3 = ({ onSubmit, onBack, initialData }) => {
  const [educationList, setEducationList] = useState([]);
  const [basicModal, setBasicModal] = useState(false);

  const [educationData, setEducationData] = useState({
    degreeLevel: "",
    qualification: "",
    totalMarks: "",
    obtainMarks: "",
    percentage: "",
    passingYear: "",
    rollNo: "",
    boardUni: "",
  });

  const [markSheet, setMarkSheet] = useState(null);

  // ==================================================
  // MARKSHEET
  // ==================================================

  const handleMarkSheet = (e) => {
    setMarkSheet(e.target.files[0]);
  };

  // ==================================================
  // RESTORE INITIAL DATA
  // ==================================================

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setEducationList(initialData);
    }
  }, [initialData]);

  // ==================================================
  // MODAL
  // ==================================================

  const toggleOpen = () => {
    setBasicModal(!basicModal);
  };

  const closeModal = () => {
    setBasicModal(false);
  };

  // ==================================================
  // SAVE EDUCATION
  // ==================================================

  const handleSave = () => {
    if (!educationData.degreeLevel) {
      toast.error("Please select Degree Level");
      return;
    }

    if (!educationData.qualification) {
      toast.error("Please select Academic Qualification");
      return;
    }

    if (!educationData.totalMarks) {
      toast.error("Please enter Total Marks");
      return;
    }

    if (!educationData.obtainMarks) {
      toast.error("Please enter Obtained Marks");
      return;
    }

    if (!educationData.passingYear) {
      toast.error("Please select Passing Year");
      return;
    }

    if (!educationData.rollNo) {
      toast.error("Please enter Roll Number");
      return;
    }

    if (!educationData.boardUni) {
      toast.error("Please select Board/University");
      return;
    }

    if (!markSheet) {
      toast.error("Please upload Marks Sheet");
      return;
    }

    const newEducation = {
      ...educationData,
      totalMarks: Number(educationData.totalMarks) || 0,
      obtainMarks: Number(educationData.obtainMarks) || 0,
      percentage: educationData.percentage
        ? String(educationData.percentage)
        : "0",
      marksheet: markSheet
        ? URL.createObjectURL(markSheet)
        : null,
      marksheetFile: markSheet,
    };

    setEducationList((prev) => [
      ...prev,
      newEducation,
    ]);

    setEducationData({
      degreeLevel: "",
      qualification: "",
      totalMarks: "",
      obtainMarks: "",
      percentage: "",
      passingYear: "",
      rollNo: "",
      boardUni: "",
    });

    setMarkSheet(null);
    setBasicModal(false);

    toast.success(
      "Education record added successfully!"
    );
  };

  // ==================================================
  // FORM CHANGE
  // ==================================================

  const handleEduChange = (e) => {
    const { name, value } = e.target;

    setEducationData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (
        name === "obtainMarks" ||
        name === "totalMarks"
      ) {
        const total =
          name === "totalMarks"
            ? value
            : prev.totalMarks;

        const obtained =
          name === "obtainMarks"
            ? value
            : prev.obtainMarks;

        if (total && obtained) {
          const percentage = (
            (obtained / total) *
            100
          ).toFixed(2);

          updated.percentage = percentage;
        }
      }

      return updated;
    });
  };

  // ==================================================
  // SUBMIT STEP
  // ==================================================

  const submit = (e) => {
    e.preventDefault();

    if (educationList.length === 0) {
      toast.info(
        "Please add at least one education record"
      );
      return;
    }

    onSubmit(educationList);
  };

  // ==================================================
  // REMOVE
  // ==================================================

  const removeEducation = (index) => {
    const updated = educationList.filter(
      (_, i) => i !== index
    );

    setEducationList(updated);

    toast.success("Record removed");
  };

  // ==================================================
  // DEGREE LABEL
  // ==================================================

  const getDegreeLabel = (value) => {
    const labels = {
      Matric: "Matriculation",
      "Inter-Part-1": "Intermediate Part I",
      "Inter-Part-2": "Intermediate Part II",
      "ADP/ADS": "ADS / ADP",
      BS: "BS",
      MS: "MS",
      MPHILL: "MPhil",
      PHD: "PhD",
    };

    return labels[value] || value;
  };

  return (
    <form
      onSubmit={submit}
      className="step3-wrapper"
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="step3-header">
        <div className="step3-header-icon">
          <FaGraduationCap />
        </div>

        <div>
          <span className="step3-eyebrow">
            STEP 3 OF 4
          </span>

          <h3>Academic Details</h3>

          <p>
            Add your educational qualifications
            and upload the required marks sheets.
          </p>
        </div>
      </div>

      {/* ==================================================
          INSTRUCTION BANNER
      ================================================== */}

      <div className="step3-info-banner">
        <div className="step3-info-icon">
          <FaInfoCircle />
        </div>

        <div>
          <strong>
            Education Information
          </strong>

          <p>
            Applicants should add their Matric,
            Intermediate Part I and Intermediate
            Part II records. If Inter Part II
            results are still pending, you can
            add the record and provide the
            available information.
          </p>
        </div>
      </div>

      {/* ==================================================
          ADD EDUCATION CARD
      ================================================== */}

      <div className="step3-add-card">
        <div className="step3-add-content">
          <div className="step3-add-icon">
            <FaFileAlt />
          </div>

          <div>
            <h5>
              Educational Qualifications
            </h5>

            <p>
              Add all academic records required
              for your admission.
            </p>
          </div>
        </div>

        <MDBBtn
          type="button"
          className="step3-add-btn"
          onClick={toggleOpen}
        >
          <FaPlus />
          Add Education Record
        </MDBBtn>
      </div>

      {/* ==================================================
          EDUCATION TABLE
      ================================================== */}

      {educationList.length > 0 ? (
        <div className="step3-record-card">
          <div className="step3-record-header">
            <div>
              <h5>
                Added Education Records
              </h5>

              <p>
                {educationList.length}{" "}
                record
                {educationList.length > 1
                  ? "s"
                  : ""}{" "}
                added
              </p>
            </div>

            <div className="step3-record-count">
              {educationList.length}
            </div>
          </div>

          <div className="step3-table-wrapper">
            <MDBTable
              align="middle"
              responsive
              className="step3-table"
            >
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Degree</th>
                  <th>Qualification</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Year</th>
                  <th>Roll No</th>
                  <th>Board / University</th>
                  <th>Document</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {educationList.map(
                  (edu, index) => (
                    <tr key={index}>
                      <td>
                        <span className="step3-index">
                          {index + 1}
                        </span>
                      </td>

                      <td>
                        <strong className="step3-degree">
                          {getDegreeLabel(
                            edu.degreeLevel
                          )}
                        </strong>
                      </td>

                      <td>
                        <span className="step3-muted-text">
                          {edu.qualification}
                        </span>
                      </td>

                      <td>
                        <div className="step3-marks">
                          <strong>
                            {edu.obtainMarks}
                          </strong>
                          <span>
                            / {edu.totalMarks}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="step3-percentage">
                          <FaChartLine />
                          {edu.percentage}%
                        </span>
                      </td>

                      <td>
                        {edu.passingYear}
                      </td>

                      <td>
                        {edu.rollNo}
                      </td>

                      <td>
                        {edu.boardUni}
                      </td>

                      <td>
                        {edu.marksheet ? (
                          <a
                            href={edu.marksheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="step3-view-file"
                          >
                            <FaEye />
                            View
                          </a>
                        ) : (
                          <span className="step3-no-file">
                            No File
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="step3-delete-btn"
                          onClick={() =>
                            removeEducation(
                              index
                            )
                          }
                          title="Remove record"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      ) : (
        <div className="step3-empty-state">
          <div className="step3-empty-icon">
            <FaGraduationCap />
          </div>

          <h5>
            No education records yet
          </h5>

          <p>
            Click "Add Education Record" to
            enter your academic qualification.
          </p>

          <button
            type="button"
            className="step3-empty-btn"
            onClick={toggleOpen}
          >
            <FaPlus />
            Add First Record
          </button>
        </div>
      )}

      {/* ==================================================
          MODAL
      ================================================== */}

      <MDBModal
        open={basicModal}
        onClose={closeModal}
        tabIndex="-1"
        className="step3-modal"
      >
        <MDBModalDialog
          size="lg"
          centered
        >
          <MDBModalContent className="step3-modal-content">
            {/* HEADER */}

            <MDBModalHeader className="step3-modal-header">
              <div className="step3-modal-title-wrap">
                <div className="step3-modal-icon">
                  <FaPlus />
                </div>

                <div>
                  <MDBModalTitle>
                    Add Education Record
                  </MDBModalTitle>

                  <p>
                    Enter your academic
                    qualification details.
                  </p>
                </div>
              </div>

              <MDBBtn
                type="button"
                color="none"
                className="step3-modal-close"
                onClick={closeModal}
              >
                <FaTimes />
              </MDBBtn>
            </MDBModalHeader>

            {/* BODY */}

            <MDBModalBody className="step3-modal-body">
              {/* Degree Level */}

              <div className="step3-form-group">
                <label>
                  <FaGraduationCap />
                  Degree Level
                  <span>*</span>
                </label>

                <div className="step3-input-wrapper">
                  <FaGraduationCap />

                  <select
                    name="degreeLevel"
                    value={
                      educationData.degreeLevel
                    }
                    onChange={
                      handleEduChange
                    }
                  >
                    <option value="">
                      Select Degree Level
                    </option>

                    <option value="Matric">
                      Matriculation
                    </option>

                    <option value="Inter-Part-1">
                      Intermediate Part I
                    </option>

                    <option value="Inter-Part-2">
                      Intermediate Part II
                    </option>

                    <option value="ADP/ADS">
                      ADS / ADP
                    </option>

                    <option value="BS">
                      BS
                    </option>

                    <option value="MS">
                      MS
                    </option>

                    <option value="MPHILL">
                      MPhil
                    </option>

                    <option value="PHD">
                      PhD
                    </option>
                  </select>
                </div>
              </div>

              {/* Qualification */}

              <div className="step3-form-group">
                <label>
                  <FaBook />
                  Academic Qualification
                  <span>*</span>
                </label>

                <div className="step3-input-wrapper">
                  <FaBook />

                  <select
                    name="qualification"
                    value={
                      educationData.qualification
                    }
                    onChange={
                      handleEduChange
                    }
                  >
                    <option value="">
                      Select Academic Qualification
                    </option>

                    <option value="science">
                      Science
                    </option>

                    <option value="arts">
                      Arts
                    </option>

                    <option value="commerce">
                      Commerce
                    </option>

                    <option value="cs">
                      Computer Science
                    </option>

                    <option value="engineering">
                      Engineering
                    </option>

                    <option value="medical">
                      Medical
                    </option>
                  </select>
                </div>
              </div>

              {/* Marks */}

              <div className="step3-modal-row">
                <div className="step3-form-group">
                  <label>
                    <FaSortNumericUp />
                    Total Marks
                    <span>*</span>
                  </label>

                  <div className="step3-input-wrapper">
                    <FaSortNumericUp />

                    <input
                      type="number"
                      name="totalMarks"
                      placeholder="1100"
                      min="0"
                      value={
                        educationData.totalMarks
                      }
                      onChange={
                        handleEduChange
                      }
                    />
                  </div>
                </div>

                <div className="step3-form-group">
                  <label>
                    <FaCheckCircle />
                    Obtained Marks
                    <span>*</span>
                  </label>

                  <div className="step3-input-wrapper">
                    <FaCheckCircle />

                    <input
                      type="number"
                      name="obtainMarks"
                      placeholder="950"
                      min="0"
                      value={
                        educationData.obtainMarks
                      }
                      onChange={
                        handleEduChange
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Percentage */}

              {educationData.percentage && (
                <div className="step3-percentage-preview">
                  <div className="step3-percentage-icon">
                    <FaChartLine />
                  </div>

                  <div>
                    <span>
                      Calculated Percentage
                    </span>

                    <strong>
                      {educationData.percentage}%
                    </strong>
                  </div>
                </div>
              )}

              {/* Passing Year + Roll */}

              <div className="step3-modal-row">
                <div className="step3-form-group">
                  <label>
                    <FaCalendarAlt />
                    Passing Year
                    <span>*</span>
                  </label>

                  <div className="step3-input-wrapper">
                    <FaCalendarAlt />

                    <select
                      name="passingYear"
                      value={
                        educationData.passingYear
                      }
                      onChange={
                        handleEduChange
                      }
                    >
                      <option value="">
                        Select Passing Year
                      </option>

                      {Array.from(
                        { length: 30 },
                        (_, i) => {
                          const year =
                            2025 - i;

                          return (
                            <option
                              key={year}
                              value={year}
                            >
                              {year}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>

                <div className="step3-form-group">
                  <label>
                    <FaIdCard />
                    Roll Number
                    <span>*</span>
                  </label>

                  <div className="step3-input-wrapper">
                    <FaIdCard />

                    <input
                      type="text"
                      name="rollNo"
                      placeholder="Enter roll number"
                      value={
                        educationData.rollNo
                      }
                      onChange={
                        handleEduChange
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Board */}

              <div className="step3-form-group">
                <label>
                  <FaUniversity />
                  Board / University
                  <span>*</span>
                </label>

                <div className="step3-input-wrapper">
                  <FaUniversity />

                  <select
                    name="boardUni"
                    value={
                      educationData.boardUni
                    }
                    onChange={
                      handleEduChange
                    }
                  >
                    <option value="">
                      Select Board / University
                    </option>

                    <option value="Bise Lahore">
                      BISE Lahore
                    </option>

                    <option value="Bise Multan">
                      BISE Multan
                    </option>

                    <option value="Bise Faisalabad">
                      BISE Faisalabad
                    </option>

                    <option value="Bise Karachi">
                      BISE Karachi
                    </option>

                    <option value="Punjab Uni">
                      University of the Punjab
                    </option>

                    <option value="BZU">
                      BZU Multan
                    </option>

                    <option value="UOL">
                      University of Lahore
                    </option>

                    <option value="NUML">
                      NUML
                    </option>

                    <option value="FAST">
                      FAST NUCES
                    </option>

                    <option value="NUST">
                      NUST
                    </option>

                    <option value="QUAID">
                      Quaid-i-Azam University
                    </option>

                    <option value="UET">
                      UET Lahore
                    </option>

                    <option value="COMSAT">
                      COMSATS
                    </option>

                    <option value="GCU LAHORE">
                      GCU Lahore
                    </option>

                    <option value="IIUI">
                      IIUI
                    </option>
                  </select>
                </div>
              </div>

              {/* Marksheet */}

              <div className="step3-form-group">
                <label>
                  <FaFileImage />
                  Upload Marks Sheet / Result Card
                  <span>*</span>
                </label>

                <div className="step3-file-wrapper">
                  <FaFileImage />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMarkSheet}
                  />
                </div>

                {markSheet && (
                  <div className="step3-file-preview">
                    <FaCheckCircle />

                    <span>
                      {markSheet.name}
                    </span>
                  </div>
                )}

                <small className="step3-file-help">
                  Upload a clear image of your
                  marks sheet or result card.
                </small>
              </div>
            </MDBModalBody>

            {/* FOOTER */}

            <MDBModalFooter className="step3-modal-footer">
              <MDBBtn
                type="button"
                className="step3-cancel-btn"
                onClick={closeModal}
              >
                <FaTimes />
                Cancel
              </MDBBtn>

              <MDBBtn
                type="button"
                className="step3-save-btn"
                onClick={handleSave}
              >
                <FaCheckCircle />
                Save Record
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <div className="step3-actions">
        <MDBBtn
          type="button"
          className="step3-back-btn"
          onClick={onBack}
        >
          <FaArrowLeft />
          Back
        </MDBBtn>

        <MDBBtn
          type="submit"
          className="step3-next-btn"
        >
          Next Step
          <FaArrowRight />
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step3;