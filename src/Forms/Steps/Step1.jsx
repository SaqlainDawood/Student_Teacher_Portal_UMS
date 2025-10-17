import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { MDBRow, MDBCol, MDBBtn, MDBInputGroup, MDBIcon,} from 'mdb-react-ui-kit';
const Step1 = ({onSubmit , loading}) => {
    
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
       
    });
    const [profile, setProfile] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleFile = (e) => {
        setProfile(e.target.files[0]);
    }
    const submit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email
            || !formData.phoneNo || !formData.presentAddress
            || !formData.permanentAddress || !formData.province
            || !formData.gender || !formData.religion || !formData.domicile 
            || !formData.DOB || !formData.bloodGroup
            || !formData.nationality || !formData.maritalStatus || !formData.cnic
            ){
             toast.error("Please Enter all fields");
             return;
}
        const fd = new FormData();
        Object.keys(formData).forEach(key =>{
            if (formData[key] , fd.append(key , formData[key]));
        });
        if(profile) 
        fd.append('profileImage' , profile);
        onSubmit(fd);
  }
    //     const validatePersonalDetails = () => {
    //     const fields = {
    //       firstName: "Please enter First Name",
    //       lastName: "Please enter Last Name",
    //       email: "Please enter Email",
    //       phoneNo: "Please enter Phone Number",
    //       presentAddress: "Please enter Present Address",
    //       permanentAddress: "Please enter Permanent Address",
    //       province: "Please select Province",
    //       domicile: "Please select Domicile",
    //       religion: "Please select Religion",
    //       gender: "Please select Gender",
    //       bloodGroup: "Please select Blood Group",
    //       nationality: "Please select Nationality",
    //       DOB: "Enter Date of birth",
    //       cnic: "Please enter CNIC",
    //       uploadPic: "Please upload your Image",
    //     };

    //     // 🔹 Step 1: Empty fields check
    //     for (const [key, message] of Object.entries(fields)) {
    //       if (!formData[key]) {
    //         toast.error(message);
    //         return false;
    //       }
    //     }

    //     // 🔹 Step 2: Email validation (regex)
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(formData.email)) {
    //       toast.error("Please enter a valid Email");
    //       return false;
    //     }

    //     // 🔹 Step 3: Phone number validation (11 digits, only numbers)
    //     const phoneRegex = /^[0-9]{11}$/;
    //     if (!phoneRegex.test(formData.phoneNo)) {
    //       toast.error("Phone Number must be 11 digits");
    //       return false;
    //     }

    //     // 🔹 Step 4: CNIC validation (#####-#######-# or 13 digits)
    //     const cnicRegex = /^(\d{5}-\d{7}-\d{1}|\d{13})$/;
    //     if (!cnicRegex.test(formData.cnic)) {
    //       toast.error("CNIC must be 13 digits or #####-#######-# format");
    //       return false;
    //     }

    //     // 🔹 Step 5: Upload image validation (jpg, jpeg, png)
    //     // const allowedExtensions = ["jpg", "jpeg", "png"];
    //     // const fileExtension = formData.uploadPic?.name?.split(".").pop().toLowerCase();
    //     // if (!allowedExtensions.includes(fileExtension)) {
    //     //   toast.error("Only JPG, JPEG, and PNG images are allowed");
    //     //   return false;
    //     // }

    //     return true; // ✅ All checks passed
    //   };
    return (
        <form onSubmit={submit}>
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
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.email}
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
                            value={formData.phoneNo}
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
                            value={formData.presentAddress}
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
                            value={formData.permanentAddress}
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
                            value={formData.gender}
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
                            value={formData.nationality}
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
                            value={formData.cnic}
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
                            accept='image/*'
                            onChange={handleFile}
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
                            value={formData.DOB}
                            onChange={handleChange}
                            required
                        />
                    </MDBInputGroup>
                </MDBCol>
            </MDBRow>
            <MDBCol md="6">
    <label className="form-label">Marital Status</label>
    <MDBInputGroup className="mb-0">
        <span className="input-group-text">
            <MDBIcon fas icon="heart" />
        </span>
        <select
            className="form-select"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
        >
            <option value="" disabled>Select status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
        </select>
    </MDBInputGroup>
</MDBCol>
              <MDBBtn 
              type="submit"
              className='me-1 mt-3'
               disabled={loading}>{loading ? 'Saving...' : 'Next'}</MDBBtn>
        </form>
    )
}

export default Step1