import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import './Step4.css';

const Step4 = ({ onSubmit, onBack, initialData }) => {
  const [enrollmentInfo, setEnrollmentInfo] = useState({
    program: '',
    department: '',
    session: '',
    semester: '',
    shift: '',
    campus: '',
  });

  useEffect(() => {
    if (initialData) {
      setEnrollmentInfo(initialData);
    }
  }, [initialData]);

  const handleEnrollment = (e) => {
    const { name, value } = e.target;
    setEnrollmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (enrollmentInfo.program === "BS") {
      setEnrollmentInfo((prev) => ({
        ...prev,
        semester: "1st Semester",
      }));
    } else if (enrollmentInfo.program !== "BS" && !initialData?.semester) {
      setEnrollmentInfo((prev) => ({
        ...prev,
        semester: '',
      }));
    }
  }, [enrollmentInfo.program, initialData]);

  const submit = (e) => {
    e.preventDefault();
    if (!enrollmentInfo.program || !enrollmentInfo.department) {
      toast.error("Please fill all required fields");
      return;
    }
    onSubmit(enrollmentInfo);
  };

  return (
    <form onSubmit={submit} className="step-form">
      <h4 className="section-title">
        <i className="fas fa-check-double"></i> Enrollment Details
      </h4>

      <div className="enrollment-summary">
        <i className="fas fa-info-circle"></i>
        <div>
          Please select your program, department, and other enrollment details carefully. 
          These cannot be changed after submission.
        </div>
      </div>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Program Name <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-book-open"></i>
              <select name="program" value={enrollmentInfo.program} onChange={handleEnrollment} required>
                <option value="" disabled>Select Program</option>
                <option value="BS">BS (Bachelor of Science)</option>
                <option value="ADP">ADP/ADS (Associate Degree)</option>
                <option value="MPhill">MPhil (Master of Philosophy)</option>
                <option value="PHD">PhD (Doctor of Philosophy)</option>
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Semester <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-layer-group"></i>
              <select
                name="semester"
                value={enrollmentInfo.semester}
                onChange={handleEnrollment}
                required
                disabled={enrollmentInfo.program === 'BS'}
              >
                {enrollmentInfo.program === 'BS' ? (
                  <option value="1st Semester">1st Semester</option>
                ) : (
                  <>
                    <option value="" disabled>Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Department <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-university"></i>
              <select name="department" value={enrollmentInfo.department} onChange={handleEnrollment} required>
                <option value="" disabled>Select Department</option>
                <optgroup label="Computer & IT">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cyber Security">Cyber Security</option>
                </optgroup>
                <optgroup label="Engineering">
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Biomedical Engineering">Biomedical Engineering</option>
                </optgroup>
                <optgroup label="Business & Management">
                  <option value="Business Administration">Business Administration (BBA)</option>
                  <option value="Master of Business Administration">Master of Business Administration (MBA)</option>
                  <option value="Accounting">Accounting & Finance</option>
                  <option value="Economics">Economics</option>
                  <option value="Commerce">Commerce</option>
                </optgroup>
                <optgroup label="Sciences">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Zoology">Zoology</option>
                  <option value="Botany">Botany</option>
                </optgroup>
                <optgroup label="Medical">
                  <option value="BDS Dentistry">BDS (Dentistry)</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                </optgroup>
                <optgroup label="Arts & Humanities">
                  <option value="English">English Literature</option>
                  <option value="Urdu">Urdu</option>
                  <option value="History">History</option>
                  <option value="Islamic Studies">Islamic Studies</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Psychology">Psychology</option>
                </optgroup>
                <optgroup label="Education">
                  <option value="Bachelor of Education">Bachelor of Education (B.Ed)</option>
                  <option value="Master of Education">Master of Education (M.Ed)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Shift <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-clock"></i>
              <select name="shift" value={enrollmentInfo.shift} onChange={handleEnrollment} required>
                <option value="" disabled>Select Shift</option>
                <option value="Morning">Morning (8:00 AM - 1:00 PM)</option>
                <option value="Evening">Evening (2:00 PM - 7:00 PM)</option>
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Admission Session <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-calendar-alt"></i>
              <select name="session" value={enrollmentInfo.session} onChange={handleEnrollment} required>
                <option value="" disabled>Select Session</option>
                <option value="Fall-2025">Fall 2025 (September 2025)</option>
                <option value="Spring-2025">Spring 2025 (February 2025)</option>
                <option value="Fall-2026">Fall 2026 (September 2026)</option>
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Campus <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-building"></i>
              <select name="campus" value={enrollmentInfo.campus} onChange={handleEnrollment} required>
                <option value="" disabled>Select Campus</option>
                <option value="Main">Main Campus (Defence Road)</option>
                <option value="City">City Campus (Gulberg)</option>
                <option value="Other">Other Campus</option>
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="btn-group-wrapper">
        <MDBBtn type='button' onClick={onBack} className="btn-back">
          <i className="fas fa-arrow-left"></i> Back
        </MDBBtn>
        <MDBBtn type='submit' className="btn-submit">
          <i className="fas fa-check-circle"></i> Submit Registration
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step4;