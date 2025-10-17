import React, { useState } from 'react';
import {

  MDBCol, MDBInputGroup, MDBTable, MDBModal, MDBBtn, MDBIcon, MDBTableHead, MDBTableBody,
  MDBInput, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle,
  MDBModalBody, MDBModalFooter
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

const Step3 = ({ onSubmit, onBack }) => {
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
  }
  const toggleOpen = () => setBasicModal(!basicModal);

  const handleSave = () => {
    const newEducation = {
      ...educationData,
      totalMarks: Number(educationData.totalMarks) || 0,
      obtainMarks: Number(educationData.obtainMarks) || 0,
      percentage: educationData.percentage ? String(educationData.percentage) : "0",
      marksheet: markSheet ? URL.createObjectURL(markSheet) : null, // preview only
      marksheetFile: markSheet // actual file for upload
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

  return (
    <form onSubmit={submit}>
      <>
        <h4 className="mb-3 text-primary">Academic Details</h4>
        <div style={{ overflowX: 'auto' }}>
          <MDBTable align="middle" responsive>
            <MDBTableHead>
              <tr className="table-dark">
                <th scope='col' style={{ whiteSpace: 'nowrap' }} >Add Education Details</th>
                <th style={{ whiteSpace: "nowrap" }}> <MDBBtn type="button" size="sm" onClick={toggleOpen}>
                  Add Education
                </MDBBtn>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr className='table-primary'>
                <td scope='row' style={{ whiteSpace: 'nowrap' }}>
                  Applicants must add their Matric marks, Inter Part 1 marks, and Inter Part 2 marks.
                </td>
                <td></td>
              </tr>
              <tr className='table-info'>
                <td scope='row'>If the applicant is awaiting their Inter Part 2 results, they should click the "Result Waiting" button when entering Inter Part 2 education details.</td>
                <td></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>

        {/* Education List Table */}
        {educationList.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <MDBTable align='middle' responsive>
              <MDBTableHead className="table-secondary">
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Degree Level</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Academic Qualification</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Total Marks</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Obtained Marks</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>Percentage %</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>Passing Year</th>
                  <th scope='col' style={{ whiteSpace: 'nowrap' }}>Roll No</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Board/University</th>
                  <th scope='col' style={{ whiteSpace: "nowrap" }}>Marks Sheet</th>
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
                    <td>{edu.percentage}%</td>
                    <td>{edu.passingYear}</td>
                    <td>{edu.rollNo}</td>
                    <td>{edu.boardUni}</td>
                    <td>
                      {edu.marksheet ? (
                        <img src={edu.marksheet} alt="marksheet" width="60" />
                      ) : (
                        "No File"
                      )}
                    </td>

                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        )}
        {/* Modal for Adding Education */}
        <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Education</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {/* Degree Level */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="graduation-cap" />
                  </span>
                  <select className="form-select"
                    name="degreeLevel"
                    value={educationData.degreeLevel}
                    onChange={handleEduChange}>
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

                {/* Academic Qualification */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="book" />
                  </span>
                  <select className="form-select"
                    name="qualification"
                    value={educationData.qualification}
                    onChange={handleEduChange}>
                    <option value="">Select Academic Qualification</option>
                    <option value="science">Science</option>
                    <option value="arts">Arts</option>
                    <option value="commerce">Commerce</option>
                    <option value="cs">Computer Science</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                  </select>
                </div>
                {/* Total Marks */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="sort-numeric-up" />
                  </span>
                  <MDBInput type="number" label="Total Marks"
                    name="totalMarks"
                    value={educationData.totalMarks}
                    onChange={handleEduChange} />
                </div>
                {/* Obtained Marks */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="check-circle" />
                  </span>
                  <MDBInput type="number" label="Obtained Marks"
                    name="obtainMarks"
                    value={educationData.obtainMarks}
                    onChange={handleEduChange} />
                </div>
                {/* Passing Year */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="calendar" />
                  </span>
                  <select className="form-select"
                    name="passingYear"
                    value={educationData.passingYear}
                    onChange={handleEduChange}>
                    <option value="">Select Passing Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = 2025 - i;
                      return <option key={year} value={year}>
                        {year}
                      </option>
                    })}
                  </select>
                </div>
                {/* ROll Number */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="id-card" />
                  </span>
                  <MDBInput type="text" label="Roll Number"
                    name="rollNo"
                    value={educationData.rollNo}
                    onChange={handleEduChange} />
                </div>
                {/* Board / University */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <MDBIcon fas icon="university" />
                  </span>
                  <select className="form-select"
                    name="boardUni"
                    value={educationData.boardUni}
                    onChange={handleEduChange}>
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
                    {/* add more boards/universities as needed */}
                  </select>
                </div>
                <MDBCol md="12">
                  <label className="form-label">Upload Marks Sheet/Result Card</label>
                  <MDBInputGroup className="mb-0">
                    <span className="input-group-text">
                      <MDBIcon fas icon="file-image" />
                    </span>
                    <input
                      type="file"
                      name='marksheet'
                      className="form-control"
                      accept='image/*'
                      onChange={handleMarkSheet}
                      required
                    />
                  </MDBInputGroup>
                </MDBCol>
              </MDBModalBody>


              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleOpen}>
                  Close
                </MDBBtn>
                <MDBBtn type="button" onClick={handleSave}>Submit</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        <MDBBtn className='me-1' type='button' onClick={onBack}>Back</MDBBtn>
        <MDBBtn className='me-1' type='submit'>Next</MDBBtn>
      </>
    </form>
  )
}

export default Step3