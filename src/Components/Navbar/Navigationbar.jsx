import React, { useState, useEffect } from "react";
import logoImg from "../../assets/LOGO/logo.png";
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // reset menu on desktop resize
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MDBNavbar light className="custom-navbar">
        <MDBContainer fluid className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <MDBNavbarBrand>
            {/* <Link to='/home'> */}
            <img src={logoImg} alt="Times University" style={{ height: "40px" }} />
            {/* </Link> */}
          </MDBNavbarBrand>
          {/* Social icons - hide on mobile */}
          {!isMobile && (
            <div className="d-flex align-items-right me-1">
              {/* <MDBIcon fab icon="facebook-f" className="text-white mx-2 fs-5" />
              <MDBIcon fab icon="instagram" className="text-white mx-2 fs-5" />
              <MDBIcon fab icon="youtube" className="text-white mx-2 fs-5" /> */}
            </div>
          )}

          {/* Toggle button */}
          <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
            {menuOpen ? (
              <MDBIcon icon="times" fas className="text-white fs-3" />
            ) : (
              <MDBIcon icon="bars" fas className="text-white fs-3" />
            )}
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* Mega Menu */}
      <div className={`mega-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-row">
          <h6 className="menu-heading">Discover TUM</h6>
          <a href="#">About Times University</a>
          <a href="#">Meet the Team</a>
          <a href="#">HEC, Islamabad</a>
          <a href="#">The Legal Authority</a>
          <a href="#">Statutory Bodies</a>
          <a href="#">Accreditation From Councils</a>
          <a href="#">Clinical Attachment</a>
        </div>

        <div className="menu-row">
          <h6 className="menu-heading">Messages</h6>
          <a href="#">Chancellor / Governor Punjab</a>
          <a href="#">Chief Minister Punjab</a>
          <a href="#">Vice Chancellor / Chairman</a>
          <a href="#">Executive Director</a>
          <a href="#">Pro Vice Chancellor (Academics)</a>
          <a href="#">Registrar</a>
        </div>

        <div className="menu-row">
          <h6 className="menu-heading">Admissions</h6>
          <a href="#">MS/M.Phil. Programs</a>
          <a href="#">PhD Programs</a>
          <a href="#">Scholarships</a>
          <a href="#">How to Apply</a>
          <a href="#">Apply for Admission</a>
        </div>

        <div className="menu-row">
          <h6 className="menu-heading">Faculties & Departments</h6>
          <a href="#">Faculty of Law</a>
          <a href="#">Faculty of Management Sciences</a>
          <a href="#">Faculty of Medicine & Allied Health Sciences</a>
          <a href="#">Faculty of Pharmaceutical Science</a>
          <a href="#">Faculty of Social Sciences</a>
          <a href="#">Faculty of Science & Technology</a>
        </div>

        <div className="menu-row">
          <h6 className="menu-heading">Careers</h6>
          <a href="#">Job Opportunities</a>
          <a href="#">Internships</a>
        </div>
        <div className="menu-row">
          <h6 className="menu-heading">Contact</h6>
          <a href="#">Contact Us</a>
          <a href="#">Location & Map</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
