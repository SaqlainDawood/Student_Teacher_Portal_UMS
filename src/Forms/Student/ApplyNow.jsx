import React, { useState } from "react";
import axios from 'axios'
import {
  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBInputGroup, MDBIcon,
  MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBModal, MDBModalDialog, MDBModalContent,
  MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter,
} from "mdb-react-ui-kit";
import { toast } from 'react-toastify';
export default function RegistrationForm() {

  const [basicModal, setBasicModal] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    presentAddress: '',
    permanentAddress: '',
    province: '',
    domicile: '',
    religion: '',
    gender: '',
    bloodGroup: '',
    DOB: '',
    maritalStatus: '',
    nationality: '',
    cnic: '',
    uploadPic: null,
    motherName: '',
    fatherName: '',
    fatherCnic: '',
    fatherMobile: '',
  });

  const toggleOpen = () => setBasicModal(!basicModal);


  // Handle input change

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };
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

  // handle save button
 const handleSave = () => {
  // Ensure correct types before saving
  const newEducation = {
    ...educationData,
    totalMarks: Number(educationData.totalMarks) || 0,
    obtainMarks: Number(educationData.obtainMarks) || 0,
    percentage: educationData.percentage ? String(educationData.percentage) : "0",
  };

  // Add to list
  setEducationList((prev) => [...prev, newEducation]);

  // Clear input fields
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


  const [enrollmentInfo, setEnrollmentInfo] = useState({
    program: '',
    department: '',
    session: '',
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

  // const validatePersonalDetails = () => {
  //   const fields = {
  //     firstName: "Please enter First Name",
  //     lastName: "Please enter Last Name",
  //     email: "Please enter Email",
  //     phoneNo: "Please enter Phone Number",
  //     presentAddress: "Please enter Present Address",
  //     permanentAddress: "Please enter Permanent Address",
  //     province: "Please select Province",
  //     domicile: "Please select Domicile",
  //     religion: "Please select Religion",
  //     gender: "Please select Gender",
  //     bloodGroup: "Please select Blood Group",
  //     nationality: "Please select Nationality",
  //     DOB: "Enter Date of birth",
  //     cnic: "Please enter CNIC",
  //     uploadPic: "Please upload your Image",
  //   };

  //   // 🔹 Step 1: Empty fields check
  //   for (const [key, message] of Object.entries(fields)) {
  //     if (!formData[key]) {
  //       toast.error(message);
  //       return false;
  //     }
  //   }

  //   // 🔹 Step 2: Email validation (regex)
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(formData.email)) {
  //     toast.error("Please enter a valid Email");
  //     return false;
  //   }

  //   // 🔹 Step 3: Phone number validation (11 digits, only numbers)
  //   const phoneRegex = /^[0-9]{11}$/;
  //   if (!phoneRegex.test(formData.phoneNo)) {
  //     toast.error("Phone Number must be 11 digits");
  //     return false;
  //   }

  //   // 🔹 Step 4: CNIC validation (#####-#######-# or 13 digits)
  //   const cnicRegex = /^(\d{5}-\d{7}-\d{1}|\d{13})$/;
  //   if (!cnicRegex.test(formData.cnic)) {
  //     toast.error("CNIC must be 13 digits or #####-#######-# format");
  //     return false;
  //   }

  //   // 🔹 Step 5: Upload image validation (jpg, jpeg, png)
  //   // const allowedExtensions = ["jpg", "jpeg", "png"];
  //   // const fileExtension = formData.uploadPic?.name?.split(".").pop().toLowerCase();
  //   // if (!allowedExtensions.includes(fileExtension)) {
  //   //   toast.error("Only JPG, JPEG, and PNG images are allowed");
  //   //   return false;
  //   // }

  //   return true; // ✅ All checks passed
  // };


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      educationList.forEach((edu, index) => {
        for (const key in edu) {
          formDataToSend.append(`educationList[${index}][${key}]`, edu[key]);
        }
      });
      // Enrollment info (object)
    for (const key in enrollmentInfo) {
      formDataToSend.append(`enrollmentInfo[${key}]`, enrollmentInfo[key]);
    }
      const res = await axios.post("http://localhost:8000/api/students/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (res.status === 201) {
        toast.success('Student Regester Successfully')
        // console.log(res.data);
      }
    }
    catch (err) {
     console.error("Error submitting academic info:", err.response?.data || err.message);
  toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Step 1 - Personal Details
  const renderPersonalDetails = () => (
    <>
      <h4 className="mb-3 text-primary">Personal Details</h4>

      {/* First & Last Name */}
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">First Name</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="user" />
            </span>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>

        <MDBCol md="6">
          <label className="form-label">Last Name</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="user" />
            </span>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Email</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="envelope" />
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>

        <MDBCol md="6">
          <label className="form-label">Phone Number</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="phone" />
            </span>
            <input
              type="tel"
              className="form-control"
              name="phoneNo"
              placeholder="03xx-xxxxxxx"
              value={formData.phoneNo || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>


      {/* Present & Permanent Address with icons */}
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Present Address</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="map-marker-alt" />
            </span>
            <input
              type="text"
              className="form-control"
              name="presentAddress"
              placeholder="House/Street, Area, City"
              value={formData.presentAddress || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Permanent Address</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="home" />
            </span>
            <input
              type="text"
              className="form-control"
              name="permanentAddress"
              placeholder="House/Street, Area, City"
              value={formData.permanentAddress || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>



      {/* Province & Domicile dropdowns */}
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Province *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="map" />
            </span>
            <select
              className="form-select"
              name="province"
              value={formData.province || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select province</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Gilgit Baltistan">Gilgit Baltistan</option>
              <option value="Azad Kashmir">Azad Kashmir</option>
              <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
            </select>
          </MDBInputGroup>
        </MDBCol>

        <MDBCol md="6">
          <label className="form-label">Domicile *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="city" />
            </span>
            <select
              className="form-select"
              name="domicile"
              value={formData.domicile || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select domicile</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Gilgit Baltistan">Gilgit Baltistan</option>
              <option value="Azad Kashmir">Azad Kashmir</option>
              <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      {/* Religion & Gender dropdowns */}
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Religion *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="praying-hands" />
            </span>
            <select
              className="form-select"
              name="religion"
              value={formData.religion || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select religion</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Hindu">Hindu</option>
              <option value="Sikh">Sikh</option>
              <option value="Other">Other</option>
            </select>
          </MDBInputGroup>
        </MDBCol>

        <MDBCol md="6">
          <label className="form-label">Gender *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="venus-mars" />
            </span>
            <select
              className="form-select"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      {/* Blood Group & Nationality dropdowns */}
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Blood Group *</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="tint" />
            </span>
            <select
              className="form-select"
              name="bloodGroup"
              value={formData.bloodGroup || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Nationality</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="flag" />
            </span>
            <select
              className="form-select"
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleChange}
            >
              <option value="" disabled>Select nationality</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Other">Other</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Student CNIC</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="user" />
            </span>
            <input
              type="number"
              className="form-control"
              name="cnic"
              placeholder="Enter your CNIC"
              value={formData.cnic || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Upload Image</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="cloud-upload-alt" size="2x" />
            </span>
            <input
              type="file"
              className="form-control"
              name="uploadPic"
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Date of Birth</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="calendar-alt" />
            </span>
            <input
              type="date"
              className="form-control"
              name="DOB"
              value={formData.DOB || ""}
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
    </>
  );

  // Step 2 - Family Details
  const renderFamilyDetails = () => (

    <>
      <h4 className="mb-3 text-primary">Family Details</h4>
      <MDBRow className="g-3 mb-4">
        <MDBCol md="6">
          <label className="form-label">Mother Name</label>
          <MDBInput
            label="Mother Name"
            name="motherName"
            value={formData.motherName || ""}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Father Name</label>
          <MDBInput
            label="Father Name *"
            name="fatherName"
            value={formData.fatherName || ""}
            onChange={handleChange}
            required
          />
        </MDBCol>
      </MDBRow>

      {/* Father CNIC & Mobile with icons */}
      <MDBRow className="g-3 mb-2">
        <MDBCol md="6">
          <label className="form-label">Father CNIC</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="id-card" />
            </span>
            <input
              type="text"
              className="form-control"
              name="fatherCnic"
              placeholder="xxxxx-xxxxxxx-x"
              inputMode="numeric"
              pattern="[0-9\-]*"
              value={formData.fatherCnic || ""}
              onChange={handleChange}
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md="6">
          <label className="form-label">Father Mobile No</label>
          <MDBInputGroup className="mb-0">
            <span className="input-group-text">
              <MDBIcon fas icon="mobile-alt" />
            </span>
            <input
              type="tel"
              className="form-control"
              name="fatherMobile"
              placeholder="03xx-xxxxxxx"
              value={formData.fatherMobile || ""}
              onChange={handleChange}
            />
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
    </>
  );

  // Step 3 - Acedmic Details
  const renderAcedmicDetails = () => (
    <>
      <h4 className="mb-3 text-primary">Academic Details</h4>
      <div style={{ overflowX: 'auto' }}>
        <MDBTable align="middle" responsive>
          <MDBTableHead>
            <tr className="table-dark">
              <th scope='col' style={{ whiteSpace: 'nowrap' }} >Add Education Details</th>
              <th style={{ whiteSpace: "nowrap" }}> <MDBBtn size="sm" onClick={toggleOpen}>
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
              <th scope="col" style={{ whiteSpace: "nowrap" }}> Passing Year</th>
              <th scope='col' style={{ whiteSpace: 'nowrap' }}>Roll No</th>
              <th scope='col' style={{ whiteSpace: "nowrap" }}>Board/University</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {educationList.map((edu, index) => (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>{edu.degreeLevel}</td>
                <td>{edu.qualification}</td>
                <td>{edu.totalMarks}</td>
                <td>{edu.obtainMarks}</td>
                <td>{edu.percentage}%</td>
                <td>{edu.passingYear}</td>
                <td>{edu.rollNo}</td>
                <td>{edu.boardUni}</td>
              </tr>
            ))

            }
          </MDBTableBody>
        </MDBTable>
      </div>
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
                  <option value="Inter-Part-1">Intermediate Part II</option>
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
                  <option value="biselahore">BISE Lahore</option>
                  <option value="bisemultan">BISE Multan</option>
                  <option value="bisefaisalabad">BISE Faisalabad</option>
                  <option value="bisekarachi">BISE Karachi</option>
                  <option value="punjabuni">University of the Punjab</option>
                  <option value="bzu">BZU Multan</option>
                  <option value="uol">University of Lahore</option>
                  <option value="numl">NUML</option>
                  <option value="fast">FAST NUCES</option>
                  <option value="nust">NUST</option>
                  <option value="qau">Quaid-i-Azam University</option>
                  <option value="uet">UET Lahore</option>
                  <option value="comsats">COMSATS</option>
                  <option value="gcu">GCU Lahore</option>
                  <option value="iiui">IIUI</option>
                  {/* add more boards/universities as needed */}
                </select>
              </div>
            </MDBModalBody>


            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSave}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );

  // Step 4 - Enrollment Details
  const renderEnrollment = () => (
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
              <option value="MS">MS</option>
              <option value="MPhil">MPhil</option>
              <option value="PhD">PhD</option>
            </select>
          </MDBInputGroup>
        </MDBCol>

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
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="SE">Software Engineering</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="DS">Data Science</option>
              <option value="CyberSec">Cyber Security</option>

              {/* Engineering */}
              <option value="Electrical">Electrical Engineering</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Chemical">Chemical Engineering</option>
              <option value="Biomedical">Biomedical Engineering</option>

              {/* Business & Management */}
              <option value="BBA">Business Administration (BBA)</option>
              <option value="MBA">Master of Business Administration (MBA)</option>
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
              <option value="BDS">BDS (Dentistry)</option>
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
              <option value="BEd">Bachelor of Education (B.Ed)</option>
              <option value="MEd">Master of Education (M.Ed)</option>

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
    </>
  );


  return (
    <MDBContainer className="py-5">
      <header className="mb-4">
        <h2 className="text-center text-dark">Registration Form</h2>
      </header>

      {/* =========This is the Progress Bar============ */}
      <MDBRow className="mb-5 step-progress">
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <h6>Personal Details</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <h6>Family Details</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <h6>Academic Info</h6>
          </div>
        </MDBCol>
        <MDBCol size="md-3">
          <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
            <span className="step-number">4</span>
            <h6>Enrollment</h6>
          </div>
        </MDBCol>
      </MDBRow>


      <form encType="multipart/form-data" onSubmit={handleSubmit}>

        {step === 1 && renderPersonalDetails()}
        {step === 2 && renderFamilyDetails()}
        {step === 3 && renderAcedmicDetails()}
        {step === 4 && renderEnrollment()}

        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <MDBBtn
              color="secondary"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </MDBBtn>
          )}

          {step < 4 ? (
            <MDBBtn
              color="primary"
              type="button"
              onClick={() => setStep(step + 1)}
            // onClick={() => {

            //   if (step === 1) {
            //     if (validatePersonalDetails()) {
            //       setStep(step + 1);
            //     }
            //   } else {
            //     setStep(step + 1);
            //   }
            // }}
            >
              Next
            </MDBBtn>
          ) : (
            <MDBBtn color="success" type="submit">
              Submit
            </MDBBtn>
          )}
        </div>

      </form>
    </MDBContainer>
  );
}
