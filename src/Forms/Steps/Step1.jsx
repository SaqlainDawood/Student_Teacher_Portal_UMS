
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { FaSpinner } from "react-icons/fa";
import "./Step1.css";

const initialFormData = {
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
};

export default function Step1({ onSubmit, initialData = {}, loading = false }) {
  const [formData, setFormData] = useState(initialFormData);
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));

      if (initialData.profileImage?.url) {
        setProfilePreview(initialData.profileImage.url);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setProfile(null);
      setProfilePreview("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG or PNG images are allowed");
      e.target.value = "";
      return;
    }

    setProfile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phoneNo,
      presentAddress,
      permanentAddress,
      province,
      domicile,
      religion,
      gender,
      bloodGroup,
      DOB,
      maritalStatus,
      nationality,
      cnic,
    } = formData;

    // Required field validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNo.trim() ||
      !presentAddress.trim() ||
      !permanentAddress.trim() ||
      !province.trim() ||
      !domicile.trim() ||
      !religion ||
      !gender ||
      !bloodGroup ||
      !nationality ||
      !DOB ||
      !cnic.trim() ||
      !maritalStatus
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{11}$/;

    if (!phoneRegex.test(phoneNo.trim())) {
      toast.error("Phone number must be exactly 11 digits");
      return;
    }

    // CNIC validation
    // Backend StudentSchema requires exactly 13 digits.
    const cnicRegex = /^\d{13}$/;

    if (!cnicRegex.test(cnic.trim())) {
      toast.error("CNIC must be exactly 13 digits");
      return;
    }

    // Profile image validation
    if (!profile && !initialData?.profileImage?.url) {
      toast.error("Please upload a profile image");
      return;
    }

    // Create FormData for backend
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    if (profile) {
      fd.append("profileImage", profile);
    }

    // Plain object for frontend state / next step
    const plainData = {
      ...formData,
      profileImage: profile
        ? profile
        : initialData?.profileImage || null,
    };

    await onSubmit(fd, plainData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBRow className="g-3">

        {/* First Name */}
        <MDBCol md="6">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </MDBCol>

        {/* Last Name */}
        <MDBCol md="6">
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </MDBCol>

        {/* CNIC */}
        <MDBCol md="6">
          <label className="form-label">
            CNIC <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="cnic"
            className="form-control"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="Enter 13-digit CNIC"
            maxLength={13}
            inputMode="numeric"
          />
        </MDBCol>

        {/* Phone */}
        <MDBCol md="6">
          <label className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="phoneNo"
            className="form-control"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="03001234567"
            maxLength={11}
            inputMode="numeric"
          />
        </MDBCol>

        {/* Email */}
        <MDBCol md="6">
          <label className="form-label">
            Email <span className="text-danger">*</span>
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="ali@example.com"
          />
        </MDBCol>

        {/* Province */}
        <MDBCol md="6">
          <label className="form-label">
            Province <span className="text-danger">*</span>
          </label>

          <select
            name="province"
            className="form-select"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="">Select province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">
              Khyber Pakhtunkhwa
            </option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad Capital Territory">
              Islamabad Capital Territory
            </option>
            <option value="Gilgit-Baltistan">
              Gilgit-Baltistan
            </option>
            <option value="Azad Jammu and Kashmir">
              Azad Jammu and Kashmir
            </option>
          </select>
        </MDBCol>

        {/* Domicile */}
        <MDBCol md="6">
          <label className="form-label">
            Domicile <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="domicile"
            className="form-control"
            value={formData.domicile}
            onChange={handleChange}
            placeholder="Enter domicile"
          />
        </MDBCol>

        {/* DOB */}
        <MDBCol md="6">
          <label className="form-label">
            Date of Birth <span className="text-danger">*</span>
          </label>

          <input
            type="date"
            name="DOB"
            className="form-control"
            value={formData.DOB}
            onChange={handleChange}
          />
        </MDBCol>

        {/* Present Address */}
        <MDBCol md="6">
          <label className="form-label">
            Present Address <span className="text-danger">*</span>
          </label>

          <textarea
            name="presentAddress"
            className="form-control"
            value={formData.presentAddress}
            onChange={handleChange}
            placeholder="Enter present address"
            rows="3"
          />
        </MDBCol>

        {/* Permanent Address */}
        <MDBCol md="6">
          <label className="form-label">
            Permanent Address <span className="text-danger">*</span>
          </label>

          <textarea
            name="permanentAddress"
            className="form-control"
            value={formData.permanentAddress}
            onChange={handleChange}
            placeholder="Enter permanent address"
            rows="3"
          />
        </MDBCol>

        {/* Religion */}
        <MDBCol md="6">
          <label className="form-label">
            Religion <span className="text-danger">*</span>
          </label>

          <select
            name="religion"
            className="form-select"
            value={formData.religion}
            onChange={handleChange}
          >
            <option value="">Select religion</option>
            <option value="Islam">Islam</option>
            <option value="Christian">Christian</option>
            <option value="Hindu">Hindu</option>
            <option value="Sikh">Sikh</option>
            <option value="Other">Other</option>
          </select>
        </MDBCol>

        {/* Gender */}
        <MDBCol md="6">
          <label className="form-label">
            Gender <span className="text-danger">*</span>
          </label>

          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </MDBCol>

        {/* Blood Group */}
        <MDBCol md="6">
          <label className="form-label">
            Blood Group <span className="text-danger">*</span>
          </label>

          <select
            name="bloodGroup"
            className="form-select"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </MDBCol>

        {/* Marital Status */}
        <MDBCol md="6">
          <label className="form-label">
            Marital Status <span className="text-danger">*</span>
          </label>

          <select
            name="maritalStatus"
            className="form-select"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </MDBCol>

        {/* Nationality */}
        <MDBCol md="6">
          <label className="form-label">
            Nationality <span className="text-danger">*</span>
          </label>

          <select
            name="nationality"
            className="form-select"
            value={formData.nationality}
            onChange={handleChange}
          >
            <option value="">Select nationality</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Other">Other</option>
          </select>
        </MDBCol>

        {/* Profile Image */}
        <MDBCol md="6">
          <label className="form-label">
            Profile Image <span className="text-danger">*</span>
          </label>

          <input
            type="file"
            name="profileImage"
            className="form-control"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFile}
          />

          {profilePreview && (
            <div className="mt-3">
              <img
                src={profilePreview}
                alt="Profile Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}
        </MDBCol>

        {/* Submit */}
        <MDBCol md="12" className="mt-4">
          <MDBBtn
            type="submit"
            disabled={loading}
            className="px-4"
          >
            {loading ? (
              <>
                <FaSpinner
                  className="me-2"
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
                Saving...
              </>
            ) : (
              "Save & Continue"
            )}
          </MDBBtn>
        </MDBCol>
      </MDBRow>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </form>
  );
}