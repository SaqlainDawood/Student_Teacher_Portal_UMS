import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBTable, MDBTableHead, MDBTableBody,
} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react'
const DashboardHome = () => {
  const [student, setStudent] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const storeStudent = localStorage.getItem("studentData");
    if (storeStudent) {
      const parseStudent = JSON.parse(storeStudent);
      console.log("Student From Local Storage" , parseStudent);
      setStudent(parseStudent);
    }
    else {
      navigate('/student/login')
    }
  }, [navigate])
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    navigate("/student/login");
  };

  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='fw-bold'>Dashboard </MDBNavbarBrand>
          <MDBDropdown>
            <MDBDropdownToggle tag='a' className='d-flex w-auto mb-3 nav-link'>
              <img
                src={student?.profileImage?.url || "https://via.placeholder.com/40"}
                
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  objectPosition: "top center"
                }}
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={() => navigate('/std/profile')}>
                Profile
              </MDBDropdownItem>
              <MDBDropdownItem>
                <Link className="dropdown-item">Change Password</Link>
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={handleLogout}>
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>

          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>

      <MDBTable bordered borderColor='dark' className='mt-4' responsive>
        <MDBTableHead>
          <tr className='table-success'>
            <th scope='col'>sr#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Building</th>
            <th scope='col'>Campus</th>
            <th scope='col'>Class Detail</th>
            <th scope='col'>Time From - Time To</th>
            <th scope='col'>Status</th>
          </tr>
        </MDBTableHead>
      </MDBTable>
    </>
  );
};

export default DashboardHome;


