import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "./Step2.css";

const Step2 = ({ onSubmit, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    motherName: "",
    fatherName: "",
    fatherCnic: "",
    fatherMobile: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.fatherName) {
      toast.error("Please enter Father Name");
      return false;
    }
    if (formData.fatherCnic && !/^(\d{5}-\d{7}-\d{1}|\d{13})$/.test(formData.fatherCnic)) {
      toast.error("Father CNIC must be 13 digits or #####-#######-# format");
      return false;
    }
    if (formData.fatherMobile && !/^[0-9]{11}$/.test(formData.fatherMobile)) {
      toast.error("Father Mobile Number must be 11 digits");
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={submit} className="step-form">
      <h4 className="section-title">
        <i className="fas fa-users"></i> Family Details
      </h4>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Mother's Full Name</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-female"></i>
              <input
                type="text"
                name="motherName"
                placeholder="Enter mother's full name"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Father's Full Name <span className="required-star">*</span></label>
            <div className="input-icon-wrapper">
              <i className="fas fa-male"></i>
              <input
                type="text"
                name="fatherName"
                placeholder="Enter father's full name"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="g-4 mb-4">
        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Father's CNIC</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                name="fatherCnic"
                placeholder="12345-1234567-1"
                value={formData.fatherCnic}
                onChange={handleChange}
              />
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="luxury-input-group">
            <label>Father's Mobile Number</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-mobile-alt"></i>
              <input
                type="tel"
                name="fatherMobile"
                placeholder="03xx-xxxxxxx"
                value={formData.fatherMobile}
                onChange={handleChange}
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="btn-group-wrapper">
        <MDBBtn type="button" onClick={onBack} className="btn-back">
          <i className="fas fa-arrow-left"></i> Back
        </MDBBtn>
        <MDBBtn type="submit" className="btn-next">
          Next Step <i className="fas fa-arrow-right"></i>
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step2;