import React from 'react'
import { MDBRow, MDBCol, MDBInputGroup, MDBIcon,MDBBtn} from 'mdb-react-ui-kit'
import { useState } from 'react'
import { useEffect } from 'react'
const Step4 = ({onSubmit , onBack}) => {
      const [enrollmentInfo, setEnrollmentInfo] = useState({
    program: '',
    department: '',
    session: '',
    semester:'',
    shift: '',
    campus: '',
  })
   const handleEnrollment = (e) => {
    const { name, value } = e.target;
    setEnrollmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  useEffect(()=>{
    if(enrollmentInfo.program === "BS"){
      setEnrollmentInfo((prev)=>({
        ...prev,
        semester:"1st Semester",
      }))
    }
    else{
      setEnrollmentInfo((prev)=>({
        ...prev,
        semester:'',
      }))
    }

  },[enrollmentInfo.program])
  const submit = (e)=>{
    e.preventDefault();
    onSubmit(enrollmentInfo);
      console.log("Submitted Enrollment Info:", enrollmentInfo)
    setEnrollmentInfo({
       program: '',
    department: '',
    session: '',
    semester:'',
    shift: '',
    campus: '',
    })
  }
  return (
    <form onSubmit={submit}>
             <>
      <h4 className="mb-3 text-primary">Enrollment Details</h4>

      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Program Name *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="book-open" />
            </span>
            <select
              className="form-select"
              name="program"
              value={enrollmentInfo.program}
              onChange={handleEnrollment}
              required
            >
              <option value="" disabled>Select Program</option>
              <option value="BS">BS</option>
              <option value="ADP">ADP/ADS</option>
              <option value="MPhill">MPhil</option>
              <option value="PHD">PhD</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
         <MDBCol md='6'>
           <label className="form-label">Semester *</label>
             <MDBInputGroup className="mb-0">
              <span className="input-group-text">
                <MDBIcon fas icon="layer-group" />
              </span>
              <select
                className="form-select"
                name="semester"
                value={enrollmentInfo.semester}
                onChange={handleEnrollment}
                required
                disabled={enrollmentInfo.program === 'BS'} // disable for BS
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
            </MDBInputGroup>
          </MDBCol>
      

      </MDBRow>
      <MDBRow className="g-3 mb-4">
       <MDBCol md="6">
          <label className="form-label">Department *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="university" />
            </span>
            <select
              className="form-select"
              name="department"
              value={enrollmentInfo.department}
              onChange={handleEnrollment}
              required
            >
              <option value="" disabled>Select Department</option>

              {/* Computer & IT */}
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>

              {/* Engineering */}
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Biomedical Engineering">Biomedical Engineering</option>

              {/* Business & Management */}
              <option value="Business Admisistration">Business Administration (BBA)</option>
              <option value="Master of Business Administration">Master of Business Administration (MBA)</option>
              <option value="Accounting">Accounting & Finance</option>
              <option value="Economics">Economics</option>
              <option value="Commerce">Commerce</option>

              {/* Sciences */}
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Zoology">Zoology</option>
              <option value="Botany">Botany</option>

              {/* Medical */}
              <option value="BDS Dentistry">BDS (Dentistry)</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Nursing">Nursing</option>
              <option value="Physiotherapy">Physiotherapy</option>

              {/* Arts & Humanities */}
              <option value="English">English Literature</option>
              <option value="Urdu">Urdu</option>
              <option value="History">History</option>
              <option value="Islamic">Islamic Studies</option>
              <option value="PoliticalScience">Political Science</option>
              <option value="Sociology">Sociology</option>
              <option value="Psychology">Psychology</option>

              {/* Education */}
              <option value="Bachelor of Education">Bachelor of Education (B.Ed)</option>
              <option value="Master of Education">Master of Education (M.Ed)</option>

            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Shift *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="clock" />
            </span>
            <select
              className="form-select"
              name="shift"
              value={enrollmentInfo.shift}
              onChange={handleEnrollment}
              required
            >
              <option value="" disabled>Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-3 mb-4">
           <MDBCol md="6">
          <label className="form-label">Admission Session *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="calendar-alt" />
            </span>
            <select
              className="form-select"
              name="session"
              value={enrollmentInfo.session}
              onChange={handleEnrollment}
              required
            >
              <option value="" disabled>Select Session</option>
              <option value="Fall-2025">Fall 2025</option>
              <option value="Spring-2025">Spring 2025</option>
              <option value="Fall-2026">Fall 2026</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Campus *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="building" />
            </span>
            <select
              className="form-select"
              name="campus"
              value={enrollmentInfo.campus}
              onChange={handleEnrollment}
              required
            >
              <option value="" disabled>Select Campus</option>
              <option value="Main">Main Campus</option>
              <option value="City">City Campus</option>
              <option value="Other">Other</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
      <MDBBtn type='button' onClick={onBack}
      className='me-1'>Back</MDBBtn>
      <MDBBtn className='me-1' type='submit'>Submit</MDBBtn>
    </>
    </form>
  )
}

export default Step4