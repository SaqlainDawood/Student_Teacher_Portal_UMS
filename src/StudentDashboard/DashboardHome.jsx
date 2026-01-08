import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import {toast} from 'react-toastify';
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
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import API from "../api";
const DashboardHome = () => {
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);
  const [student, setStudent] = useState(null);
  const [loading , setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
     if (!token) {
    navigate("/student/login");
    return;
    }
      const fetchStudentData = async()=>{
        try {
          const res = await API.get('/me');
          if(res.data.success){
            setStudent(res.data.student);
          }
          else{
            localStorage.removeItem("studentToken");
            navigate("/student/login");
          }
        } catch (error) {
          console.log("Failed to fetch the Student Record from /me", error);
          if(error.res?.status === 400){
            
          }
          navigate("/student/login");
        }
        finally {
              setLoading(false);
            }

      }

    // Check if confetti has been shown before
      const hasSeenConfetti = localStorage.getItem("showConfetti");
      if (hasSeenConfetti === "true") {
        setRunConfetti(true);
        // ✅ IMMEDIATELY REMOVE THE FLAG so confetti doesn't show again
        localStorage.removeItem("showConfetti");
      }
      fetchStudentData();
  }, [navigate]);

  useEffect(() => {
    if (runConfetti) {
      const timer = setTimeout(() => {
        setRunConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [runConfetti]);
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    navigate("/student/login");
  };
    if(loading) return <h3>Loading!!!!!!!!!!</h3>
  return (
    <>
      {runConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={800}
          gravity={0.3}
          wind={0.05}
          recycle={false}
          onConfettiComplete={() => {
            setRunConfetti(false);
          }}
        />
      )}
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="fw-bold">
            {" "}
            Welcome {student?.firstName} {student?.lastName}{" "}
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
                <Link className="dropdown-item">Change Password</Link>
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
      </MDBTable>
    </>
  );
};

export default DashboardHome;
