import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';
import './StudentLogin.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!login.email || !login.password) {
    toast.error("Please enter both email and password!");
    return;
  }
  setLoading(true);
  
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', login.email);
    
    const res = await API.post('/login', { 
      email: login.email,
      password: login.password,
    });
    
    console.log('Login Response:', res.data);
    console.log('Success:', res.data.success);
    console.log('Student data:', res.data.student);
    console.log('Student ID from response:', res.data.student?.id || res.data.student?._id);
    
    if (res.data.success) {
      toast.success(res.data.message);
      
      // Store token
      localStorage.setItem("studentToken", res.data.token);
      console.log('Token stored');
      
      // Store student data
      localStorage.setItem("studentData", JSON.stringify(res.data.student));
      console.log('Student data stored');
      
      // Store student ID - use id from response
      const studentId = res.data.student?.id || res.data.student?._id;
      if (studentId) {
        localStorage.setItem("studentId", studentId);
        console.log('Student ID stored:', studentId);
      } else {
        console.error('No student ID found!');
      }
      
      localStorage.setItem('showConfetti', 'true');
      
      // Verify storage
      console.log('=== VERIFY STORAGE ===');
      console.log('Token:', localStorage.getItem('studentToken') ? 'YES' : 'NO');
      console.log('Student ID:', localStorage.getItem('studentId'));
      console.log('Student Data:', localStorage.getItem('studentData') ? 'YES' : 'NO');
      console.log('=====================');
      
      setTimeout(() => {
        console.log('Redirecting to /std/dashboard');
        navigate('/std/dashboard');
      }, 2000);
    } else {
      console.log('Login Failed - success false');
      toast.error(res.data.message || "Login Failed");
    }
  } catch (error) {
    console.error('Login Error:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid email or password");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="student-login-container">
      {/* Background Animation */}
      <div className="login-background">
        <div className="floating-elements">
          <div className="floating-element el-1"></div>
          <div className="floating-element el-2"></div>
          <div className="floating-element el-3"></div>
          <div className="floating-element el-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="student-login-content">
        {/* Left Section - Illustration */}
        <div className="student-login-left">
          <div className="illustration-container">
            <div className="main-illustration">
              <div className="illustration-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h2>Student Portal</h2>
              <p>Access your academic dashboard, view courses, submit assignments, track grades, and engage in learning activities with comprehensive student tools.</p>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-book-reader"></i>
                <span>Course Enrollment</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-file-alt"></i>
                <span>Assignment Submission</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-bar"></i>
                <span>Grade Tracking</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Schedule Management</span>
              </div>
            </div>

            {/* Student Stats */}
            <div className="student-stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Active Students</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>Satisfaction</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Learning Access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-right">
          <div className="login-form-container">
            {/* Header */}
            <div className="form-header">
              <div className="logo">
                <i className="fas fa-university"></i>
                <span>UMS Student</span>
              </div>
              <h1>Student Access</h1>
              <p>Welcome back, Student! Please login to continue your academic journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Student Email</label>
                <div className="input-container">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={login.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember this device
                </label>
                <Link to="/student/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="login-button student-login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Access Student Portal
                  </>
                )}
              </button>

              {/* Registration Link */}
              <div className="register-section">
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an enrollment?{" "}
                  <Link to="/student/register" className="register-link">
                    Register Here
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="security-notice">
                <i className="fas fa-info-circle"></i>
                <span>Ensure you are using your official university credentials</span>
              </div>

              {/* Back to Home */}
              <div className="back-home-section">
                <Link to="/" className="back-home-link">
                  <i className="fas fa-arrow-left"></i>
                  Back to Home Page
                </Link>
              </div>
            </form>

            {/* Security Footer */}
            <div className="security-footer">
              <i className="fas fa-shield-alt"></i>
              <span>Secure student portal with encrypted communication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}