import React, { useState } from "react";
import {
  MDBCard, MDBCardBody, MDBCardHeader, MDBInput,
  MDBBtn, MDBRow, MDBCol, MDBIcon
} from "mdb-react-ui-kit";
import profileImg from '../../assets/FacultyDashboard/img.jpeg'
export default function FacultyProfile() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dr. Ali Khan",
    email: "ali.khan@university.edu",
    phone: "0300-1234567",
    department: "Computer Science",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <MDBCard className="shadow-3">
      <MDBCardHeader className="bg-primary text-white">
        <h5>Faculty Profile</h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="4" className="text-center">
            <img
              src={profileImg}
              alt="Faculty"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px" }}
            />
            <MDBBtn size="sm" color="secondary">
              <MDBIcon fas icon="upload" className="me-2" />
              Change Picture
            </MDBBtn>
          </MDBCol>
          <MDBCol md="8">
            <MDBInput
              label="Name"
              name="name"
              value={profile.name}
              disabled={!editMode}
              onChange={handleChange}
              className="mb-3"
            />
            <MDBInput
              label="Email"
              name="email"
              value={profile.email}
              disabled={!editMode}
              onChange={handleChange}
              className="mb-3"
            />
            <MDBInput
              label="Phone"
              name="phone"
              value={profile.phone}
              disabled={!editMode}
              onChange={handleChange}
              className="mb-3"
            />
            <MDBInput
              label="Department"
              name="department"
              value={profile.department}
              disabled={!editMode}
              onChange={handleChange}
              className="mb-3"
            />

            {!editMode ? (
              <MDBBtn color="warning" onClick={() => setEditMode(true)}>
                Edit Profile
              </MDBBtn>
            ) : (
              <MDBBtn color="success" onClick={() => setEditMode(false)}>
                Save Changes
              </MDBBtn>
            )}
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
