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
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import FacultyAPI from "../../FacAPI/facultyApi";
import "./FacDashHome.css";

const FacDashHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("facultyToken");
      const facultyId = localStorage.getItem("facultyId");
      
      // Debug logs
      console.log("Fetching dashboard for faculty ID:", facultyId);
      console.log("Token exists:", !!token);
      
      if (!token || !facultyId) {
        toast.error("Please login again");
        window.location.href = "/faculty/login";
        return;
      }
      
      const response = await FacultyAPI.get(`/dashboard/${facultyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Dashboard response:", response.data);

      if (response.data && response.data.success) {
        // Ensure all data exists with defaults
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
        toast.success(`Welcome ${safeData.facultyInfo.name}`);
      } else {
        toast.error(response.data?.message || "Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyId");
        window.location.href = "/faculty/login";
      } else if (error.response?.status === 404) {
        toast.error("Faculty not found. Please contact admin.");
      } else {
        toast.error("Error loading dashboard. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <MDBSpinner role="status" color="primary" size="lg">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        <p className="mt-3">Loading your dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-error">
        <MDBIcon fas icon="exclamation-circle" size="3x" className="text-danger mb-3" />
        <h4>Unable to load dashboard</h4>
        <p>Please try again later</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          <MDBIcon fas icon="sync" className="me-2" />
          Retry
        </button>
      </div>
    );
  }

  const { facultyInfo, statistics, departmentStats, semesterStats, todaysClasses, classList } = dashboardData;

  return (
    <div className="faculty-dashboard">
      <MDBContainer fluid className="py-4">
        {/* Welcome Section */}
        <div className="welcome-section mb-4">
          <div className="welcome-card">
            <div className="welcome-content">
              <div className="welcome-text">
                <h1 className="display-5 fw-bold">
                  Welcome back, {facultyInfo.name?.split(' ')[0] || 'Faculty'}!
                </h1>
                <p className="lead text-muted mb-0">
                  {facultyInfo.designation || 'N/A'} • {facultyInfo.department || 'N/A'}
                </p>
                <p className="text-muted">
                  <MDBIcon fas icon="id-card" className="me-2" />
                  Employee ID: {facultyInfo.employeeID || 'N/A'}
                </p>
              </div>
              <div className="welcome-avatar">
                {facultyInfo.profileImage ? (
                  <img src={facultyInfo.profileImage} alt={facultyInfo.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {facultyInfo.name?.charAt(0) || 'F'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <MDBRow className="g-4 mb-4">
          <MDBCol lg="3" md="6">
            <MDBCard className="stat-card stat-primary">
              <MDBCardBody>
                <div className="stat-content">
                  <div className="stat-info">
                    <h6>Total Classes</h6>
                    <h2 className="fw-bold">{statistics.totalClasses || 0}</h2>
                    <small>Active Classes</small>
                  </div>
                  <MDBIcon fas icon="chalkboard-teacher" size="3x" className="stat-icon" />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6">
            <MDBCard className="stat-card stat-success">
              <MDBCardBody>
                <div className="stat-content">
                  <div className="stat-info">
                    <h6>Credit Hours</h6>
                    <h2 className="fw-bold">{statistics.totalCreditHours || 0}</h2>
                    <small>Teaching Load</small>
                  </div>
                  <MDBIcon fas icon="book-open" size="3x" className="stat-icon" />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6">
            <MDBCard className="stat-card stat-info">
              <MDBCardBody>
                <div className="stat-content">
                  <div className="stat-info">
                    <h6>Total Students</h6>
                    <h2 className="fw-bold">{statistics.totalStudents || 0}</h2>
                    <small>Across All Classes</small>
                  </div>
                  <MDBIcon fas icon="users" size="3x" className="stat-icon" />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6">
            <MDBCard className="stat-card stat-warning">
              <MDBCardBody>
                <div className="stat-content">
                  <div className="stat-info">
                    <h6>Avg Class Size</h6>
                    <h2 className="fw-bold">{statistics.averageClassSize || 0}</h2>
                    <small>Students/Class</small>
                  </div>
                  <MDBIcon fas icon="user-graduate" size="3x" className="stat-icon" />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Today's Schedule Alert */}
        {todaysClasses && todaysClasses.length > 0 && (
          <MDBCard className="today-schedule-card mb-4">
            <MDBCardBody>
              <div className="today-header">
                <MDBIcon fas icon="calendar-day" className="me-2 text-primary" />
                <h5 className="mb-0">Today's Schedule</h5>
              </div>
              <div className="today-classes">
                {todaysClasses.map((cls, idx) => (
                  <div key={idx} className="today-class-item">
                    <div className="class-time">
                      <MDBIcon far icon="clock" className="me-1" />
                      {cls.startTime} - {cls.endTime}
                    </div>
                    <div className="class-details">
                      <strong>{cls.subject}</strong>
                      <span className="mx-2">•</span>
                      <span>{cls.classCode}</span>
                      <span className="mx-2">•</span>
                      <span>Room {cls.room}</span>
                    </div>
                    <MDBBadge color="primary" pill>
                      {cls.section}
                    </MDBBadge>
                  </div>
                ))}
              </div>
            </MDBCardBody>
          </MDBCard>
        )}

        {/* Main Tabs */}
        <MDBCard className="dashboard-card">
          <MDBCardBody>
            <MDBTabs className="dashboard-tabs mb-4">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => setActiveTab("overview")}
                  active={activeTab === "overview"}
                >
                  <MDBIcon fas icon="chart-line" className="me-2" />
                  Overview
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => setActiveTab("classes")}
                  active={activeTab === "classes"}
                >
                  <MDBIcon fas icon="table-list" className="me-2" />
                  All Classes ({classList?.length || 0})
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => setActiveTab("schedule")}
                  active={activeTab === "schedule"}
                >
                  <MDBIcon fas icon="calendar-week" className="me-2" />
                  Full Schedule
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              {/* Overview Tab */}
              <MDBTabsPane open={activeTab === "overview"}>
                <MDBRow>
                  <MDBCol md="6">
                    <div className="stats-section">
                      <h6 className="section-title">
                        <MDBIcon fas icon="building" className="me-2" />
                        By Department
                      </h6>
                      {departmentStats && departmentStats.length > 0 ? (
                        departmentStats.map((dept, idx) => (
                          <div key={idx} className="stat-item">
                            <div className="stat-header">
                              <span className="stat-label">{dept.department}</span>
                              <span className="stat-value">{dept.classCount} Classes</span>
                            </div>
                            <div className="stat-sub">
                              <span>{dept.totalStudents} Students</span>
                              <span>{dept.totalCreditHours} Credits</span>
                            </div>
                            <MDBProgress className="stat-progress">
                              <MDBProgressBar
                                width={`${(dept.classCount / (statistics.totalClasses || 1)) * 100}%`}
                                valuemin={0}
                                valuemax={100}
                              />
                            </MDBProgress>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted text-center py-4">No department data available</p>
                      )}
                    </div>
                  </MDBCol>

                  <MDBCol md="6">
                    <div className="stats-section">
                      <h6 className="section-title">
                        <MDBIcon fas icon="layer-group" className="me-2" />
                        By Semester
                      </h6>
                      {semesterStats && semesterStats.length > 0 ? (
                        semesterStats.map((sem, idx) => (
                          <div key={idx} className="stat-item">
                            <div className="stat-header">
                              <span className="stat-label">Semester {sem.semester}</span>
                              <span className="stat-value">{sem.classCount} Classes</span>
                            </div>
                            <div className="stat-sub">
                              <span>{sem.totalStudents} Students</span>
                              <span>{sem.totalCreditHours} Credits</span>
                            </div>
                            <MDBProgress className="stat-progress">
                              <MDBProgressBar
                                width={`${(sem.classCount / (statistics.totalClasses || 1)) * 100}%`}
                                valuemin={0}
                                valuemax={100}
                              />
                            </MDBProgress>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted text-center py-4">No semester data available</p>
                      )}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBTabsPane>

              {/* All Classes Tab */}
              <MDBTabsPane open={activeTab === "classes"}>
                {classList && classList.length > 0 ? (
                  <div className="table-responsive">
                    <MDBTable hover className="classes-table">
                      <MDBTableHead>
                        <tr className="table-header">
                          <th>#</th>
                          <th>Class Details</th>
                          <th>Department</th>
                          <th>Semester</th>
                          <th>Section</th>
                          <th>Credits</th>
                          <th>Students</th>
                          <th>Schedule</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {classList.map((cls, idx) => (
                          <tr key={cls.id || idx}>
                            <td className="serial-number">{idx + 1}</td>
                            <td>
                              <div className="class-detail">
                                <strong>{cls.subject || 'N/A'}</strong>
                                <div className="small text-muted">
                                  {cls.className || 'N/A'} ({cls.classCode || 'N/A'})
                                </div>
                              </div>
                            </td>
                            <td>
                              <MDBBadge color="info" pill>
                                {cls.department || 'N/A'}
                              </MDBBadge>
                            </td>
                            <td>
                              <MDBBadge color="primary" pill>
                                {cls.semester || 'N/A'}
                              </MDBBadge>
                            </td>
                            <td>
                              <MDBBadge color="secondary" pill>
                                {cls.section || 'N/A'}
                              </MDBBadge>
                            </td>
                            <td>{cls.creditHours || 0} hrs</td>
                            <td>
                              <div className="student-count">
                                <span>{cls.enrolledStudents || 0}</span>
                                <span className="text-muted"> / {cls.capacity || 0}</span>
                                <MDBProgress className="mt-1" height="4px">
                                  <MDBProgressBar
                                    width={`${((cls.enrolledStudents || 0) / (cls.capacity || 1)) * 100}%`}
                                    valuemin={0}
                                    valuemax={100}
                                  />
                                </MDBProgress>
                              </div>
                            </td>
                            <td>
                              {cls.schedule && cls.schedule.length > 0 ? (
                                <>
                                  {cls.schedule.slice(0, 1).map((s, i) => (
                                    <div key={i} className="schedule-preview">
                                      <MDBIcon far icon="clock" className="me-1" size="sm" />
                                      <small>{s.day}, {s.startTime}</small>
                                    </div>
                                  ))}
                                  {cls.schedule.length > 1 && (
                                    <small className="text-muted">+{cls.schedule.length - 1} more</small>
                                  )}
                                </>
                              ) : (
                                <small className="text-muted">No schedule</small>
                              )}
                            </td>
                          </tr>
                        ))}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <MDBIcon far icon="calendar-times" size="3x" className="text-muted mb-3" />
                    <h5>No Classes Assigned</h5>
                    <p className="text-muted">You haven't been assigned any classes yet.</p>
                  </div>
                )}
              </MDBTabsPane>

              {/* Full Schedule Tab */}
              <MDBTabsPane open={activeTab === "schedule"}>
                {classList && classList.length > 0 ? (
                  <div className="full-schedule">
                    {classList.map((cls, idx) => (
                      <div key={idx} className="schedule-card">
                        <div className="schedule-card-header">
                          <div>
                            <h6 className="mb-0">{cls.subject || 'N/A'}</h6>
                            <small className="text-muted">{cls.classCode} • {cls.className}</small>
                          </div>
                          <MDBBadge color="primary">{cls.creditHours || 0} Credits</MDBBadge>
                        </div>
                        <div className="schedule-times">
                          {cls.schedule && cls.schedule.length > 0 ? (
                            cls.schedule.map((s, i) => (
                              <div key={i} className="schedule-time-slot">
                                <MDBBadge color="light" className="day-badge">{s.day}</MDBBadge>
                                <span className="time-range">{s.startTime} - {s.endTime}</span>
                                <span className="room-info">Room {s.room}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted">No schedule available</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <MDBIcon far icon="calendar-times" size="3x" className="text-muted mb-3" />
                    <h5>No Schedule Available</h5>
                    <p className="text-muted">No classes have been scheduled yet.</p>
                  </div>
                )}
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default FacDashHome;