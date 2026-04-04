import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "./Step1.css";

const Step1 = ({ onSubmit, loading, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    presentAddress: "",
    permanentAddress: "",
    province: "",
    domicile: "",
    religion: "",
    gender: "",
    bloodGroup: "",
    DOB: "",
    maritalStatus: "",
    nationality: "",
    cnic: "",
  });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    setProfile(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validatePersonalDetails()) {
      return;
    }

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      fd.append(key, formData[key]);
    });
    if (profile) {
      fd.append("profileImage", profile);
    }
    const plainData = { ...formData };
    onSubmit(fd, plainData);
  };

  const validatePersonalDetails = () => {
    const fields = {
      firstName: "Please enter First Name",
      lastName: "Please enter Last Name",
      email: "Please enter Email",
      phoneNo: "Please enter Phone Number",
      presentAddress: "Please enter Present Address",
      permanentAddress: "Please enter Permanent Address",
      province: "Please select Province",
      domicile: "Please select Domicile",
      religion: "Please select Religion",
      gender: "Please select Gender",
      bloodGroup: "Please select Blood Group",
      nationality: "Please select Nationality",
      DOB: "Enter Date of birth",
      cnic: "Please enter CNIC",
      maritalStatus: "Please select Marital Status",
    };

    // Step 1: Empty fields check
    for (const [key, message] of Object.entries(fields)) {
      if (!formData[key]) {
        toast.error(message);
        return false;
      }
    }

    // Step 2: Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Email");
      return false;
    }

    // Step 3: Phone number validation
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phoneNo)) {
      toast.error("Phone Number must be 11 digits");
      return false;
    }

    // Step 4: CNIC validation
    const cnicRegex = /^(\d{5}-\d{7}-\d{1}|\d{13})$/;
    if (!cnicRegex.test(formData.cnic)) {
      toast.error("CNIC must be 13 digits or #####-#######-# format");
      return false;
    }

    // Step 5: Upload image validation
    if (!profile) {
      toast.error("Please upload your profile image");
      return false;
    }
    
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = profile.name?.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only JPG, JPEG, and PNG images are allowed");
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={submit} className="step-form">
      <h4 className="section-title">
        <i className="fas fa-user-circle"></i> Personal Details
      </h4>

      {/* First & Last Name */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>First Name <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Last Name <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Email & Phone Number */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Email Address <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Phone Number <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-phone-alt"></i>
              <input
                type="tel"
                name="phoneNo"
                placeholder="03xx-xxxxxxx"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Present & Permanent Address */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Present Address <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                name="presentAddress"
                placeholder="House/Street, Area, City"
                value={formData.presentAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Permanent Address <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-home"></i>
              <input
                type="text"
                name="permanentAddress"
                placeholder="House/Street, Area, City"
                value={formData.permanentAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Province & Domicile */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Province <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-map"></i>
              <select
                name="province"
                value={formData.province}
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
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Domicile <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-city"></i>
              <select
                name="domicile"
                value={formData.domicile}
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
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Religion & Gender */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Religion <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-praying-hands"></i>
              <select
                name="religion"
                value={formData.religion}
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
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Gender <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-venus-mars"></i>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Blood Group & Nationality */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Blood Group <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-tint"></i>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
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
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Nationality <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-flag"></i>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select nationality</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* CNIC & Date of Birth */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>CNIC Number <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                name="cnic"
                placeholder="12345-1234567-1 or 1234512345671"
                value={formData.cnic}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Date of Birth <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-calendar-alt"></i>
              <input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Marital Status & Profile Image */}
      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Marital Status <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-heart"></i>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Profile Image <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-cloud-upload-alt"></i>
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleFile}
                required
              />
            </div>
            {profile && (
              <div className="file-preview">
                <i className="fas fa-check-circle"></i> {profile.name}
              </div>
            )}
          </div>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="btn-next" disabled={loading}>
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Saving...
          </>
        ) : (
          <>
            Next Step <i className="fas fa-arrow-right"></i>
          </>
        )}
      </MDBBtn>
    </form>
  );
};

export default Step1;