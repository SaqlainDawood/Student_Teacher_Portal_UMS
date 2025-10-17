import { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) {
          navigate("/student/login");
          return;
        }
        const res = await API.get('/me');

        if (res.data.success) {
          setStudent(res.data.student);
        }
        else {
          toast.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
        toast.error("Session expired or unauthorized");
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentData");
        navigate("/student/login");
      }

    }
    fetchProfile();

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    navigate("/student/login");
  };

  if (!student) {
    return (
      <MDBContainer className="py-5 text-center">
        <h4>Loading student profile...</h4>
      </MDBContainer>
    );
  }
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid className="d-flex justify-content-between align-items-center">
          {/* Left Side - Brand */}
          <MDBNavbarBrand> Welcome {student.firstName} {student.lastName}</MDBNavbarBrand>

          {/* Right Side - Profile Image */}
          <MDBDropdown>
            <MDBDropdownToggle
              tag="a"
              className="hidden-arrow d-flex align-items-center"
              role="button"
            >
              {
                student.profileImage?.url ? (
                  <img
                    src={student.profileImage.url}
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover", objectPosition: "top center" }}
                  />
                ) : (
                  <div className="border rounded p-4">No Profile Image</div>
                )
              }
            </MDBDropdownToggle>

            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={() => navigate('/std/profile')}>
                Profile
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={handleLogout}>
                {student.email}
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={handleLogout}>
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>
      <MDBContainer className="my-5">
        {/* Header */}
        {/* <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
          <MDBCol>
            <h2 className="fw-bold">
              Welcome, {student.firstName} {student.lastName}
            </h2>
          </MDBCol>
          <MDBCol className="text-end">
            <MDBBtn color="danger" onClick={handleLogout}>
              Logout
            </MDBBtn>
          </MDBCol>
        </MDBRow> */}
        <MDBRow>
          <MDBCard className="mb-4 shadow-3">
            <MDBCardHeader style={{ backgroundColor: "#0d6efd", color: "white" }}>Personal Information</MDBCardHeader>
            <MDBCardBody>
              <div className="table-responsive">
                <MDBTable bordered hover className="align-middle custom-table">
                  <MDBTableBody>
                    <tr>
                      <th>First Name</th>
                      <td>{student.firstName}</td>
                      <th>Phone No</th>
                      <td>{student.phoneNo}</td>
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td>{student.lastName}</td>
                      <th>Email</th>
                      <td className="text-success fw-bold">{student.email}</td>

                    </tr>
                    <tr>
                      <th>Present Address</th>
                      <td colSpan={3}>{student.presentAddress}</td>
                    </tr>
                    <tr>
                      <th>Permanent Address</th>
                      <td colSpan={3}>{student.permanentAddress}</td>
                    </tr>
                    <tr>
                      <th>CNIC</th>
                      <td className="text-success fw-bold">{student.cnic}</td>
                      <th>Religion</th>
                      <td>{student.religion}</td>
                    </tr>
                    <tr>
                      <th>DOB</th>
                      <td>{student.DOB}</td>
                      <th>Gender</th>
                      <td className="text-success fw-bold">{student.gender}</td>
                    </tr>
                    <tr>
                      <th>Province</th>
                      <td className="text-success fw-bold">{student.province}</td>
                      <th>Blood Group</th>
                      <td>{student.bloodGroup}</td>
                    </tr>
                    <tr>
                      <th>Domicile</th>
                      <td className="text-success fw-bold">{student.domicile}</td>
                      <th>Marital Status</th>
                      <td>{student.maritalStatus}</td>
                    </tr>
                    <tr>
                      <th>Nationality</th>
                      <td>{student.nationality}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBCardBody>
          </MDBCard>

          {/* Family Information  */}

          <MDBCard className="mb-4 shadow-3">
            <MDBCardHeader style={{ backgroundColor: "#0d6efd", color: "white" }} className="fw-bold">
              Family Details
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable align='middle' bordered responsive hover>
                <MDBTableHead>
                  <tr className='table-secondary'>
                    <th scope='col'>Father Name</th>
                    <th scope='col'>Mother Name</th>
                    <th scope='col'>Father CNIC</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>{student.family?.fatherName || "-"}</td>

                    <td>{student.family?.motherName || "-"}</td>

                    <td className="text-success fw-bold">{student.family?.fatherCnic || "-"}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>

          <MDBCol>
            {/* Family Info */}

            {/* Academic Info */}
            <MDBCard className="mb-4 shadow-3 shadow-4">
              <MDBCardHeader className="fw-bold"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >Academic Information</MDBCardHeader>
              <MDBCardBody>
                {student.academic?.educationList?.length ? (
                  <MDBTable striped bordered responsive hover>
                    <MDBTableHead className="table-secondary">
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>Sr</th>
                        <th style={{ whiteSpace: "nowrap" }}>Degree</th>
                        <th style={{ whiteSpace: "nowrap" }}>Qualification</th>
                        <th style={{ whiteSpace: "nowrap" }}>Board/University</th>
                        <th style={{ whiteSpace: "nowrap" }}>Total Marks</th>
                        <th style={{ whiteSpace: "nowrap" }}>Obtained Marks</th>
                        <th style={{ whiteSpace: "nowrap" }}>Percentage</th>
                        <th style={{ whiteSpace: "nowrap" }}> Passing Year</th>
                        <th style={{ whiteSpace: "nowrap" }}>Roll No.</th>
                        <th style={{ whiteSpace: "nowrap" }}>Mark  Sheet</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {student.academic.educationList.map((e, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{e.degreeLevel}</td>
                          <td>{e.qualification}</td>
                          <td>{e.boardUni}</td>
                          <td className="text-info fw-bold">{e.totalMarks}</td>
                          <td className="text-danger fw-bold">{e.obtainMarks}</td>
                          <td className="text-success fw-bold">{e.percentage}%</td>
                          <td>{e.passingYear}</td>
                          <td className="text-success">{e.rollNo}</td>
                          <td>
                            {e.markSheet?.url ? (
                              <a
                                href={e.markSheet.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary"
                              >
                                View
                              </a>
                            ) : (
                              "Not Uploaded marksheet"
                            )}
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                ) : (
                  <p>No academic data</p>
                )}

              </MDBCardBody>
            </MDBCard>

            <MDBCard className="shadow-3">
              <MDBCardHeader className="fw-bold"
                style={{ backgroundColor: "#0d6efd", color: "white" }}>
                Enrollment Information
              </MDBCardHeader>
              <MDBCardBody>
                <MDBTable striped bordered responsive hover>
                  <MDBTableBody>
                    <tr>
                      <th>Program</th>
                      <td className="text-success fw-bold">{student.enrollment?.program || "-"}</td>
                      <th>Session</th>
                      <td>{student.enrollment?.session || "-"}</td>
                      <th>Semester</th>
                        <td className="text-success fw-bold">{student.enrollment?.semester}</td>
                    </tr>
                    <tr>
                      <th>Department</th>
                      <td className="text-success fw-bold">{student.enrollment?.department || "-"}</td>
                      <th>Shift</th>
                      <td className="text-success fw-bold">{student.enrollment?.shift}</td>
                       <th>Campus</th>
                      <td>{student.enrollment?.campus || "-"}</td>
                    </tr>
                    <tr>
                       <th>Status</th>
                      <td colSpan={1}>
                        {student.status === "pending" && (
                          <span className="badge bg-warning text-dark">Pending</span>
                        )}
                        {student.status === "approved" && (
                          <span className="badge bg-success">Approved</span>
                        )}
                        {student.status === "rejected" && (
                          <span className="badge bg-danger">Rejected</span>
                        )}
                      </td>
                       <th>Applied On</th>
                      <td>{student.enrollment?.appliedOn || "-"}</td>
                    </tr>
                  </MDBTableBody>

                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default StudentProfile