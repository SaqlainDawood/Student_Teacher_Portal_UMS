import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './FacultyLogin.css';
import FacultyAPI from '../../FacAPI/facultyApi'

export default function FacultyLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    userName: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!login.userName || !login.password) {
      toast.error("Please enter both email and password!");
      return;
    }
    setLoading(true);
    
    try {
      const res = await FacultyAPI.post('/login', {
        userName: login.userName,
        password: login.password,
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("facultyToken", res.data.token);
        localStorage.setItem("facultyData", JSON.stringify(res.data.faculty));
        setTimeout(() => {
          navigate('/faculty/dashboard');
        }, 2000);
      } else {
        toast.error(res.data.message || "Login Failed");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.log("Faculty login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="faculty-login-container">
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
      <div className="faculty-login-content">
        {/* Left Section - Illustration */}
        <div className="faculty-login-left">
          <div className="illustration-container">
            <div className="main-illustration">
              <div className="illustration-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h2>Faculty Portal</h2>
              <p>Access your teaching dashboard, manage courses, track student progress, and conduct academic activities with dedicated faculty tools.</p>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-book-open"></i>
                <span>Course Management</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-user-graduate"></i>
                <span>Student Progress Tracking</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-tasks"></i>
                <span>Assignment Management</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-line"></i>
                <span>Performance Analytics</span>
              </div>
            </div>

            {/* Faculty Stats */}
            <div className="faculty-stats">
              <div className="stat-item">
                <h3>100+</h3>
                <p>Courses</p>
              </div>
              <div className="stat-item">
                <h3>95%</h3>
                <p>Engagement</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support</p>
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
                <span>UMS Faculty</span>
              </div>
              <h1>Faculty Access</h1>
              <p>Welcome back, Professor! Please login to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Faculty Email</label>
                <div className="input-container">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="userName"
                    name="userName"
                    value={login.userName}
                    onChange={handleClick}
                    placeholder="faculty@university.edu"
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
                    onChange={handleClick}
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
                <Link to="/faculty/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="login-button faculty-login-btn"
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
                    Access Faculty Portal
                  </>
                )}
              </button>

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
              <span>Secure faculty portal with encrypted communication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}