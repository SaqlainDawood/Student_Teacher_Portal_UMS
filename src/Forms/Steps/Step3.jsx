import React, { useState, useEffect } from 'react';
import {
  MDBCol, MDBTable, MDBModal, MDBBtn, MDBTableHead, MDBTableBody,
  MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle,
  MDBModalBody, MDBModalFooter
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import './Step3.css';

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

  const handleMarkSheet = (e) => {
    setMarkSheet(e.target.files[0]);
  };

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setEducationList(initialData);
    }
  }, [initialData]);

  const toggleOpen = () => setBasicModal(!basicModal);

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
      percentage: educationData.percentage ? String(educationData.percentage) : "0",
      marksheet: markSheet ? URL.createObjectURL(markSheet) : null,
      marksheetFile: markSheet
    };

    setEducationList((prev) => [...prev, newEducation]);
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
    toast.success("Education record added successfully!");
  };

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "obtainMarks" || name === "totalMarks") {
        const total = name === "totalMarks" ? value : prev.totalMarks;
        const obtained = name === "obtainMarks" ? value : prev.obtainMarks;

        if (total && obtained) {
          const percentage = ((obtained / total) * 100).toFixed(2);
          updated.percentage = percentage;
        }
      }
      return updated;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (educationList.length === 0) {
      toast.info("Please add at least one education record");
      return;
    }
    onSubmit(educationList);
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    toast.success("Record removed");
  };

  return (
    <form onSubmit={submit} className="step-form">
      <h4 className="section-title">
        <i className="fas fa-graduation-cap"></i> Academic Details
      </h4>

      <div className="info-banner">
        <i className="fas fa-info-circle"></i>
        <div>
          <strong>Instructions:</strong> Applicants must add their Matric marks, Inter Part 1 marks, and Inter Part 2 marks. 
          If awaiting Inter Part 2 results, click "Result Waiting" when adding Inter Part 2 details.
        </div>
      </div>

      <div className="add-education-btn-wrapper">
        <MDBBtn type="button" onClick={toggleOpen} className="btn-add-education">
          <i className="fas fa-plus-circle"></i> Add Education Record
        </MDBBtn>
      </div>

      {educationList.length > 0 && (
        <div className="education-table-container">
          <MDBTable align='middle' responsive className="luxury-table">
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Degree Level</th>
                <th>Qualification</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Passing Year</th>
                <th>Roll No</th>
                <th>Board/University</th>
                <th>Marks Sheet</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {educationList.map((edu, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{edu.degreeLevel}</td>
                  <td>{edu.qualification}</td>
                  <td>{edu.totalMarks}</td>
                  <td>{edu.obtainMarks}</td>
                  <td><span className="percentage-badge">{edu.percentage}%</span></td>
                  <td>{edu.passingYear}</td>
                  <td>{edu.rollNo}</td>
                  <td>{edu.boardUni}</td>
                  <td>
                    {edu.marksheet ? (
                      <a href={edu.marksheet} target="_blank" rel="noopener noreferrer" className="view-file-link">
                        <i className="fas fa-eye"></i> View
                      </a>
                    ) : "No File"}
                  </td>
                  <td>
                    <MDBBtn size="sm" color="danger" onClick={() => removeEducation(index)} className="remove-btn">
                      <i className="fas fa-trash-alt"></i>
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      )}

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1" className="luxury-modal">
  <MDBModalDialog size="lg">
    <MDBModalContent className="modal-content-custom">
      <MDBModalHeader className="modal-header-custom">
        <MDBModalTitle><i className="fas fa-plus-circle"></i> Add Education Record</MDBModalTitle>
        <MDBBtn className="btn-close-custom" color="none" onClick={toggleOpen}>
          <i className="fas fa-times"></i>
        </MDBBtn>
      </MDBModalHeader>
      
      <MDBModalBody style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1.5rem' }}>
        {/* All your form fields remain exactly the same */}
        <div className="modal-form-group">
          <label>Degree Level *</label>
          <div className="input-icon-wrapper">
            <i className="fas fa-graduation-cap"></i>
            <select name="degreeLevel" value={educationData.degreeLevel} onChange={handleEduChange}>
              <option value="">Select Degree Level</option>
              <option value="Matric">Matriculation</option>
              <option value="Inter-Part-1">Intermediate Part I</option>
              <option value="Inter-Part-2">Intermediate Part II</option>
              <option value="ADP/ADS">ADS / ADP</option>
              <option value="BS">BS</option>
              <option value="MS">MS</option>
              <option value="MPHILL">MPhil</option>
              <option value="PHD">PhD</option>
            </select>
          </div>
        </div>

        <div className="modal-form-group">
          <label>Academic Qualification *</label>
          <div className="input-icon-wrapper">
            <i className="fas fa-book"></i>
            <select name="qualification" value={educationData.qualification} onChange={handleEduChange}>
              <option value="">Select Academic Qualification</option>
              <option value="science">Science</option>
              <option value="arts">Arts</option>
              <option value="commerce">Commerce</option>
              <option value="cs">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
            </select>
          </div>
        </div>

        <div className="modal-row">
          <div className="modal-form-group half">
            <label>Total Marks *</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-sort-numeric-up"></i>
              <input type="number" name="totalMarks" placeholder="1100" value={educationData.totalMarks} onChange={handleEduChange} />
            </div>
          </div>
          <div className="modal-form-group half">
            <label>Obtained Marks *</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-check-circle"></i>
              <input type="number" name="obtainMarks" placeholder="950" value={educationData.obtainMarks} onChange={handleEduChange} />
            </div>
          </div>
        </div>

        {educationData.percentage && (
          <div className="percentage-preview">
            <i className="fas fa-chart-line"></i> Calculated Percentage: <strong>{educationData.percentage}%</strong>
          </div>
        )}

        <div className="modal-row">
          <div className="modal-form-group half">
            <label>Passing Year *</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-calendar"></i>
              <select name="passingYear" value={educationData.passingYear} onChange={handleEduChange}>
                <option value="">Select Passing Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const year = 2025 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="modal-form-group half">
            <label>Roll Number *</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-id-card"></i>
              <input type="text" name="rollNo" placeholder="Enter roll number" value={educationData.rollNo} onChange={handleEduChange} />
            </div>
          </div>
        </div>

        <div className="modal-form-group">
          <label>Board / University *</label>
          <div className="input-icon-wrapper">
            <i className="fas fa-university"></i>
            <select name="boardUni" value={educationData.boardUni} onChange={handleEduChange}>
              <option value="">Select Board / University</option>
              <option value="Bise Lahore">BISE Lahore</option>
              <option value="Bise Multan">BISE Multan</option>
              <option value="Bise Faisalabad">BISE Faisalabad</option>
              <option value="Bise Karachi">BISE Karachi</option>
              <option value="Punjab Uni">University of the Punjab</option>
              <option value="BZU">BZU Multan</option>
              <option value="UOL">University of Lahore</option>
              <option value="NUML">NUML</option>
              <option value="FAST">FAST NUCES</option>
              <option value="NUST">NUST</option>
              <option value="QUAID">Quaid-i-Azam University</option>
              <option value="UET">UET Lahore</option>
              <option value="COMSAT">COMSATS</option>
              <option value="GCU LAHORE">GCU Lahore</option>
              <option value="IIUI">IIUI</option>
            </select>
          </div>
        </div>

        <div className="modal-form-group">
          <label>Upload Marks Sheet/Result Card *</label>
          <div className="input-icon-wrapper">
            <i className="fas fa-file-image"></i>
            <input type="file" accept='image/*' onChange={handleMarkSheet} className="file-input" />
          </div>
          {markSheet && <div className="file-preview"><i className="fas fa-check-circle"></i> {markSheet.name}</div>}
        </div>
      </MDBModalBody>
      
      <MDBModalFooter className="modal-footer-custom">
        <MDBBtn color="secondary" onClick={toggleOpen} className="btn-modal-close">Cancel</MDBBtn>
        <MDBBtn type="button" onClick={handleSave} className="btn-modal-save">Save Record</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

      <div className="btn-group-wrapper">
        <MDBBtn type='button' onClick={onBack} className="btn-back">
          <i className="fas fa-arrow-left"></i> Back
        </MDBBtn>
        <MDBBtn type='submit' className="btn-next">
          Next Step <i className="fas fa-arrow-right"></i>
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step3;