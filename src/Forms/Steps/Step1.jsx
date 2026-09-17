
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { FaSpinner } from "react-icons/fa";
import "./Step1.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  cnic: "",
  phoneNo: "",
  email: "",
  presentAddress: "",
  permanentAddress: "",
  province: "",
  domicile: "",
  religion: "",
  gender: "",
  bloodGroup: "",
  maritalStatus: "",
  nationality: "",
  DOB: "",
};

const initialErrors = {};

export default function Step1({
  onSubmit,
  initialData = {},
  loading = false,
}) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialData,
  });

  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    setFormData({
      ...initialFormData,
      ...initialData,
    });
  }, [initialData]);

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error while user is correcting it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================
     PROFILE IMAGE
  ========================= */
  const handleProfileImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setProfile(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setProfile(null);

      setErrors((prev) => ({
        ...prev,
        profileImage:
          "Only JPG, JPEG, PNG and WEBP images are allowed.",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setProfile(null);

      setErrors((prev) => ({
        ...prev,
        profileImage: "Profile image must be less than 5MB.",
      }));

      e.target.value = "";
      return;
    }

    setProfile(file);

    setErrors((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  /* =========================
     VALIDATION
  ========================= */
  const validateForm = () => {
    const newErrors = {};

    const firstName = formData.firstName?.trim();
    const lastName = formData.lastName?.trim();
    const cnic = formData.cnic?.trim();
    const phoneNo = formData.phoneNo?.trim();
    const email = formData.email?.trim();
    const presentAddress = formData.presentAddress?.trim();
    const permanentAddress = formData.permanentAddress?.trim();
    const province = formData.province?.trim();
    const domicile = formData.domicile?.trim();
    const religion = formData.religion?.trim();
    const gender = formData.gender?.trim();
    const bloodGroup = formData.bloodGroup?.trim();
    const maritalStatus = formData.maritalStatus?.trim();
    const nationality = formData.nationality?.trim();
    const DOB = formData.DOB;

    /* =========================
       REQUIRED FIELDS
    ========================= */

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (firstName.length < 2) {
      newErrors.firstName = "First name must contain at least 2 characters.";
    } else if (!/^[A-Za-z\s'-]+$/.test(firstName)) {
      newErrors.firstName =
        "First name can only contain letters, spaces, apostrophe or hyphen.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last name must contain at least 2 characters.";
    } else if (!/^[A-Za-z\s'-]+$/.test(lastName)) {
      newErrors.lastName =
        "Last name can only contain letters, spaces, apostrophe or hyphen.";
    }

    /* =========================
       CNIC
    ========================= */

    if (!cnic) {
      newErrors.cnic = "CNIC is required.";
    } else if (!/^\d{13}$/.test(cnic)) {
      newErrors.cnic = "CNIC must contain exactly 13 digits.";
    }

    /* =========================
       PHONE
    ========================= */

    if (!phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!/^\d{11}$/.test(phoneNo)) {
      newErrors.phoneNo =
        "Phone number must contain exactly 11 digits.";
    } else if (!/^03\d{9}$/.test(phoneNo)) {
      newErrors.phoneNo =
        "Please enter a valid Pakistani mobile number starting with 03.";
    }

    /* =========================
       EMAIL
    ========================= */

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    /* =========================
       ADDRESS
    ========================= */

    if (!presentAddress) {
      newErrors.presentAddress = "Present address is required.";
    } else if (presentAddress.length < 5) {
      newErrors.presentAddress =
        "Present address must contain at least 5 characters.";
    }

    if (!permanentAddress) {
      newErrors.permanentAddress =
        "Permanent address is required.";
    } else if (permanentAddress.length < 5) {
      newErrors.permanentAddress =
        "Permanent address must contain at least 5 characters.";
    }

    /* =========================
       OTHER REQUIRED FIELDS
    ========================= */

    if (!province) {
      newErrors.province = "Province is required.";
    }

    if (!domicile) {
      newErrors.domicile = "Domicile is required.";
    }

    if (!religion) {
      newErrors.religion = "Religion is required.";
    }

    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!bloodGroup) {
      newErrors.bloodGroup = "Blood group is required.";
    }

    if (!maritalStatus) {
      newErrors.maritalStatus = "Marital status is required.";
    }

    if (!nationality) {
      newErrors.nationality = "Nationality is required.";
    }

    /* =========================
       DATE OF BIRTH
    ========================= */

    if (!DOB) {
      newErrors.DOB = "Date of birth is required.";
    } else {
      const dobDate = new Date(DOB);
      const today = new Date();

      if (Number.isNaN(dobDate.getTime())) {
        newErrors.DOB = "Please enter a valid date of birth.";
      } else if (dobDate > today) {
        newErrors.DOB = "Date of birth cannot be in the future.";
      }
    }

    /* =========================
       PROFILE IMAGE
    ========================= */

    const existingProfileImage =
      initialData?.profileImage?.url ||
      initialData?.profileImage?.path ||
      initialData?.profileImage;

    if (!profile && !existingProfileImage) {
      newErrors.profileImage = "Profile image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    try {
      /*
       * FormData is created here only so the parent
       * can retrieve the selected profile image.
       */
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          fd.append(key, value);
        }
      });

      if (profile) {
        fd.append("profileImage", profile);
      }

      /*
       * Plain data is used by MultiPartForm to maintain
       * the existing application state/draft.
       */
      const plainData = {
        ...formData,
        profileImage: profile
          ? profile
          : initialData?.profileImage || null,
      };

      await onSubmit(fd, plainData);
    } catch (error) {
      console.error("Step 1 submission error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to save Step 1. Please try again."
      );
    }
  };

  /* =========================
     INPUT CLASS
  ========================= */
  const getInputClass = (field) => {
    return errors[field]
      ? "form-control is-invalid"
      : "form-control";
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <MDBRow className="g-3">

        {/* FIRST NAME */}
        <MDBCol md="6">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={getInputClass("firstName")}
            placeholder="Enter first name"
            maxLength={50}
          />

          {errors.firstName && (
            <div className="invalid-feedback">
              {errors.firstName}
            </div>
          )}
        </MDBCol>

        {/* LAST NAME */}
        <MDBCol md="6">
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={getInputClass("lastName")}
            placeholder="Enter last name"
            maxLength={50}
          />

          {errors.lastName && (
            <div className="invalid-feedback">
              {errors.lastName}
            </div>
          )}
        </MDBCol>

        {/* CNIC */}
        <MDBCol md="6">
          <label className="form-label">
            CNIC <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 13);

              setFormData((prev) => ({
                ...prev,
                cnic: value,
              }));

              setErrors((prev) => ({
                ...prev,
                cnic: "",
              }));
            }}
            className={getInputClass("cnic")}
            placeholder="Enter 13 digit CNIC"
            inputMode="numeric"
            maxLength={13}
          />

          {errors.cnic && (
            <div className="invalid-feedback">
              {errors.cnic}
            </div>
          )}
        </MDBCol>

        {/* PHONE */}
        <MDBCol md="6">
          <label className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 11);

              setFormData((prev) => ({
                ...prev,
                phoneNo: value,
              }));

              setErrors((prev) => ({
                ...prev,
                phoneNo: "",
              }));
            }}
            className={getInputClass("phoneNo")}
            placeholder="03XXXXXXXXX"
            inputMode="numeric"
            maxLength={11}
          />

          {errors.phoneNo && (
            <div className="invalid-feedback">
              {errors.phoneNo}
            </div>
          )}
        </MDBCol>

        {/* EMAIL */}
        <MDBCol md="6">
          <label className="form-label">
            Email <span className="text-danger">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClass("email")}
            placeholder="example@email.com"
            maxLength={100}
          />

          {errors.email && (
            <div className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </MDBCol>

        {/* DATE OF BIRTH */}
        <MDBCol md="6">
          <label className="form-label">
            Date of Birth <span className="text-danger">*</span>
          </label>

          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className={getInputClass("DOB")}
          />

          {errors.DOB && (
            <div className="invalid-feedback">
              {errors.DOB}
            </div>
          )}
        </MDBCol>

        {/* PRESENT ADDRESS */}
        <MDBCol md="6">
          <label className="form-label">
            Present Address <span className="text-danger">*</span>
          </label>

          <textarea
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            className={getInputClass("presentAddress")}
            placeholder="Enter present address"
            rows="3"
            maxLength={300}
          />

          {errors.presentAddress && (
            <div className="invalid-feedback">
              {errors.presentAddress}
            </div>
          )}
        </MDBCol>

        {/* PERMANENT ADDRESS */}
        <MDBCol md="6">
          <label className="form-label">
            Permanent Address <span className="text-danger">*</span>
          </label>

          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className={getInputClass("permanentAddress")}
            placeholder="Enter permanent address"
            rows="3"
            maxLength={300}
          />

          {errors.permanentAddress && (
            <div className="invalid-feedback">
              {errors.permanentAddress}
            </div>
          )}
        </MDBCol>

        {/* PROVINCE */}
        <MDBCol md="6">
          <label className="form-label">
            Province <span className="text-danger">*</span>
          </label>

          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className={getInputClass("province")}
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">
              Khyber Pakhtunkhwa
            </option>
            <option value="Balochistan">Balochistan</option>
            <option value="Gilgit-Baltistan">
              Gilgit-Baltistan
            </option>
            <option value="Azad Kashmir">
              Azad Kashmir
            </option>
            <option value="Islamabad Capital Territory">
              Islamabad Capital Territory
            </option>
          </select>

          {errors.province && (
            <div className="invalid-feedback">
              {errors.province}
            </div>
          )}
        </MDBCol>

        {/* DOMICILE */}
        <MDBCol md="6">
          <label className="form-label">
            Domicile <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="domicile"
            value={formData.domicile}
            onChange={handleChange}
            className={getInputClass("domicile")}
            placeholder="Enter domicile"
            maxLength={100}
          />

          {errors.domicile && (
            <div className="invalid-feedback">
              {errors.domicile}
            </div>
          )}
        </MDBCol>

        {/* RELIGION */}
        <MDBCol md="6">
          <label className="form-label">
            Religion <span className="text-danger">*</span>
          </label>

          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className={getInputClass("religion")}
          >
            <option value="">Select Religion</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Other">Other</option>
          </select>

          {errors.religion && (
            <div className="invalid-feedback">
              {errors.religion}
            </div>
          )}
        </MDBCol>

        {/* GENDER */}
        <MDBCol md="6">
          <label className="form-label">
            Gender <span className="text-danger">*</span>
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={getInputClass("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <div className="invalid-feedback">
              {errors.gender}
            </div>
          )}
        </MDBCol>

        {/* BLOOD GROUP */}
        <MDBCol md="6">
          <label className="form-label">
            Blood Group <span className="text-danger">*</span>
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className={getInputClass("bloodGroup")}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodGroup && (
            <div className="invalid-feedback">
              {errors.bloodGroup}
            </div>
          )}
        </MDBCol>

        {/* MARITAL STATUS */}
        <MDBCol md="6">
          <label className="form-label">
            Marital Status <span className="text-danger">*</span>
          </label>

          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className={getInputClass("maritalStatus")}
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>

          {errors.maritalStatus && (
            <div className="invalid-feedback">
              {errors.maritalStatus}
            </div>
          )}
        </MDBCol>

        {/* NATIONALITY */}
        <MDBCol md="6">
          <label className="form-label">
            Nationality <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className={getInputClass("nationality")}
            placeholder="Enter nationality"
            maxLength={50}
          />

          {errors.nationality && (
            <div className="invalid-feedback">
              {errors.nationality}
            </div>
          )}
        </MDBCol>

        {/* PROFILE IMAGE */}
        <MDBCol md="6">
          <label className="form-label">
            Profile Image <span className="text-danger">*</span>
          </label>

          <input
            type="file"
            name="profileImage"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleProfileImage}
            className={
              errors.profileImage
                ? "form-control is-invalid"
                : "form-control"
            }
          />

          <small className="text-muted">
            JPG, PNG or WEBP — maximum 5MB
          </small>

          {errors.profileImage && (
            <div className="invalid-feedback">
              {errors.profileImage}
            </div>
          )}

          {profile && (
            <div className="mt-2 text-success">
              Selected: {profile.name}
            </div>
          )}

          {!profile &&
            (initialData?.profileImage?.url ||
              initialData?.profileImage?.path) && (
              <div className="mt-2 text-success">
                Existing profile image available
              </div>
            )}
        </MDBCol>

        {/* SUBMIT */}
        <MDBCol md="12" className="mt-4 text-end">
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