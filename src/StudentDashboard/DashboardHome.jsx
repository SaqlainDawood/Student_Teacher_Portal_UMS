import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfettiBoom from "react-confetti-boom";
import { 
  FaSpinner, FaUserGraduate, FaBook, FaCalendarAlt, FaChartLine, 
  FaClock, FaBuilding, FaUniversity, FaGraduationCap, FaIdCard, 
  FaEnvelope, FaCalendarCheck, FaCheckCircle, FaExclamationTriangle,
  FaChevronDown, FaUserCircle
} from 'react-icons/fa';
import API from "../api";
import './DashboardHome.css';

const DashboardHome = () => {
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const confettiTriggered = useRef(false);
  const dropdownRef = useRef(null); // ✅ NEW
  const navigate = useNavigate();

  // ✅ FIXED OUTSIDE CLICK HANDLER
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log('Clicked outside, closing dropdown');
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          
          const attendanceRes = await API.get('/attendance/summary');
          if (attendanceRes.data.success) {
            setAttendanceData(attendanceRes.data.data);
          }
        } else {
          localStorage.removeItem("studentToken");
          navigate("/student/login");
        }
      } catch (error) {
        console.log("Failed to fetch student data", error);
        navigate("/student/login");
      } finally {
        setLoading(false);
      }
    };

    const hasShownConfetti = sessionStorage.getItem("confettiShown");
    if (!hasShownConfetti && !confettiTriggered.current) {
      setShowConfetti(true);
      confettiTriggered.current = true;
      sessionStorage.setItem("confettiShown", "true");
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    
    fetchStudentData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    sessionStorage.removeItem("confettiShown");
    navigate("/student/login");
  };
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return '#D4AF37';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { text: 'Excellent', icon: <FaCheckCircle />, color: '#D4AF37' };
    if (percentage >= 60) return { text: 'Fair', icon: <FaExclamationTriangle />, color: '#ffc107' };
    return { text: 'Needs Improvement', icon: <FaExclamationTriangle />, color: '#dc3545' };
  };

  if (loading) {
    return (
      <div className="loading-container-dashboard">
        <div className="spinner-wrapper">
          <FaSpinner className="spinner-icon" size={48} />
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const overallAttendance = attendanceData?.stats?.overallAttendance || 0;
  const attendanceStatus = getAttendanceStatus(overallAttendance);

  return (
    <>
        {showConfetti && (
        <ConfettiBoom
          mode="boom"
          particleCount={800}
          colors={['#D4AF37', '#B4941C', '#F3E5AB', '#800020', '#6A1B2F', '#1A2A3A']}
          spread={300}
          startVelocity={25}
          decay={0.9}
          x={0.5}
          y={0.5}
        />
      )}

      {/* Navbar */}
    <nav className="student-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <FaUniversity className="brand-icon" />
            <span className="brand-text">Student Portal</span>
          </div>
          
          <div className="navbar-welcome">
            <FaUserGraduate className="welcome-icon" />
            <span className="welcome-text">
              Welcome, {student?.firstName} {student?.lastName}
            </span>
          </div>
          
          <div className="navbar-actions">
            <div 
              ref={dropdownRef}
              className={`profile-dropdown ${dropdownOpen ? 'active' : ''}`}
            >
              <button className="profile-btn" onClick={toggleDropdown}>
                {student?.profileImage?.url ? (
                  <img
                    src={student.profileImage.url}
                    alt="profile"
                    className="profile-avatar"
                  />
                ) : (
                  <FaUserCircle className="profile-avatar-icon" size={40} />
                )}
                <span className="profile-name">{student?.firstName}</span>
                <FaChevronDown className="dropdown-arrow" />
              </button>

              <div className="dropdown-menu">
                <Link to="/std/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <FaIdCard /> Profile
                </Link>
                <Link to="/std/change-password" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <FaEnvelope /> Change Password
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="student-dashboard">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome Back, <span className="highlight">{student?.firstName}</span>
            </h1>
            <p className="hero-subtitle">
              Track your academic progress, attendance, and performance all in one place
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat-card">
              <FaCalendarAlt className="hero-stat-icon" />
              <div className="hero-stat-info">
                <span className="hero-stat-value">{attendanceData?.stats?.totalClasses || 0}</span>
                <span className="hero-stat-label">Total Classes</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <FaCheckCircle className="hero-stat-icon" style={{ color: '#D4AF37' }} />
              <div className="hero-stat-info">
                <span className="hero-stat-value">{attendanceData?.stats?.totalPresent || 0}</span>
                <span className="hero-stat-label">Present</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <FaClock className="hero-stat-icon" style={{ color: '#ffc107' }} />
              <div className="hero-stat-info">
                <span className="hero-stat-value">{attendanceData?.stats?.totalLate || 0}</span>
                <span className="hero-stat-label">Late</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <FaExclamationTriangle className="hero-stat-icon" style={{ color: '#dc3545' }} />
              <div className="hero-stat-info">
                <span className="hero-stat-value">{attendanceData?.stats?.totalAbsent || 0}</span>
                <span className="hero-stat-label">Absent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="info-card">
          <div className="info-card-header">
            <FaIdCard className="info-card-icon" />
            <h3>Student Information</h3>
          </div>
          <div className="info-card-content">
            <div className="info-row">
              <span className="info-label">Roll Number:</span>
              <span className="info-value">{student?.rollNo || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Registration No:</span>
              <span className="info-value">{student?.registrationNo || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Program:</span>
              <span className="info-value">{student?.enrollment?.program || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Semester:</span>
              <span className="info-value">{student?.enrollment?.semester || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department:</span>
              <span className="info-value">{student?.enrollment?.department || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Section:</span>
              <span className="info-value">{student?.section || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{student?.email || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{student?.phoneNo || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Attendance Overview Card */}
        <div className="attendance-card">
          <div className="attendance-card-header">
            <FaChartLine className="attendance-icon" />
            <h3>Attendance Overview</h3>
          </div>
          <div className="attendance-circle-container">
            <div className="attendance-circle">
              <svg className="attendance-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="attendance-bg-circle" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="attendance-fill-circle"
                  style={{
                    strokeDasharray: `${(overallAttendance / 100) * 283}, 283`,
                    stroke: getAttendanceColor(overallAttendance)
                  }}
                />
              </svg>
              <div className="attendance-percentage">
                <span className="percentage-value" style={{ color: getAttendanceColor(overallAttendance) }}>
                  {overallAttendance}%
                </span>
                <span className="percentage-label">Overall</span>
              </div>
            </div>
            <div className="attendance-status-badge" style={{ background: `${attendanceStatus.color}20`, color: attendanceStatus.color }}>
              {attendanceStatus.icon}
              <span>{attendanceStatus.text}</span>
            </div>
          </div>
          <div className="attendance-details">
            <div className="attendance-detail-item">
              <div className="detail-dot present"></div>
              <span>Present: {attendanceData?.stats?.totalPresent || 0}</span>
            </div>
            <div className="attendance-detail-item">
              <div className="detail-dot late"></div>
              <span>Late: {attendanceData?.stats?.totalLate || 0}</span>
            </div>
            <div className="attendance-detail-item">
              <div className="detail-dot absent"></div>
              <span>Absent: {attendanceData?.stats?.totalAbsent || 0}</span>
            </div>
            <div className="attendance-detail-item">
              <div className="detail-dot total"></div>
              <span>Total Classes: {attendanceData?.stats?.totalClasses || 0}</span>
            </div>
          </div>
          <div className="attendance-warning">
            <FaExclamationTriangle />
            <span>Required Minimum: 75%</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/std/attendance" className="action-card">
            <FaCalendarCheck className="action-icon" />
            <h4>View Attendance</h4>
            <p>Check your detailed attendance report</p>
            <span className="action-arrow">→</span>
          </Link>
          <Link to="/std/profile" className="action-card">
            <FaUserGraduate className="action-icon" />
            <h4>My Profile</h4>
            <p>View and update your profile information</p>
            <span className="action-arrow">→</span>
          </Link>
          <Link to="/std/result" className="action-card">
            <FaGraduationCap className="action-icon" />
            <h4>Results</h4>
            <p>Check your academic results</p>
            <span className="action-arrow">→</span>
          </Link>
          <Link to="/std/feehistory" className="action-card">
            <FaBuilding className="action-icon" />
            <h4>Fee History</h4>
            <p>View your fee payment history</p>
            <span className="action-arrow">→</span>
          </Link>
        </div>

        {/* Course Schedule Preview */}
        {attendanceData?.courses && attendanceData.courses.length > 0 && (
          <div className="courses-preview">
            <div className="courses-header">
              <FaBook className="courses-icon" />
              <h3>Your Courses</h3>
              <Link to="/std/attendance" className="view-all">View All →</Link>
            </div>
            <div className="courses-grid">
              {attendanceData.courses.slice(0, 3).map((course, idx) => (
                <div key={idx} className="course-preview-card">
                  <div className="course-code-badge">{course.classCode}</div>
                  <h4 className="course-name">{course.subject}</h4>
                  <div className="course-progress-bar">
                    <div 
                      className="course-progress-fill"
                      style={{ 
                        width: `${course.percentage}%`,
                        background: getAttendanceColor(course.percentage)
                      }}
                    ></div>
                  </div>
                  <div className="course-attendance-stats">
                    <span>Attendance: {course.percentage}%</span>
                    <span className={`course-status ${course.status.toLowerCase()}`}>{course.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {attendanceData?.recentAttendance && attendanceData.recentAttendance.length > 0 && (
          <div className="recent-activity">
            <div className="recent-header">
              <FaClock className="recent-icon" />
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-timeline">
              {attendanceData.recentAttendance.slice(0, 5).map((record, idx) => (
                <div key={idx} className="activity-item">
                  <div className={`activity-dot ${record.status}`}></div>
                  <div className="activity-content">
                    <div className="activity-title">{record.subject}</div>
                    <div className="activity-date">{new Date(record.date).toLocaleDateString()}</div>
                  </div>
                  <div className={`activity-status ${record.status}`}>
                    {record.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHome;