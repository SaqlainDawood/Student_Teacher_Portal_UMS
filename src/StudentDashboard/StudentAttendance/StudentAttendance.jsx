import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBIcon,
  MDBBadge,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import API from '../../api';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('studentToken');
      
      console.log('=== DEBUG INFO ===');
      console.log('Token exists:', token ? 'YES' : 'NO');
      console.log('Token value:', token ? token.substring(0, 30) + '...' : 'null');
      console.log('==================');

      if (!token) {
        toast.error('Please login again');
        navigate('/student/login');
        return;
      }

      const response = await API.get('/attendance/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data?.message || 'Failed to load attendance');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentData');
        navigate('/student/login');
      } else {
        toast.error(error.response?.data?.message || 'Error loading attendance data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const token = localStorage.getItem('studentToken');

      if (!token) {
        toast.error('Please login again');
        navigate('/student/login');
        return;
      }

      const response = await API.get('attendance/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_${data?.student?.rollNo || 'student'}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Error exporting:', error);
      toast.error('Failed to download report');
    } finally {
      setExporting(false);
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return '#20c997';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getStatusBadge = (percentage) => {
    if (percentage >= 75) return { text: 'Good', color: '#20c997', bg: 'rgba(32, 201, 151, 0.1)' };
    if (percentage >= 60) return { text: 'Warning', color: '#ffc107', bg: 'rgba(255, 193, 7, 0.1)' };
    return { text: 'Critical', color: '#dc3545', bg: 'rgba(220, 53, 69, 0.1)' };
  };

  if (loading) {
    return (
      <div className="student-attendance-loading">
        <MDBSpinner role="status" color="success" size="lg">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        <p>Loading your attendance...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="student-attendance-empty">
        <MDBIcon fas icon="calendar-times" size="3x" className="empty-icon" />
        <h4>No Attendance Data</h4>
        <p>You don't have any attendance records yet.</p>
      </div>
    );
  }

  const overallStatus = getStatusBadge(data.stats.overallAttendance);

  return (
    <div className="student-attendance-page">
      {/* Header */}
      <div className="attendance-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/std/dashboard')}>
            <MDBIcon fas icon="arrow-left" className="me-2" />
            Back to Dashboard
          </button>
          <h1>My Attendance</h1>
          <p>Track your attendance across all courses</p>
        </div>
        <button className="export-btn" onClick={handleExport} disabled={exporting}>
          <MDBIcon fas icon="download" className="me-2" />
          {exporting ? 'Exporting...' : 'Export Report'}
        </button>
      </div>

      {/* Student Info Card */}
      <div className="student-info-card">
        <div className="student-avatar-large">
          {data.student.profileImage ? (
            <img src={data.student.profileImage} alt={data.student.name} />
          ) : (
            <span>{data.student.name.charAt(0)}</span>
          )}
        </div>
        <div className="student-details">
          <h2>{data.student.name}</h2>
          <p>
            <MDBIcon fas icon="id-card" className="me-1" />
            Roll No: {data.student.rollNo}
          </p>
          <p>
            <MDBIcon fas icon="graduation-cap" className="me-1" />
            {data.student.program} - Semester {data.student.semester}
          </p>
          <p>
            <MDBIcon fas icon="building" className="me-1" />
            {data.student.department}
          </p>
          <p>
            <MDBIcon fas icon="envelope" className="me-1" />
            {data.student.email}
          </p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="overall-stats-card">
        <h3>Overall Attendance Summary</h3>
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-value" style={{ color: getPercentageColor(data.stats.overallAttendance) }}>
              {data.stats.overallAttendance}%
            </div>
            <div className="stat-label">Overall Attendance</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{data.stats.totalClasses}</div>
            <div className="stat-label">Total Classes</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#20c997' }}>{data.stats.totalPresent}</div>
            <div className="stat-label">Present</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#ffc107' }}>{data.stats.totalLate}</div>
            <div className="stat-label">Late</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#dc3545' }}>{data.stats.totalAbsent}</div>
            <div className="stat-label">Absent</div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Attendance Progress</span>
            <span>Required: 75%</span>
          </div>
          <div className="progress-bar-custom">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min(100, data.stats.overallAttendance)}%`,
                background: getPercentageColor(data.stats.overallAttendance)
              }}
            ></div>
          </div>
          <div className="status-message">
            <span className={`status-badge ${overallStatus.text.toLowerCase()}`}>
              {overallStatus.text}
            </span>
            {data.stats.overallAttendance < 75 && (
              <span className="warning-message">
                <MDBIcon fas icon="exclamation-triangle" className="me-1" />
                Your attendance is below the required 75% threshold. Please attend more classes!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Course-wise Attendance */}
      <div className="courses-section">
        <div className="section-header">
          <h3>
            <MDBIcon fas icon="book-open" className="me-2" />
            Course-wise Attendance
          </h3>
          <span className="course-count">{data.courses.length} Courses</span>
        </div>

        <div className="courses-grid">
          {data.courses.map((course) => {
            const status = getStatusBadge(course.percentage);
            return (
              <div key={course.classId} className="course-card" onClick={() => setSelectedCourse(course)}>
                <div className="course-header">
                  <div className="course-code">{course.classCode}</div>
                  <div className={`course-status ${status.text.toLowerCase()}`}>{status.text}</div>
                </div>
                <div className="course-name">{course.subject}</div>
                <div className="course-details">
                  <span><MDBIcon fas icon="chalkboard-teacher" /> {course.teacher}</span>
                  <span><MDBIcon fas icon="layer-group" /> Section {course.section}</span>
                  <span><MDBIcon fas icon="calendar-alt" /> Semester {course.semester}</span>
                </div>
                <div className="course-progress">
                  <div className="progress-percentage" style={{ color: getPercentageColor(course.percentage) }}>
                    {course.percentage}%
                  </div>
                  <div className="progress-bar-small">
                    <div 
                      className="progress-fill-small"
                      style={{ 
                        width: `${course.percentage}%`,
                        background: getPercentageColor(course.percentage)
                      }}
                    ></div>
                  </div>
                </div>
                <div className="course-stats">
                  <span>Present: {course.present}</span>
                  <span>Late: {course.late}</span>
                  <span>Absent: {course.absent}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Summary Chart */}
      <div className="monthly-summary-card">
        <h3>
          <MDBIcon fas icon="chart-line" className="me-2" />
          Monthly Attendance Trend
        </h3>
        <div className="monthly-chart">
          {data.monthlySummary.map((month, idx) => (
            <div key={idx} className="month-bar">
              <div className="month-label">{month.month}</div>
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${Math.max(10, month.percentage)}%`,
                    background: getPercentageColor(month.percentage)
                  }}
                ></div>
              </div>
              <div className="month-percentage">{month.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="recent-attendance-card">
        <h3>
          <MDBIcon fas icon="history" className="me-2" />
          Recent Attendance (Last 30 Days)
        </h3>
        <div className="table-responsive">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
              </thead>
              <tbody>
                {data.recentAttendance.length > 0 ? (
                  data.recentAttendance.map((record, idx) => (
                    <tr key={idx} className={`status-${record.status}`}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.classCode}</td>
                      <td>{record.subject}</td>
                      <td>
                        <span className={`status-badge ${record.status}`}>
                          {record.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{record.remarks || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No recent attendance records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedCourse.subject}</h3>
                <button className="modal-close" onClick={() => setSelectedCourse(null)}>×</button>
              </div>
              <div className="modal-body">
                <p><strong>Course Code:</strong> {selectedCourse.classCode}</p>
                <p><strong>Teacher:</strong> {selectedCourse.teacher}</p>
                <p><strong>Section:</strong> {selectedCourse.section}</p>
                <p><strong>Semester:</strong> {selectedCourse.semester}</p>
                <p><strong>Credit Hours:</strong> {selectedCourse.creditHours}</p>
                <hr />
                <div className="course-stats-detail">
                  <div className="stat-item">
                    <span className="stat-label">Overall:</span>
                    <span className="stat-value" style={{ color: getPercentageColor(selectedCourse.percentage) }}>
                      {selectedCourse.percentage}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Present:</span>
                    <span className="stat-value present">{selectedCourse.present}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Late:</span>
                    <span className="stat-value late">{selectedCourse.late}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Absent:</span>
                    <span className="stat-value absent">{selectedCourse.absent}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Classes:</span>
                    <span className="stat-value">{selectedCourse.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default StudentAttendance;