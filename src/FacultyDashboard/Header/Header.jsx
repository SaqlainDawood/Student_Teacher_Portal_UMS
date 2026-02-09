import React from 'react'
import { Link } from 'react-router-dom';
import profileImg from '../../assets/FacultyDashboard/img.jpeg'
import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
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
import axios from 'axios';
import FacultyAPI from '../../FacAPI/facultyApi';


const Header = () => {
  const [faculty , setFaculty] = useState();
  const [loading , setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("facultyToken");
    if (!token) {
    navigate("/faculty/login");
    return;
    }
    const fetchFaculty = async()=>{
      try {
          setLoading(true);
          const res = await FacultyAPI.get("/me",{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          })
            if (res.data.success) {
          setFaculty(res.data.faculty);
          } else {
          localStorage.removeItem("facultyToken");
          navigate("/faculty/login");
           }
        }
       catch (error) {
           console.error("Fetch faculty error:", error);
            if (error.response?.status === 401) {
            localStorage.removeItem("facultyToken");
            navigate("/faculty/login");
        }
        }
            finally {
              setLoading(false);
            }
    }
     fetchFaculty();
  } ,[navigate])
  
   if (loading) {
    return (
      <div className="approvals-container">
        <div className="container-fluid text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <MDBNavbar light bgColor='success p-2' style={{ "--mdb-bg-opacity": "0.29" }}>
           <MDBContainer fluid>
             <MDBNavbarBrand className='fw-bold mb-0'>Welcome to Mr.{faculty?.firstName} {faculty?.lastName} </MDBNavbarBrand>
             <MDBDropdown>
               <MDBDropdownToggle tag='a' className='d-flex w-auto mb-3 nav-link'>
                 <img
                   src={faculty?.profileImage}
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
                   <Link to="/std/changpassword" className="dropdown-item">Email</Link>
                 </MDBDropdownItem>
                 
                 <MDBDropdownItem>
                    <Link to='/std/logout' className='dropdown-item'> Logout</Link>
                    </MDBDropdownItem>
               </MDBDropdownMenu>
   
             </MDBDropdown>
           </MDBContainer>
         </MDBNavbar>
  )
}

export default Header























































// import React from 'react'
// import './Header.css'
// import {
//   FaBell,
//   FaSignOutAlt,
//   FaUserCircle,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { useEffect , useState } from 'react';
// import {useNavigate} from 'react-router-dom'
// const Header = () => {
//     const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//      const handleLogout = ()=>{
//       localStorage.removeItem("adminToken");
//       localStorage.removeItem("adminData");
//       localStorage.removeItem("userRole");
//       sessionStorage.clear();
//       setMenuOpen(false);

//       navigate('/admin/login');
//   }
//   return (
// //   <header className="admin-header shadow-sm">
// //         {/* Left - Page Title */}
// //         <div className="header-left">
// //           <h4>University Management</h4>
// //         </div>
  
// //         {/* Right - User & Actions */}
// //         <div className="header-right">
// //           <button className="icon-btn">
// //             <FaBell />
// //             <span className="badge">3</span>
// //           </button>
// //           <div className="admin-user">
// //             <FaUserCircle className="user-avatar" />
// //             <span className="admin-name">Admin</span>
// //           </div>
// //           <button className="logout-btn" onClick={handleLogout}>
// //             <FaSignOutAlt /> Logout
// //           </button>
  
// //           {/* Hamburger for mobile */}
// //           <button
// //             className="menu-toggle"
// //             onClick={() => setMenuOpen(!menuOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             {menuOpen ? <FaTimes /> : <FaBars />}
// //           </button>
// //         </div>
  
// //         {/* Dropdown Menu for Mobile */}
// //         {menuOpen && (
// //           <div className="dropdown-menu">
// //             <button className="dropdown-item">
// //               <FaBell /> Notifications
// //             </button>
// //             <button className="dropdown-item">
// //               <FaUserCircle /> Profile
// //             </button>
          
// //             <button className="dropdown-item logout" onClick={handleLogout}>
// //               <FaSignOutAlt /> Logout
// //             </button>
// //           </div>
// //         )}
// //       </header>
//             <div className='d-flex justify-content-between align-item-center mb-4 '>
//                 <h3>Welcome MR. Saqlain Dawood</h3>
//                 <button
//                 className='btn btn-primary'>
//                    Logout
//                 </button>
                
//             </div>


























//   )
// }

// export default Header