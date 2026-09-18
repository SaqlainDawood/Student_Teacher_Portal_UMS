import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  FaArrowRight,
  FaCheckCircle,
  FaIdCard,
  FaImage,
  FaMapMarkerAlt,
  FaSpinner,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./Step1.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  cnic: "",
  phoneNo: "",
  email: "",
  presentAddress: "",
  permanentAddress: "",
  religion: "",
  gender: "",
  bloodGroup: "",
  maritalStatus: "",
  nationality: "",
  DOB: "",
  province: "",
  domicile: "",
};

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const nameRegex = /^[A-Za-z\s'-]+$/;
const cnicRegex = /^\d{13}$/;
const phoneRegex = /^03\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Step1({
  initialData = {},
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialData,
  });

  const [profileImage, setProfileImage] = useState(
    initialData?.profileImage instanceof File
      ? initialData.profileImage
      : null
  );

  const [imagePreview, setImagePreview] = useState(
    typeof initialData?.profileImage === "string"
      ? initialData.profileImage
      : initialData?.profileImage?.url || null
  );

  const [errors, setErrors] = useState({});

  // ==========================================
  // Normal inputs
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // Select inputs
  // ==========================================

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // CNIC
  // ==========================================

  const handleCnicChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 13);

    setFormData((prev) => ({
      ...prev,
      cnic: value,
    }));

    if (errors.cnic) {
      setErrors((prev) => ({
        ...prev,
        cnic: "",
      }));
    }
  };

  // ==========================================
  // Phone
  // ==========================================

  const handlePhoneChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 11);

    setFormData((prev) => ({
      ...prev,
      phoneNo: value,
    }));

    if (errors.phoneNo) {
      setErrors((prev) => ({
        ...prev,
        phoneNo: "",
      }));
    }
  };

  // ==========================================
  // Profile Image
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ];

    const fileExtension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const isValidType =
      ALLOWED_IMAGE_TYPES.includes(file.type) &&
      allowedExtensions.includes(fileExtension);

    if (!isValidType) {
      setProfileImage(null);
      setImagePreview(null);

      setErrors((prev) => ({
        ...prev,
        profileImage:
          "Invalid file. Only JPG, JPEG, PNG or WEBP images are allowed.",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setProfileImage(null);
      setImagePreview(null);

      setErrors((prev) => ({
        ...prev,
        profileImage:
          "Profile image must be less than 5MB.",
      }));

      e.target.value = "";
      return;
    }

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  // ==========================================
  // Validation
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    const firstName = formData.firstName?.trim() || "";
    const lastName = formData.lastName?.trim() || "";
    const cnic = formData.cnic?.trim() || "";
    const phoneNo = formData.phoneNo?.trim() || "";
    const email = formData.email?.trim() || "";
    const presentAddress =
      formData.presentAddress?.trim() || "";
    const permanentAddress =
      formData.permanentAddress?.trim() || "";
    const religion = formData.religion?.trim() || "";
    const gender = formData.gender?.trim() || "";
    const bloodGroup =
      formData.bloodGroup?.trim() || "";
    const maritalStatus =
      formData.maritalStatus?.trim() || "";
    const nationality =
      formData.nationality?.trim() || "";
    const DOB = formData.DOB?.trim() || "";
    const province = formData.province?.trim() || "";
    const domicile = formData.domicile?.trim() || "";

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (firstName.length < 2) {
      newErrors.firstName =
        "First name must contain at least 2 characters.";
    } else if (firstName.length > 50) {
      newErrors.firstName =
        "First name cannot exceed 50 characters.";
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName =
        "First name can only contain letters, spaces, apostrophe or hyphen.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (lastName.length < 2) {
      newErrors.lastName =
        "Last name must contain at least 2 characters.";
    } else if (lastName.length > 50) {
      newErrors.lastName =
        "Last name cannot exceed 50 characters.";
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName =
        "Last name can only contain letters, spaces, apostrophe or hyphen.";
    }

    if (!cnic) {
      newErrors.cnic = "CNIC is required.";
    } else if (!cnicRegex.test(cnic)) {
      newErrors.cnic =
        "CNIC must contain exactly 13 digits.";
    }

    if (!phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!phoneRegex.test(phoneNo)) {
      newErrors.phoneNo =
        "Phone number must be 11 digits and start with 03.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!presentAddress) {
      newErrors.presentAddress =
        "Present address is required.";
    } else if (presentAddress.length < 5) {
      newErrors.presentAddress =
        "Present address must contain at least 5 characters.";
    } else if (presentAddress.length > 300) {
      newErrors.presentAddress =
        "Present address cannot exceed 300 characters.";
    }

    if (!permanentAddress) {
      newErrors.permanentAddress =
        "Permanent address is required.";
    } else if (permanentAddress.length < 5) {
      newErrors.permanentAddress =
        "Permanent address must contain at least 5 characters.";
    } else if (permanentAddress.length > 300) {
      newErrors.permanentAddress =
        "Permanent address cannot exceed 300 characters.";
    }

    if (!religion) {
      newErrors.religion = "Please select religion.";
    }

    if (!gender) {
      newErrors.gender = "Please select gender.";
    }

    if (!bloodGroup) {
      newErrors.bloodGroup =
        "Please select blood group.";
    }

    if (!maritalStatus) {
      newErrors.maritalStatus =
        "Please select marital status.";
    }

    if (!nationality) {
      newErrors.nationality =
        "Nationality is required.";
    } else if (nationality.length < 2) {
      newErrors.nationality =
        "Please enter a valid nationality.";
    }

    if (!DOB) {
      newErrors.DOB =
        "Date of birth is required.";
    } else {
      const dobDate = new Date(DOB);
      const today = new Date();

      if (Number.isNaN(dobDate.getTime())) {
        newErrors.DOB =
          "Please enter a valid date of birth.";
      } else if (dobDate > today) {
        newErrors.DOB =
          "Date of birth cannot be in the future.";
      }
    }

    if (!province) {
      newErrors.province =
        "Province is required.";
    }

    if (!domicile) {
      newErrors.domicile =
        "Domicile is required.";
    }

    if (!profileImage) {
      newErrors.profileImage =
        "Profile image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      toast.error(
        "Please correct the highlighted fields."
      );
      return;
    }

    const cleanData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      cnic: formData.cnic.trim(),
      phoneNo: formData.phoneNo.trim(),
      email: formData.email.trim().toLowerCase(),
      presentAddress:
        formData.presentAddress.trim(),
      permanentAddress:
        formData.permanentAddress.trim(),
      religion: formData.religion.trim(),
      gender: formData.gender.trim(),
      bloodGroup: formData.bloodGroup.trim(),
      maritalStatus:
        formData.maritalStatus.trim(),
      nationality:
        formData.nationality.trim(),
      DOB: formData.DOB,
      province: formData.province.trim(),
      domicile: formData.domicile.trim(),
    };

    const fd = new FormData();

    if (profileImage instanceof File) {
      fd.append(
        "profileImage",
        profileImage
      );
    }

    try {
      await onSubmit(fd, cleanData);
    } catch (error) {
      console.error(
        "Step 1 submit error:",
        error
      );
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <div className="step1-error">
        {errors[field]}
      </div>
    ) : null;

  return (
    <MDBContainer className="step1-container py-4">
      <MDBCard className="step1-card border-0">
        <MDBCardBody className="p-0">

          {/* ============================= */}
          {/* Header */}
          {/* ============================= */}

          <div className="step1-header">
            <div className="step1-header-icon">
              <FaUser />
            </div>

            <div>
              <div className="step1-step-label">
                STEP 1 OF 4
              </div>

              <h3>Personal Information</h3>

              <p>
                Please provide your personal
                information accurately.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="step1-form"
          >

            {/* ============================= */}
            {/* Personal Details */}
            {/* ============================= */}

            <div className="step1-section">
              <div className="step1-section-heading">
                <div className="step1-section-icon">
                  <FaUser />
                </div>

                <div>
                  <h5>Personal Details</h5>
                  <span>
                    Basic information about the student
                  </span>
                </div>
              </div>

              <MDBRow className="g-3">

                <MDBCol md="6">
                  <label className="step1-label">
                    First Name <span>*</span>
                  </label>

                  <MDBInput
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    type="text"
                    maxLength={50}
                    autoComplete="given-name"
                    placeholder="Enter first name"
                  />

                  {renderError("firstName")}
                </MDBCol>

                <MDBCol md="6">
                  <label className="step1-label">
                    Last Name <span>*</span>
                  </label>

                  <MDBInput
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    type="text"
                    maxLength={50}
                    autoComplete="family-name"
                    placeholder="Enter last name"
                  />

                  {renderError("lastName")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    CNIC <span>*</span>
                  </label>

                  <MDBInput
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleCnicChange}
                    disabled={loading}
                    type="text"
                    inputMode="numeric"
                    maxLength={13}
                    placeholder="3520212345671"
                  />

                  {renderError("cnic")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Phone Number <span>*</span>
                  </label>

                  <MDBInput
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handlePhoneChange}
                    disabled={loading}
                    type="text"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="03001234567"
                  />

                  {renderError("phoneNo")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Email <span>*</span>
                  </label>

                  <MDBInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    type="email"
                    autoComplete="email"
                    maxLength={100}
                    placeholder="student@example.com"
                  />

                  {renderError("email")}
                </MDBCol>

              </MDBRow>
            </div>

            {/* ============================= */}
            {/* Address */}
            {/* ============================= */}

            <div className="step1-section">
              <div className="step1-section-heading">
                <div className="step1-section-icon">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h5>Address Information</h5>
                  <span>
                    Current and permanent residential details
                  </span>
                </div>
              </div>

              <MDBRow className="g-3">

                <MDBCol md="6">
                  <label className="step1-label">
                    Present Address <span>*</span>
                  </label>

                  <MDBTextArea
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    disabled={loading}
                    rows={4}
                    maxLength={300}
                    placeholder="Enter present residential address"
                  />

                  {renderError("presentAddress")}
                </MDBCol>

                <MDBCol md="6">
                  <label className="step1-label">
                    Permanent Address <span>*</span>
                  </label>

                  <MDBTextArea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    disabled={loading}
                    rows={4}
                    maxLength={300}
                    placeholder="Enter permanent residential address"
                  />

                  {renderError("permanentAddress")}
                </MDBCol>

              </MDBRow>
            </div>

            {/* ============================= */}
            {/* Additional Information */}
            {/* ============================= */}

            <div className="step1-section">
              <div className="step1-section-heading">
                <div className="step1-section-icon">
                  <FaIdCard />
                </div>

                <div>
                  <h5>Additional Information</h5>
                  <span>
                    Personal and demographic information
                  </span>
                </div>
              </div>

              <MDBRow className="g-3">

                <MDBCol md="6">
                  <label className="step1-label">
                    Religion <span>*</span>
                  </label>

                  <select
                    className="step1-select"
                    name="religion"
                    value={formData.religion}
                    onChange={handleSelectChange}
                    disabled={loading}
                  >
                    <option value="">
                      Select Religion
                    </option>
                    <option value="Islam">
                      Islam
                    </option>
                    <option value="Christianity">
                      Christianity
                    </option>
                    <option value="Hinduism">
                      Hinduism
                    </option>
                    <option value="Sikhism">
                      Sikhism
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {renderError("religion")}
                </MDBCol>

                <MDBCol md="6">
                  <label className="step1-label">
                    Gender <span>*</span>
                  </label>

                  <select
                    className="step1-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange}
                    disabled={loading}
                  >
                    <option value="">
                      Select Gender
                    </option>
                    <option value="Male">
                      Male
                    </option>
                    <option value="Female">
                      Female
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {renderError("gender")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Blood Group <span>*</span>
                  </label>

                  <select
                    className="step1-select"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleSelectChange}
                    disabled={loading}
                  >
                    <option value="">
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>

                  {renderError("bloodGroup")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Marital Status <span>*</span>
                  </label>

                  <select
                    className="step1-select"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleSelectChange}
                    disabled={loading}
                  >
                    <option value="">
                      Select Marital Status
                    </option>
                    <option value="Single">
                      Single
                    </option>
                    <option value="Married">
                      Married
                    </option>
                    <option value="Divorced">
                      Divorced
                    </option>
                    <option value="Widowed">
                      Widowed
                    </option>
                  </select>

                  {renderError("maritalStatus")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Nationality <span>*</span>
                  </label>

                  <MDBInput
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    disabled={loading}
                    type="text"
                    maxLength={50}
                    placeholder="Pakistani"
                  />

                  {renderError("nationality")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Date of Birth <span>*</span>
                  </label>

                  <MDBInput
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    disabled={loading}
                    type="date"
                    max={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                  />

                  {renderError("DOB")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Province <span>*</span>
                  </label>

                  <select
                    className="step1-select"
                    name="province"
                    value={formData.province}
                    onChange={handleSelectChange}
                    disabled={loading}
                  >
                    <option value="">
                      Select Province
                    </option>
                    <option value="Punjab">
                      Punjab
                    </option>
                    <option value="Sindh">
                      Sindh
                    </option>
                    <option value="Khyber Pakhtunkhwa">
                      Khyber Pakhtunkhwa
                    </option>
                    <option value="Balochistan">
                      Balochistan
                    </option>
                    <option value="Islamabad Capital Territory">
                      Islamabad Capital Territory
                    </option>
                    <option value="Gilgit-Baltistan">
                      Gilgit-Baltistan
                    </option>
                    <option value="Azad Jammu & Kashmir">
                      Azad Jammu & Kashmir
                    </option>
                  </select>

                  {renderError("province")}
                </MDBCol>

                <MDBCol md="4">
                  <label className="step1-label">
                    Domicile <span>*</span>
                  </label>

                  <MDBInput
                    name="domicile"
                    value={formData.domicile}
                    onChange={handleChange}
                    disabled={loading}
                    type="text"
                    maxLength={100}
                    placeholder="Multan"
                  />

                  {renderError("domicile")}
                </MDBCol>

              </MDBRow>
            </div>

            {/* ============================= */}
            {/* Profile Image */}
            {/* ============================= */}

            <div className="step1-section">
              <div className="step1-section-heading">
                <div className="step1-section-icon">
                  <FaImage />
                </div>

                <div>
                  <h5>Profile Photo</h5>
                  <span>
                    Upload a clear recent profile photograph
                  </span>
                </div>
              </div>

              <div className="step1-upload-box">

                <div className="step1-avatar-area">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="step1-avatar-preview"
                    />
                  ) : (
                    <div className="step1-avatar-placeholder">
                      <FaUserCircle />
                    </div>
                  )}
                </div>

                <div className="step1-upload-content">
                  <label className="step1-label">
                    Profile Image <span>*</span>
                  </label>

                  <MDBFile
                    label="Choose profile image"
                    onChange={handleImageChange}
                    disabled={loading}
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  />

                  <div className="step1-upload-help">
                    JPG, JPEG, PNG or WEBP • Maximum 5MB
                  </div>

                  {errors.profileImage && (
                    <div className="step1-error">
                      {errors.profileImage}
                    </div>
                  )}

                  {imagePreview && (
                    <div className="step1-photo-status">
                      <FaCheckCircle />
                      Profile photo selected
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* ============================= */}
            {/* Footer */}
            {/* ============================= */}

            <div className="step1-footer">
              <div className="step1-required-note">
                <span>*</span> Required fields
              </div>

              <MDBBtn
                type="submit"
                disabled={loading}
                className="step1-next-btn"
              >
                {loading ? (
                  <>
                    <FaSpinner className="step1-spinner me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Continue
                    <FaArrowRight className="ms-2" />
                  </>
                )}
              </MDBBtn>
            </div>

          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}