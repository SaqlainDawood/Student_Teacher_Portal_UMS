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
      setFormData((prev) => ({ ...prev, ...initialData }));
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
    };

    for (const [key, message] of Object.entries(fields)) {
      if (!formData[key]) {
        toast.error(message);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Email");
      return false;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phoneNo)) {
      toast.error("Phone Number must be 11 digits");
      return false;
    }

    const cnicRegex = /^(\d{5}-\d{7}-\d{1}|\d{13})$/;
    if (!cnicRegex.test(formData.cnic)) {
      toast.error("CNIC must be 13 digits or #####-#######-# format");
      return false;
    }

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
      <h4 className="section-title">📋 Personal Details</h4>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>First Name *</label>
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
            <label>Last Name *</label>
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

      {/* Continue with all form fields using the same luxury styling pattern */}
      {/* ... (rest of your form fields with the new CSS classes) */}

      <MDBBtn type="submit" className="btn-next" disabled={loading}>
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Next Step →"}
      </MDBBtn>
    </form>
  );
};

export default Step1;