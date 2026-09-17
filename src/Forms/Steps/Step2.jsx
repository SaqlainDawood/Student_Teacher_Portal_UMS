import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import "./Step2.css";

const Step2 = ({ onSubmit, onBack, initialData, loading }) => {
  const [formData, setFormData] = useState({
    motherName: "",
    fatherName: "",
    fatherCnic: "",
    fatherMobile: "",
  });

  // Restore previously entered Step 2 data
  useEffect(() => {
    if (initialData) {
      setFormData({
        motherName: initialData.motherName || "",
        fatherName: initialData.fatherName || "",
        fatherCnic: initialData.fatherCnic || "",
        fatherMobile: initialData.fatherMobile || "",
      });
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.fatherName.trim()) {
      toast.error("Please enter Father's Name");
      return false;
    }

    if (formData.fatherCnic.trim()) {
      const cnic = formData.fatherCnic.trim();

      if (!/^(\d{13}|\d{5}-\d{7}-\d{1})$/.test(cnic)) {
        toast.error(
          "Father CNIC must be 13 digits or #####-#######-# format"
        );
        return false;
      }
    }

    if (formData.fatherMobile.trim()) {
      const mobile = formData.fatherMobile.trim();

      if (!/^03\d{9}$/.test(mobile)) {
        toast.error(
          "Father Mobile Number must be 11 digits and start with 03"
        );
        return false;
      }
    }

    return true;
  };

  // Submit Step 2
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanData = {
      fatherName: formData.fatherName.trim(),
      motherName: formData.motherName.trim(),
      fatherCnic: formData.fatherCnic.trim(),
      fatherMobile: formData.fatherMobile.trim(),
    };

    console.log("Step 2 form data:", cleanData);

    await onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit} className="step-form step2-form">
      {/* Header */}
      <div className="step2-header">
        <div className="step2-header-icon">
          <i className="fas fa-users"></i>
        </div>

        <div>
          <span className="step2-eyebrow">STEP 02</span>

          <h4 className="section-title">
            Family Information
          </h4>

          <p className="step2-subtitle">
            Provide your parents' information to complete your
            registration profile.
          </p>
        </div>
      </div>

      {/* Information Banner */}
      <div className="step2-info-banner">
        <div className="step2-info-icon">
          <i className="fas fa-info-circle"></i>
        </div>

        <div>
          <strong>Family Information</strong>
          <p>
            Father's name is required. CNIC and mobile number are
            optional but should be entered correctly if provided.
          </p>
        </div>
      </div>

      {/* Parent Information */}
      <div className="step2-section-card">
        <div className="step2-card-heading">
          <div className="step2-card-icon">
            <i className="fas fa-user-friends"></i>
          </div>

          <div>
            <h5>Parent Details</h5>
            <span>Basic information about your parents</span>
          </div>
        </div>

        <MDBRow className="g-4">
          {/* Mother */}
          <MDBCol md="6">
            <div className="luxury-input-group">
              <label>
                Mother's Full Name
              </label>

              <div className="input-icon-wrapper">
                <span className="input-icon">
                  <i className="fas fa-female"></i>
                </span>

                <input
                  type="text"
                  name="motherName"
                  placeholder="Enter mother's full name"
                  value={formData.motherName}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              <small className="input-helper">
                Enter your mother's complete name
              </small>
            </div>
          </MDBCol>

          {/* Father */}
          <MDBCol md="6">
            <div className="luxury-input-group">
              <label>
                Father's Full Name
                <span className="required-star">*</span>
              </label>

              <div className="input-icon-wrapper">
                <span className="input-icon">
                  <i className="fas fa-male"></i>
                </span>

                <input
                  type="text"
                  name="fatherName"
                  placeholder="Enter father's full name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  autoComplete="off"
                />
              </div>

              <small className="input-helper">
                Required for registration
              </small>
            </div>
          </MDBCol>

          {/* CNIC */}
          <MDBCol md="6">
            <div className="luxury-input-group">
              <label>Father's CNIC</label>

              <div className="input-icon-wrapper">
                <span className="input-icon">
                  <i className="fas fa-id-card"></i>
                </span>

                <input
                  type="text"
                  name="fatherCnic"
                  placeholder="12345-1234567-1"
                  value={formData.fatherCnic}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={15}
                  autoComplete="off"
                />
              </div>

              <small className="input-helper">
                Format: 12345-1234567-1
              </small>
            </div>
          </MDBCol>

          {/* Mobile */}
          <MDBCol md="6">
            <div className="luxury-input-group">
              <label>Father's Mobile Number</label>

              <div className="input-icon-wrapper">
                <span className="input-icon">
                  <i className="fas fa-mobile-alt"></i>
                </span>

                <input
                  type="tel"
                  name="fatherMobile"
                  placeholder="03011234567"
                  value={formData.fatherMobile}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={11}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>

              <small className="input-helper">
                Enter an 11-digit number starting with 03
              </small>
            </div>
          </MDBCol>
        </MDBRow>
      </div>

      {/* Privacy Note */}
      <div className="step2-security-note">
        <div className="security-icon">
          <i className="fas fa-shield-alt"></i>
        </div>

        <div>
          <strong>Your information is secure</strong>
          <p>
            The information provided here is used only for university
            registration and student records.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="btn-group-wrapper">
        <MDBBtn
          type="button"
          onClick={onBack}
          className="btn-back"
          disabled={loading}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back</span>
        </MDBBtn>

        <MDBBtn
          type="submit"
          className="btn-next"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Saving...
            </>
          ) : (
            <>
              <span>Next Step</span>
              <i className="fas fa-arrow-right"></i>
            </>
          )}
        </MDBBtn>
      </div>
    </form>
  );
};

export default Step2;