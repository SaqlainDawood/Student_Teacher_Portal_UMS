import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import FacultyAPI from "../../FacAPI/facultyApi";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const Header = () => {
  const {faculty , setFaculty} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("facultyToken");
    if (!token) {
      navigate("/faculty/login");
      return;
    }
    const fetchFaculty = async () => {
      try {
        const res = await FacultyAPI.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setFaculty(res.data.faculty);
        } else {
          localStorage.removeItem("facultyToken");
          navigate("/faculty/login");
        }
      } catch (error) {
        console.error("Fetch faculty error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("facultyToken");
          navigate("/faculty/login");
        }
      }
    };
    fetchFaculty();
  }, [navigate , setFaculty]);
  const handleLogout = () => {
    if (
      window.confirm(
        "Are you sure you want to logout from your faculty account?",
      )
    ) {
      try {
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyId");
        localStorage.removeItem("facultyData");
        localStorage.removeItem("facultyName");
        localStorage.removeItem("facultyEmail");
        sessionStorage.clear();
        toast.success("Logout Successfully");
        navigate("/faculty/login");
      } catch (error) {
        console.error("Faculty Logout Error!!!");
        toast.error("Error during logout. Please try again.");
      }
    }
  };
  return (
    <MDBNavbar
      light
      bgColor="success p-2"
      style={{ "--mdb-bg-opacity": "0.29" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand className="fw-bold mb-0">
          Welcome to Mr.{faculty?.firstName} {faculty?.lastName}{" "}
        </MDBNavbarBrand>
        <MDBDropdown className="custom-dropdown">
          <MDBDropdownToggle
            tag="a"
            className="d-flex w-auto mb-3 nav-link"
            style={{ cursor: "pointer" }}
          >
            <img
              src={faculty?.profileImage || "https://via.placeholder.com/40"}
              alt="profile"
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                border: "2px solid #20c997",
              }}
            />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem>
              <Link to="/faculty/profile" className="dropdown-item text-primary">
                <i className="fas fa-user me-2"></i>
                Profile
              </Link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <Link
                to="/faculty/settings"
                className="dropdown-item text-primary"
              >
                <i className="fas fa-cog me-2"></i>
                Settings
              </Link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <Link
                to="/faculty/change-password"
                className="dropdown-item text-primary"
              >
                <i className="fas fa-key me-2"></i>
                Change Password
              </Link>
            </MDBDropdownItem>
            <div className="dropdown-divider"></div>
            <MDBDropdownItem>
              <button 
              onClick={handleLogout}
              className="dropdown-item text-danger"
              style={{ 
                width: '100%', 
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;

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
