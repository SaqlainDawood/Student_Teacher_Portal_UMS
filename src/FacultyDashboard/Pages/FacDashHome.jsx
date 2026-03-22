import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBadge,
  MDBSpinner,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import FacultyAPI from "../../FacAPI/facultyApi";
import "./FacDashHome.css";

const FacDashHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      let facultyId = localStorage.getItem("facultyId");
      const token = localStorage.getItem("facultyToken");
      
      // If facultyId not found, try to get it from facultyData
      if (!facultyId) {
        const facultyDataStr = localStorage.getItem("facultyData");
        if (facultyDataStr) {
          try {
            const facultyData = JSON.parse(facultyDataStr);
            facultyId = facultyData._id;
          } catch (e) {
            console.error("Error parsing facultyData:", e);
          }
        }
      }
      
      if (!token || !facultyId) {
        toast.error("Please login again");
        window.location.href = "/faculty/login";
        return;
      }
      
      const response = await FacultyAPI.get(`/dashboard/${facultyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.success) {
        const safeData = {
          facultyInfo: response.data.data.facultyInfo || {
            name: "Faculty Member",
            designation: "N/A",
            department: "N/A",
            employeeID: "N/A"
          },
          statistics: response.data.data.statistics || {
            totalClasses: 0,
            totalCreditHours: 0,
            totalStudents: 0,
            averageClassSize: 0
          },
          departmentStats: response.data.data.departmentStats || [],
          semesterStats: response.data.data.semesterStats || [],
          todaysClasses: response.data.data.todaysClasses || [],
          classList: response.data.data.classList || []
        };
        
        setDashboardData(safeData);
      } else {
        toast.error(response.data?.message || "Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/faculty/login";
      } else {
        toast.error("Error loading dashboard. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <MDBSpinner role="status" color="success" size="lg">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        <p className="mt-3">Loading your dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="error-container">
        <MDBIcon fas icon="exclamation-circle" size="3x" className="text-danger mb-3" />
        <h4>Unable to load dashboard</h4>
        <p>Please try again later</p>
        <button 
          className="btn btn-success mt-3"
          onClick={() => window.location.reload()}
        >
          <MDBIcon fas icon="sync" className="me-2" />
          Retry
        </button>
      </div>
    );
  }

  const { facultyInfo, statistics, departmentStats, semesterStats, todaysClasses, classList } = dashboardData;
  const firstName = facultyInfo.name?.split(' ')[0] || 'Faculty';

  return (
    <div className="dashboard-content">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <div className="greeting-section">
            <h1 className="greeting-title">
              {greeting}, <span className="faculty-name">{firstName}!</span>
            </h1>
            <p className="greeting-subtitle">
              Here's your teaching overview for today
            </p>
          </div>
          <div className="stats-badge">
            <div className="badge-item">
              <MDBIcon fas icon="calendar-alt" className="badge-icon" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card-primary">
          <div className="stat-card-content">
            <div className="stat-info">
              <h3>{statistics.totalClasses}</h3>
              <p>Total Classes</p>
              <span className="stat-trend">Active Courses</span>
            </div>
            <div className="stat-icon-wrapper">
              <MDBIcon fas icon="chalkboard-teacher" className="stat-icon-large" />
            </div>
          </div>
        </div>

        <div className="stat-card-success">
          <div className="stat-card-content">
            <div className="stat-info">
              <h3>{statistics.totalCreditHours}</h3>
              <p>Credit Hours</p>
              <span className="stat-trend">Teaching Load</span>
            </div>
            <div className="stat-icon-wrapper">
              <MDBIcon fas icon="book-open" className="stat-icon-large" />
            </div>
          </div>
        </div>

        <div className="stat-card-info">
          <div className="stat-card-content">
            <div className="stat-info">
              <h3>{statistics.totalStudents}</h3>
              <p>Total Students</p>
              <span className="stat-trend">Across All Classes</span>
            </div>
            <div className="stat-icon-wrapper">
              <MDBIcon fas icon="users" className="stat-icon-large" />
            </div>
          </div>
        </div>

        <div className="stat-card-warning">
          <div className="stat-card-content">
            <div className="stat-info">
              <h3>{statistics.averageClassSize}</h3>
              <p>Avg Class Size</p>
              <span className="stat-trend">Students/Class</span>
            </div>
            <div className="stat-icon-wrapper">
              <MDBIcon fas icon="user-graduate" className="stat-icon-large" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule Section */}
      {todaysClasses && todaysClasses.length > 0 && (
        <div className="schedule-section">
          <div className="section-header">
            <h3>
              <MDBIcon fas icon="calendar-day" className="section-icon" />
              Today's Schedule
            </h3>
            <span className="schedule-count">{todaysClasses.length} Classes</span>
          </div>
          <div className="schedule-list">
            {todaysClasses.map((cls, idx) => (
              <div key={idx} className="schedule-item">
                <div className="schedule-time">
                  <MDBIcon far icon="clock" />
                  <span>{cls.startTime} - {cls.endTime}</span>
                </div>
                <div className="schedule-details">
                  <div className="schedule-subject">{cls.subject}</div>
                  <div className="schedule-meta">
                    <MDBIcon fas icon="tag" size="sm" />
                    <span>{cls.classCode}</span>
                    <MDBIcon fas icon="door-open" size="sm" className="ms-2" />
                    <span>Room {cls.room}</span>
                    <MDBIcon fas icon="layer-group" size="sm" className="ms-2" />
                    <span>Section {cls.section}</span>
                  </div>
                </div>
                <MDBBadge color="success" pill className="schedule-status">
                  Upcoming
                </MDBBadge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department & Semester Stats */}
      <div className="stats-row">
        <div className="stats-card">
          <div className="stats-card-header">
            <MDBIcon fas icon="building" />
            <h4>By Department</h4>
          </div>
          <div className="stats-card-body">
            {departmentStats && departmentStats.length > 0 ? (
              departmentStats.map((dept, idx) => (
                <div key={idx} className="stat-bar-item">
                  <div className="stat-bar-header">
                    <span className="stat-bar-label">{dept.department}</span>
                    <span className="stat-bar-value">{dept.classCount} Classes</span>
                  </div>
                  <div className="stat-bar-progress">
                    <div 
                      className="stat-bar-fill"
                      style={{ width: `${(dept.classCount / statistics.totalClasses) * 100}%` }}
                    ></div>
                  </div>
                  <div className="stat-bar-footer">
                    <span>{dept.totalStudents} Students</span>
                    <span>{dept.totalCreditHours} Credits</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-4">No department data available</p>
            )}
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <MDBIcon fas icon="layer-group" />
            <h4>By Semester</h4>
          </div>
          <div className="stats-card-body">
            {semesterStats && semesterStats.length > 0 ? (
              semesterStats.map((sem, idx) => (
                <div key={idx} className="stat-bar-item">
                  <div className="stat-bar-header">
                    <span className="stat-bar-label">Semester {sem.semester}</span>
                    <span className="stat-bar-value">{sem.classCount} Classes</span>
                  </div>
                  <div className="stat-bar-progress">
                    <div 
                      className="stat-bar-fill"
                      style={{ width: `${(sem.classCount / statistics.totalClasses) * 100}%` }}
                    ></div>
                  </div>
                  <div className="stat-bar-footer">
                    <span>{sem.totalStudents} Students</span>
                    <span>{sem.totalCreditHours} Credits</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-4">No semester data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className="classes-section">
        <div className="section-header">
          <h3>
            <MDBIcon fas icon="table-list" className="section-icon" />
            All Classes
          </h3>
          <span className="class-count">{classList?.length || 0} Classes</span>
        </div>
        
        {classList && classList.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class Details</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>Credits</th>
                  <th>Students</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {classList.map((cls, idx) => (
                  <tr key={cls.id || idx}>
                    <td className="serial-number">{idx + 1}</td>
                    <td>
                      <div className="class-detail">
                        <strong>{cls.subject || 'N/A'}</strong>
                        <div className="class-meta">
                          {cls.className || 'N/A'} ({cls.classCode || 'N/A'})
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="department-badge">{cls.department || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="semester-badge">Semester {cls.semester || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="section-badge">{cls.section || 'N/A'}</span>
                    </td>
                    <td>{cls.creditHours || 0} hrs</td>
                    <td>
                      <div className="student-progress">
                        <span className="student-count">{cls.enrolledStudents || 0}</span>
                        <span className="student-capacity"> / {cls.capacity || 0}</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${((cls.enrolledStudents || 0) / (cls.capacity || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {cls.schedule && cls.schedule.length > 0 ? (
                        <div className="schedule-preview">
                          <MDBIcon far icon="clock" className="me-1" size="sm" />
                          <span>{cls.schedule[0].day}, {cls.schedule[0].startTime}</span>
                          {cls.schedule.length > 1 && (
                            <span className="more-schedule">+{cls.schedule.length - 1}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">No schedule</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <MDBIcon far icon="calendar-times" size="3x" className="empty-icon" />
            <h5>No Classes Assigned</h5>
            <p>You haven't been assigned any classes yet.</p>
          </div>
        )}
      </div>

      {/* Faculty Info Card */}
      <div className="faculty-card">
        <div className="faculty-card-header">
          <MDBIcon fas icon="user-circle" className="faculty-icon" />
          <h4>Faculty Information</h4>
        </div>
        <div className="faculty-card-body">
          <div className="faculty-info-row">
            <div className="info-label">
              <MDBIcon fas icon="user" />
              <span>Name:</span>
            </div>
            <div className="info-value">{facultyInfo.name}</div>
          </div>
          <div className="faculty-info-row">
            <div className="info-label">
              <MDBIcon fas icon="id-card" />
              <span>Employee ID:</span>
            </div>
            <div className="info-value">{facultyInfo.employeeID}</div>
          </div>
          <div className="faculty-info-row">
            <div className="info-label">
              <MDBIcon fas icon="building" />
              <span>Department:</span>
            </div>
            <div className="info-value">{facultyInfo.department}</div>
          </div>
          <div className="faculty-info-row">
            <div className="info-label">
              <MDBIcon fas icon="briefcase" />
              <span>Designation:</span>
            </div>
            <div className="info-value">{facultyInfo.designation}</div>
          </div>
          <div className="faculty-info-row">
            <div className="info-label">
              <MDBIcon fas icon="envelope" />
              <span>Email:</span>
            </div>
            <div className="info-value">{facultyInfo.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacDashHome;