import React, { useState, useEffect } from "react";
import logoImg from "../../assets/LOGO/logo.png";
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MDBNavbar expand="lg" className={`custom-navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <MDBContainer>
          <MDBNavbarBrand tag={Link} to="/" className="navbar-brand">
            {/* <img src={logoImg} alt="TIMES University" className="navbar-logo" /> */}
            <div className="logo-text">
              <h5>UNIVERSITY Management System</h5>
              <p className="m-0">Multan</p>
            </div>
          </MDBNavbarBrand>

          <div className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <div className="navbar-nav">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                <MDBIcon icon="home" className="me-2" />
                Home
              </Link>
              <div className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  <MDBIcon icon="graduation-cap" className="me-2" />
                  Admissions
                </span>
                <div className="dropdown-menu">
                  <Link to="/student/enroll" className="dropdown-item">Apply Now</Link>
                  <Link to="#" className="dropdown-item">Programs</Link>
                  <Link to="#" className="dropdown-item">Scholarships</Link>
                  <Link to="#" className="dropdown-item">How to Apply</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  <MDBIcon icon="university" className="me-2" />
                  About
                </span>
                <div className="dropdown-menu">
                  <Link to="#" className="dropdown-item">About University</Link>
                  <Link to="#" className="dropdown-item">Leadership</Link>
                  <Link to="#" className="dropdown-item">Accreditation</Link>
                  <Link to="#" className="dropdown-item">Facilities</Link>
                </div>
              </div>
              <Link to="/student/login" className="nav-link">
                <MDBIcon icon="sign-in-alt" className="me-2" />
                Student Login
              </Link>
              <Link to="/faculty/login" className="nav-link">
                <MDBIcon icon="chalkboard-teacher" className="me-2" />
                Faculty Login
              </Link>
              <Link to="#" className="nav-link contact-link">
                <MDBIcon icon="phone-alt" className="me-2" />
                Contact
              </Link>
            </div>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* Mega Menu for mobile */}
      <div className={`mega-menu ${menuOpen ? 'open' : ''}`}>
        <MDBContainer>
          <div className="mega-grid">
            <div className="mega-column">
              <h6 className="mega-heading">
                <MDBIcon icon="graduation-cap" className="me-2" />
                Admissions
              </h6>
              <Link to="/student/enroll" onClick={() => setMenuOpen(false)}>Apply Now</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>MS/M.Phil Programs</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>PhD Programs</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Scholarships</Link>
            </div>
            <div className="mega-column">
              <h6 className="mega-heading">
                <MDBIcon icon="book" className="me-2" />
                Academics
              </h6>
              <Link to="#" onClick={() => setMenuOpen(false)}>Faculty of Law</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Faculty of Management</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Faculty of Medicine</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Faculty of Science</Link>
            </div>
            <div className="mega-column">
              <h6 className="mega-heading">
                <MDBIcon icon="info-circle" className="me-2" />
                About
              </h6>
              <Link to="#" onClick={() => setMenuOpen(false)}>About University</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Leadership</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Accreditation</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Careers</Link>
            </div>
            <div className="mega-column">
              <h6 className="mega-heading">
                <MDBIcon icon="link" className="me-2" />
                Quick Links
              </h6>
              <Link to="/student/login" onClick={() => setMenuOpen(false)}>Student Portal</Link>
              <Link to="/faculty/login" onClick={() => setMenuOpen(false)}>Faculty Portal</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>Library</Link>
              <Link to="#" onClick={() => setMenuOpen(false)}>News & Events</Link>
            </div>
          </div>
        </MDBContainer>
      </div>
    </>
  );
};

export default Navbar;