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
  MDBSelect,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

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
  // Handle normal inputs
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
  // Handle Select
  // ==========================================
  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // ==========================================
  // Handle CNIC
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
  // Handle Phone
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
  // Handle Profile Image
  // ==========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profileImage:
          "Only JPG, JPEG, PNG or WEBP image is allowed.",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
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

    // ------------------------------------------
    // First Name
    // ------------------------------------------
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

    // ------------------------------------------
    // Last Name
    // ------------------------------------------
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

    // ------------------------------------------
    // CNIC
    // ------------------------------------------
    if (!cnic) {
      newErrors.cnic = "CNIC is required.";
    } else if (!cnicRegex.test(cnic)) {
      newErrors.cnic =
        "CNIC must contain exactly 13 digits.";
    }

    // ------------------------------------------
    // Phone
    // ------------------------------------------
    if (!phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!phoneRegex.test(phoneNo)) {
      newErrors.phoneNo =
        "Phone number must be 11 digits and start with 03.";
    }

    // ------------------------------------------
    // Email
    // ------------------------------------------
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // ------------------------------------------
    // Present Address
    // ------------------------------------------
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

    // ------------------------------------------
    // Permanent Address
    // ------------------------------------------
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

    // ------------------------------------------
    // Religion
    // ------------------------------------------
    if (!religion) {
      newErrors.religion = "Please select religion.";
    }

    // ------------------------------------------
    // Gender
    // ------------------------------------------
    if (!gender) {
      newErrors.gender = "Please select gender.";
    }

    // ------------------------------------------
    // Blood Group
    // ------------------------------------------
    if (!bloodGroup) {
      newErrors.bloodGroup =
        "Please select blood group.";
    }

    // ------------------------------------------
    // Marital Status
    // ------------------------------------------
    if (!maritalStatus) {
      newErrors.maritalStatus =
        "Please select marital status.";
    }

    // ------------------------------------------
    // Nationality
    // ------------------------------------------
    if (!nationality) {
      newErrors.nationality =
        "Nationality is required.";
    } else if (nationality.length < 2) {
      newErrors.nationality =
        "Please enter a valid nationality.";
    }

    // ------------------------------------------
    // DOB
    // ------------------------------------------
    if (!DOB) {
      newErrors.DOB = "Date of birth is required.";
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

    // ------------------------------------------
    // Province
    // ------------------------------------------
    if (!province) {
      newErrors.province = "Province is required.";
    }

    // ------------------------------------------
    // Domicile
    // ------------------------------------------
    if (!domicile) {
      newErrors.domicile = "Domicile is required.";
    }

    // ------------------------------------------
    // Profile Image
    // ------------------------------------------
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

    // ------------------------------------------
    // Clean data
    // ------------------------------------------
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

    /*
      IMPORTANT:

      profileImage ko cleanData mein nahi rakha.
      Parent MultiPartForm is file ko exactly ONE time
      FormData mein append karega.
    */

    const fd = new FormData();

    if (profileImage instanceof File) {
      fd.append("profileImage", profileImage);
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

  return (
    <MDBContainer className="py-4">
      <MDBCard className="shadow-sm border-0">
        <MDBCardBody className="p-4">

          {/* =================================
              Header
          ================================= */}
          <div className="mb-4">
            <h3 className="fw-bold mb-1">
              Personal Information
            </h3>

            <p className="text-muted mb-0">
              Please provide your personal information
              accurately.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* =================================
                First Name / Last Name
            ================================= */}
            <MDBRow className="g-3">

              <MDBCol md="6">
                <MDBInput
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  type="text"
                  maxLength={50}
                  autoComplete="given-name"
                />

                {errors.firstName && (
                  <div className="text-danger small mt-1">
                    {errors.firstName}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  type="text"
                  maxLength={50}
                  autoComplete="family-name"
                />

                {errors.lastName && (
                  <div className="text-danger small mt-1">
                    {errors.lastName}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                CNIC / Phone / Email
            ================================= */}
            <MDBRow className="g-3 mt-1">

              <MDBCol md="4">
                <MDBInput
                  label="CNIC *"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleCnicChange}
                  disabled={loading}
                  type="text"
                  inputMode="numeric"
                  maxLength={13}
                  placeholder="1234567890127"
                />

                {errors.cnic && (
                  <div className="text-danger small mt-1">
                    {errors.cnic}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  label="Phone Number *"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handlePhoneChange}
                  disabled={loading}
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="03001234522"
                />

                {errors.phoneNo && (
                  <div className="text-danger small mt-1">
                    {errors.phoneNo}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  label="Email *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  type="email"
                  autoComplete="email"
                  maxLength={100}
                  placeholder="alikahn@example.com"
                />

                {errors.email && (
                  <div className="text-danger small mt-1">
                    {errors.email}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                Present / Permanent Address
            ================================= */}
            <MDBRow className="g-3 mt-1">

              <MDBCol md="6">
                <MDBTextArea
                  label="Present Address *"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  disabled={loading}
                  rows={4}
                  maxLength={300}
                />

                {errors.presentAddress && (
                  <div className="text-danger small mt-1">
                    {errors.presentAddress}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="6">
                <MDBTextArea
                  label="Permanent Address *"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  disabled={loading}
                  rows={4}
                  maxLength={300}
                />

                {errors.permanentAddress && (
                  <div className="text-danger small mt-1">
                    {errors.permanentAddress}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                Religion / Gender
            ================================= */}
            <MDBRow className="g-3 mt-1">

              <MDBCol md="6">
                <MDBSelect
                  label="Religion *"
                  value={formData.religion}
                  onValueChange={(value) =>
                    handleSelectChange(
                      value,
                      "religion"
                    )
                  }
                  data={[
                    {
                      text: "Islam",
                      value: "Islam",
                    },
                    {
                      text: "Christianity",
                      value: "Christianity",
                    },
                    {
                      text: "Hinduism",
                      value: "Hinduism",
                    },
                    {
                      text: "Sikhism",
                      value: "Sikhism",
                    },
                    {
                      text: "Other",
                      value: "Other",
                    },
                  ]}
                  disabled={loading}
                />

                {errors.religion && (
                  <div className="text-danger small mt-1">
                    {errors.religion}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="6">
                <MDBSelect
                  label="Gender *"
                  value={formData.gender}
                  onValueChange={(value) =>
                    handleSelectChange(
                      value,
                      "gender"
                    )
                  }
                  data={[
                    {
                      text: "Male",
                      value: "Male",
                    },
                    {
                      text: "Female",
                      value: "Female",
                    },
                    {
                      text: "Other",
                      value: "Other",
                    },
                  ]}
                  disabled={loading}
                />

                {errors.gender && (
                  <div className="text-danger small mt-1">
                    {errors.gender}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                Blood / Marital / Nationality
            ================================= */}
            <MDBRow className="g-3 mt-1">

              <MDBCol md="4">
                <MDBSelect
                  label="Blood Group *"
                  value={formData.bloodGroup}
                  onValueChange={(value) =>
                    handleSelectChange(
                      value,
                      "bloodGroup"
                    )
                  }
                  data={[
                    {
                      text: "A+",
                      value: "A+",
                    },
                    {
                      text: "A-",
                      value: "A-",
                    },
                    {
                      text: "B+",
                      value: "B+",
                    },
                    {
                      text: "B-",
                      value: "B-",
                    },
                    {
                      text: "AB+",
                      value: "AB+",
                    },
                    {
                      text: "AB-",
                      value: "AB-",
                    },
                    {
                      text: "O+",
                      value: "O+",
                    },
                    {
                      text: "O-",
                      value: "O-",
                    },
                  ]}
                  disabled={loading}
                />

                {errors.bloodGroup && (
                  <div className="text-danger small mt-1">
                    {errors.bloodGroup}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBSelect
                  label="Marital Status *"
                  value={formData.maritalStatus}
                  onValueChange={(value) =>
                    handleSelectChange(
                      value,
                      "maritalStatus"
                    )
                  }
                  data={[
                    {
                      text: "Single",
                      value: "Single",
                    },
                    {
                      text: "Married",
                      value: "Married",
                    },
                    {
                      text: "Divorced",
                      value: "Divorced",
                    },
                    {
                      text: "Widowed",
                      value: "Widowed",
                    },
                  ]}
                  disabled={loading}
                />

                {errors.maritalStatus && (
                  <div className="text-danger small mt-1">
                    {errors.maritalStatus}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  label="Nationality *"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  disabled={loading}
                  type="text"
                  maxLength={50}
                  placeholder="Pakistani"
                />

                {errors.nationality && (
                  <div className="text-danger small mt-1">
                    {errors.nationality}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                DOB / Province / Domicile
            ================================= */}
            <MDBRow className="g-3 mt-1">

              <MDBCol md="4">
                <MDBInput
                  label="Date of Birth *"
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

                {errors.DOB && (
                  <div className="text-danger small mt-1">
                    {errors.DOB}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBSelect
                  label="Province *"
                  value={formData.province}
                  onValueChange={(value) =>
                    handleSelectChange(
                      value,
                      "province"
                    )
                  }
                  data={[
                    {
                      text: "Punjab",
                      value: "Punjab",
                    },
                    {
                      text: "Sindh",
                      value: "Sindh",
                    },
                    {
                      text: "Khyber Pakhtunkhwa",
                      value: "Khyber Pakhtunkhwa",
                    },
                    {
                      text: "Balochistan",
                      value: "Balochistan",
                    },
                    {
                      text: "Islamabad Capital Territory",
                      value:
                        "Islamabad Capital Territory",
                    },
                    {
                      text: "Gilgit-Baltistan",
                      value: "Gilgit-Baltistan",
                    },
                    {
                      text: "Azad Jammu & Kashmir",
                      value: "Azad Jammu & Kashmir",
                    },
                  ]}
                  disabled={loading}
                />

                {errors.province && (
                  <div className="text-danger small mt-1">
                    {errors.province}
                  </div>
                )}
              </MDBCol>

              <MDBCol md="4">
                <MDBInput
                  label="Domicile *"
                  name="domicile"
                  value={formData.domicile}
                  onChange={handleChange}
                  disabled={loading}
                  type="text"
                  maxLength={100}
                  placeholder="Multan"
                />

                {errors.domicile && (
                  <div className="text-danger small mt-1">
                    {errors.domicile}
                  </div>
                )}
              </MDBCol>

            </MDBRow>

            {/* =================================
                Profile Image
            ================================= */}
            <div className="mt-4">

              <label className="form-label fw-semibold">
                Profile Image *
              </label>

              <MDBFile
                label="Choose profile image"
                onChange={handleImageChange}
                disabled={loading}
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              />

              <div className="small text-muted mt-1">
                JPG, JPEG, PNG or WEBP. Maximum size:
                5MB.
              </div>

              {errors.profileImage && (
                <div className="text-danger small mt-1">
                  {errors.profileImage}
                </div>
              )}

              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}

            </div>

            {/* =================================
                Submit
            ================================= */}
            <div className="d-flex justify-content-end mt-4">

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
                        animation:
                          "spin 1s linear infinite",
                      }}
                    />
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
    </MDBContainer>
  );
}