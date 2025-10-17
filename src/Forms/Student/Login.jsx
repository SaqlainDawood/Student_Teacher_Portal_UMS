import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
} from "mdb-react-ui-kit";
import logo from "../../../public/Signup-Page/login-side1.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import API from '../../api'
export default function LoginPage({setIsAuth}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reload
      if (!login.email || !login.password) {
        toast.error("Please enter both fields...");
        return;
      } 
    try {
    
      const res = await API.post('/login', { 
        email: login.email,
        password: login.password,
      });     
      if(res.data.success){
        toast.success(res.data.message);
        localStorage.setItem("studentToken", res.data.token); 
        localStorage.setItem("studentData", JSON.stringify(res.data.student)); 
         setIsAuth(true); 
        setTimeout(() => {
          navigate('/std/dashboard');
        }, 2000);
      }
      else{
          toast.error(res.data.message || "Login Failed");
      }
    } catch (error) {
      if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong, please try again.");
  }
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          {/* Left Side - Image */}
          <MDBCol md="6" className="d-flex align-items-center justify-content-center">
            <img src={logo} className="img-fluid" alt="Sample" />
          </MDBCol>

          {/* Right Side - Form */}
          <MDBCol md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal fs-1 mb-5 me-3">Sign In</p>
            </div>

            <label>Student Email</label>
            <MDBInput
              wrapperClass="mb-4"
              name="email"
              type="email"
              value={login.email}
              onChange={handleChange}
              size="lg"
            />

            <label>Student Password</label>
            <MDBInput
              wrapperClass="mb-4"
              name="password"
              value={login.password}
              onChange={handleChange}
              type="password"
              size="lg"
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn type="submit" className="mb-0 px-5" size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an enrollment?{" "}
                <Link to="/student/register" className="link-danger">
                  Register
                </Link>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}
