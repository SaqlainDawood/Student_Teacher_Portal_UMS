import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import ConfettiBoom from "confetti-boom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import API from "../api";

const DashboardHome = () => {
  const { width, height } = useWindowSize();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const confettiTriggered = useRef(false);
  const containerRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/student/login");
      return;
    }
    
    const fetchStudentData = async () => {
      try {
        const res = await API.get('/me');
        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          localStorage.removeItem("studentToken");
          navigate("/student/login");
        }
      } catch (error) {
        console.log("Failed to fetch the Student Record from /me", error);
        navigate("/student/login");
      } finally {
        setLoading(false);
      }
    };

    // Trigger boom confetti only once per session
    const hasShownConfetti = sessionStorage.getItem("confettiShown");
    
    if (!hasShownConfetti && !confettiTriggered.current) {
      // Boom confetti effect
      const confetti = new ConfettiBoom({
        element: containerRef.current || document.body,
        duration: 2000,
        colors: [
          '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
          '#ff00ff', '#00ffff', '#ff6600', '#ff0066'
        ],
        particleCount: 300,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.5 },
        decay: 0.9,
        ticks: 200,
        shapes: ['square', 'circle']
      });
      
      confettiTriggered.current = true;
      sessionStorage.setItem("confettiShown", "true");
    }
    
    fetchStudentData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    sessionStorage.removeItem("confettiShown");
    navigate("/student/login");
  };
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h3>Loading...</h3>
      </div>
    );
  }
  
  return (
    <div ref={containerRef}>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="fw-bold">
            Welcome {student?.firstName} {student?.lastName}
          </MDBNavbarBrand>
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="d-flex w-auto mb-3 nav-link">
              <img
                src={
                  student?.profileImage?.url || "https://via.placeholder.com/40"
                }
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  objectPosition: "top center",
                }}
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={() => navigate("/std/profile")}>
                Profile
              </MDBDropdownItem>
              <MDBDropdownItem>
                <Link className="dropdown-item" to="/std/change-password">
                  Change Password
                </Link>
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={handleLogout}>
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>

      <MDBTable bordered borderColor="dark" className="mt-4" responsive>
        <MDBTableHead>
          <tr className="table-success">
            <th scope="col">sr#</th>
            <th scope="col">Name</th>
            <th scope="col">Building</th>
            <th scope="col">Campus</th>
            <th scope="col">Class Detail</th>
            <th scope="col">Time From - Time To</th>
            <th scope="col">Status</th>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
          {/* Your table rows go here */}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default DashboardHome;