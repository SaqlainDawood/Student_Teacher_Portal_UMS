import React from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";
import API from "../../api";
import './StudentReg.css'; // We'll create this CSS file

const StudentReg = () => {
  const navigate = useNavigate();
  const [stdreg, setStdReg] = useState({
    email: '',
    cnic: '',
    password: '',
    confirmedPass: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStdReg({ ...stdreg, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validation
    if (!stdreg.cnic || !stdreg.email || !stdreg.password || !stdreg.confirmedPass) {
      toast.error('All fields are required!');
      setLoading(false);
      return;
    }
    
    // CNIC validation
    if (!/^\d{13}$/.test(stdreg.cnic)) {
      toast.error('CNIC must be exactly 13 digits!');
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(stdreg.email)) {
      toast.error('Please enter a valid email address!');
      setLoading(false);
      return;
    }
    
    // Password validation
    if (stdreg.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      setLoading(false);
      return;
    }
    if (stdreg.password !== stdreg.confirmedPass) {
      toast.info('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const res = await API.post(`/set-credentials`, {
        cnic: stdreg.cnic,
        email: stdreg.email.toLowerCase().trim(),
        password: stdreg.password,
      })
      if (res.data.success) {
        toast.success(res.data.message || "Registration successful! Redirecting to login...")
        setStdReg({
          email: '',
          cnic: '',
          password: '',
          confirmedPass: '',
        });
        setTimeout(() => {
          navigate("/student/login");
        }, 2000);
      }
    } catch (err) {
        const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="student-registration-container">
      {/* Background Animation */}
      <div className="registration-background">
        <div className="floating-elements">
          <div className="floating-element el-1"></div>
          <div className="floating-element el-2"></div>
          <div className="floating-element el-3"></div>
          <div className="floating-element el-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="student-registration-content">
        {/* Left Section - Illustration */}
        <div className="registration-left">
          <div className="illustration-container">
            <div className="main-illustration">
              <div className="illustration-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h2>Student Portal</h2>
              <p>Welcome to the University Management System. Register now to access your personalized dashboard, course materials, and academic resources.</p>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-book-open"></i>
                <span>Course Management</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Academic Schedule</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-line"></i>
                <span>Progress Tracking</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-comments"></i>
                <span>Faculty Communication</span>
              </div>
            </div>

            {/* Registration Benefits */}
            <div className="registration-benefits">
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>Secure Account Creation</span>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>Instant Access Upon Approval</span>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <span>24/7 System Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="registration-right">
          <div className="registration-form-container">
            {/* Header */}
            <div className="form-header">
              <div className="logo">
                <i className="fas fa-graduation-cap"></i>
                <span>UMS Student</span>
              </div>
              <h1>Create Student Account</h1>
              <p>Fill in your details to register for the student portal</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="registration-form">
              {/* CNIC Field */}
              <div className="form-group">
                <label htmlFor="cnic">CNIC Number</label>
                <div className="input-container">
                  <i className="fas fa-id-card input-icon"></i>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    value={stdreg.cnic}
                    onChange={handleChange}
                    placeholder="Enter 13-digit CNIC without dashes"
                    maxLength="13"
                    pattern="\d{13}"
                    required
                    className="form-input"
                  />
                </div>
                <div className="input-hint">Must be exactly 13 digits</div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={stdreg.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    required
                    className="form-input"
                  />
                </div>
                <div className="input-hint">Use your university email if available</div>
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
                    value={stdreg.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
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
                <div className="input-hint">Minimum 6 characters</div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmedPass">Confirm Password</label>
                <div className="input-container">
                  <i className="fas fa-key input-icon"></i>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmedPass"
                    name="confirmedPass"
                    value={stdreg.confirmedPass}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="password-strength">
                <div className={`strength-bar ${stdreg.password.length >= 6 ? 'strong' : 'weak'}`}></div>
                <span className="strength-text">
                  {stdreg.password.length >= 6 ? 'Strong password' : 'Weak password'}
                </span>
              </div>

              {/* Terms and Conditions */}
              <div className="terms-agreement">
                <label className="terms-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="registration-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    Register Student Account
                  </>
                )}
              </button>

              {/* Login Redirect */}
              <div className="login-redirect">
                <span>Already have an account?</span>
                <Link to="/student/login" className="login-link">
                  <i className="fas fa-sign-in-alt"></i>
                  Login Here
                </Link>
              </div>

              {/* Security Note */}
              <div className="security-notice">
                <i className="fas fa-shield-alt"></i>
                <span>Your information is protected with bank-level security</span>
              </div>
            </form>

            {/* Quick Links */}
            <div className="quick-links">
              <Link to="/" className="quick-link">
                <i className="fas fa-home"></i>
                Back to Home
              </Link>
              <Link to="/contact" className="quick-link">
                <i className="fas fa-headset"></i>
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReg;