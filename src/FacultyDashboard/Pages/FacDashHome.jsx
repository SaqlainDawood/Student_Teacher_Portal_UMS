import { Link } from 'react-router-dom';
import profileImg from '../../assets/FacultyDashboard/img.jpeg'

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

const FacDashHome = () => {
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='fw-bold mb-0'>Welcome to Mr. Saqlain Dawood </MDBNavbarBrand>
          <MDBDropdown>
            <MDBDropdownToggle tag='a' className='d-flex w-auto mb-3 nav-link'>
              <img
                src={profileImg}
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  border: "2px solid #ddd"
                }}
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>
                <Link to="/std/profile" className="dropdown-item">Profile</Link>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <Link to="/std/changpassword" className="dropdown-item">Change Password</Link>
              </MDBDropdownItem>
              
              <MDBDropdownItem>
                 <Link to='/std/logout' className='dropdown-item'> Logout</Link>
                 </MDBDropdownItem>
            </MDBDropdownMenu>

          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>

      <MDBTable bordered borderColor='dark' className='mt-4'>
        <MDBTableHead>
          <tr className='table-danger'>
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

export default FacDashHome;


