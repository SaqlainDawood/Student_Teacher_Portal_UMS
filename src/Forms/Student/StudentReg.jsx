import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import API from "../../api";
const StudentReg = () => {
  const navigate = useNavigate();
  const [stdreg, setStdReg] = useState({
    email: '',
    cnic: '',
    password: '',
    confirmedPass: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStdReg({ ...stdreg, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stdreg.password !== stdreg.confirmedPass) {
      toast.info('Passwords do not match!')
      return;
    }
    try {
      const res = await API.post(`/set-credentials`, {
        cnic: stdreg.cnic,
        email: stdreg.email,
        password: stdreg.password,
      })
      if (res.data.success) {
        toast.success("Credentials set successfully! Redirecting to login...")
        setTimeout(() => {
          navigate("/student/login");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="reg-bg">
      <MDBContainer fluid className="py-5">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="10" lg="8" xl="7">
            <MDBCard className="shadow-5 text-black" style={{ borderRadius: "25px" }}>
              <MDBCardBody className="p-5">
                <MDBRow>
                  {/* Left Form */}
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-2 order-lg-1 d-flex flex-column align-items-center"
                  >
                    <h2 className="fw-bold mb-4 text-gradient text-center">
                      Create Account
                    </h2>
                    <p className="text-center text-muted mb-5">
                      Please fill in the details to register
                    </p>
                    <form className="w-100 mb-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="id-card me-3" size="lg" />
                        <MDBInput
                          label="Your CNIC"
                          name='cnic'
                          type="number"
                          value={stdreg.cnic}
                          onChange={handleChange}
                          className="w-100 custom-input"
                        />
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="envelope me-3" size="lg" />
                        <MDBInput
                          label="Your Email"
                          name="email"
                          value={stdreg.email}
                          onChange={handleChange}
                          id="form2"
                          type="email"
                          className="custom-input"
                        />
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="lock me-3" size="lg" />
                        <MDBInput
                          label="Password"
                          id="form3"
                          name="password"
                          value={stdreg.password}
                          onChange={handleChange}
                          type="password"
                          className="custom-input"
                        />
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="key me-3" size="lg" />
                        <MDBInput
                          label="Repeat your password"
                          id="form4"
                          name="confirmedPass"
                          value={stdreg.confirmedPass}
                          onChange={handleChange}
                          type="password"
                          className="custom-input"
                        />
                      </div>

                      <MDBBtn
                        className="mb-4 w-100 custom-btn"
                        size="lg"
                        type="submit"
                      >
                        Register
                      </MDBBtn>
                    </form>
                  </MDBCol>

                  {/* Right Image */}
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-1 order-lg-2 d-flex align-items-center"
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      fluid
                      alt="signup illustration"
                      className="rounded-5"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default StudentReg;
