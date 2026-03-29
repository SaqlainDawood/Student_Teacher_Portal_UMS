import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBadge,
  MDBSpinner,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import FacultyAPI from '../../../FacAPI/facultyApi';
import './AttendanceReport.css';

const AttendanceReport = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [classId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('facultyToken');
      
      const response = await FacultyAPI.get(`/attendance/report/${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        setReportData(response.data.data);
      } else {
        toast.error('Failed to load attendance report');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Error loading attendance report');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!reportData) return;
    
    setExporting(true);
    
    // Prepare CSV data
    const headers = ['Roll No', 'Student Name', 'Total Classes', 'Present', 'Late', 'Absent', 'Percentage (%)'];
    const rows = reportData.students.map(student => [
      student.rollNo,
      student.name,
      student.total,
      student.present,
      student.late,
      student.absent,
      student.percentage
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.classInfo.code}_Attendance_Report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setExporting(false);
    toast.success('Report exported successfully!');
  };

  const exportToPDF = () => {
    // For PDF, we'll use window.print
    window.print();
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

  const getAttendanceStats = () => {
    if (!reportData) return { above75: 0, between60_75: 0, below60: 0 };
    
    const above75 = reportData.students.filter(s => s.percentage >= 75).length;
    const between60_75 = reportData.students.filter(s => s.percentage >= 60 && s.percentage < 75).length;
    const below60 = reportData.students.filter(s => s.percentage < 60).length;
    
    return { above75, between60_75, below60, total: reportData.students.length };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="report-loading-container">
        <MDBSpinner role="status" color="success" size="lg">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        <p className="mt-3">Loading attendance report...</p>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="report-error-container">
        <div className="error-card">
          <MDBIcon fas icon="exclamation-circle" size="3x" className="text-danger mb-3" />
          <h4>Unable to load report</h4>
          <p>Please try again later</p>
          <button className="btn btn-success mt-3" onClick={() => window.location.reload()}>
            <MDBIcon fas icon="sync" className="me-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-report-page">
      {/* Header */}
      <div className="report-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/faculty/dashboard')}>
            <MDBIcon fas icon="arrow-left" className="me-2" />
            Back to Dashboard
          </button>
          <h1>Attendance Report</h1>
        </div>
        <div className="header-actions">
          <button className="export-btn csv" onClick={exportToCSV} disabled={exporting}>
            <MDBIcon fas icon="file-csv" className="me-2" />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
          <button className="export-btn pdf" onClick={exportToPDF}>
            <MDBIcon fas icon="file-pdf" className="me-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Class Info Card */}
      <div className="class-info-card">
        <div className="class-info-header">
          <MDBIcon fas icon="chalkboard-teacher" className="info-icon" />
          <div>
            <h2>{reportData.classInfo.subject}</h2>
            <p>{reportData.classInfo.code} | {reportData.classInfo.name}</p>
          </div>
        </div>
        <div className="class-info-details">
          <MDBBadge color="light" pill className="info-badge">
            <MDBIcon fas icon="layer-group" className="me-1" />
            Section {reportData.classInfo.section}
          </MDBBadge>
          <MDBBadge color="light" pill className="info-badge">
            <MDBIcon fas icon="calendar-alt" className="me-1" />
            Semester {reportData.classInfo.semester}
          </MDBBadge>
          <MDBBadge color="light" pill className="info-badge">
            <MDBIcon fas icon="building" className="me-1" />
            {reportData.classInfo.department}
          </MDBBadge>
          <MDBBadge color="light" pill className="info-badge">
            <MDBIcon fas icon="users" className="me-1" />
            {reportData.students.length} Students
          </MDBBadge>
          <MDBBadge color="light" pill className="info-badge">
            <MDBIcon fas icon="calendar-week" className="me-1" />
            Total Classes: {reportData.totalClasses}
          </MDBBadge>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-icon good">
            <MDBIcon fas icon="check-circle" />
          </div>
          <div className="stat-info">
            <h3>{stats.above75}</h3>
            <p>Students Above 75%</p>
            <span className="stat-trend good">Good Standing</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <MDBIcon fas icon="exclamation-triangle" />
          </div>
          <div className="stat-info">
            <h3>{stats.between60_75}</h3>
            <p>Students 60% - 75%</p>
            <span className="stat-trend warning">Needs Attention</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <MDBIcon fas icon="times-circle" />
          </div>
          <div className="stat-info">
            <h3>{stats.below60}</h3>
            <p>Students Below 60%</p>
            <span className="stat-trend danger">Critical</span>
          </div>
        </div>
      </div>

      {/* Overall Attendance Progress */}
      <div className="overall-progress-card">
        <h4>
          <MDBIcon fas icon="chart-line" className="me-2" />
          Overall Class Performance
        </h4>
        <div className="progress-stats">
          <div className="progress-item">
            <div className="progress-label">
              <span>Above 75% (Good)</span>
              <span>{((stats.above75 / stats.total) * 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar-custom">
              <div 
                className="progress-fill good"
                style={{ width: `${(stats.above75 / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>60% - 75% (Warning)</span>
              <span>{((stats.between60_75 / stats.total) * 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar-custom">
              <div 
                className="progress-fill warning"
                style={{ width: `${(stats.between60_75 / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>Below 60% (Critical)</span>
              <span>{((stats.below60 / stats.total) * 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar-custom">
              <div 
                className="progress-fill danger"
                style={{ width: `${(stats.below60 / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Report Table */}
      <div className="report-table-card">
        <div className="table-header">
          <h4>
            <MDBIcon fas icon="users" className="me-2" />
            Student-wise Attendance Details
          </h4>
          <div className="table-stats">
            <span className="total-students">{reportData.students.length} Students</span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Late</th>
                <th>Absent</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
                {reportData.students.map((student, index) => {
                  const status = getStatusBadge(student.percentage);
                  return (
                    <tr key={student.studentId} className={student.percentage < 75 ? 'warning-row' : ''}>
                      <td className="serial">{index + 1}</td>
                      <td className="roll-no">{student.rollNo}</td>
                      <td className="student-name">{student.name}</td>
                      <td>{student.total}</td>
                      <td className="present-count">{student.present}</td>
                      <td className="late-count">{student.late}</td>
                      <td className="absent-count">{student.absent}</td>
                      <td className="percentage-cell">
                        <div className="percentage-wrapper">
                          <span 
                            className="percentage-value"
                            style={{ color: getPercentageColor(student.percentage) }}
                          >
                            {student.percentage}%
                          </span>
                          <div className="mini-progress">
                            <div 
                              className="mini-progress-fill"
                              style={{ 
                                width: `${student.percentage}%`,
                                background: getPercentageColor(student.percentage)
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ background: status.bg, color: status.color }}
                        >
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        {/* Summary Footer */}
        <div className="table-footer">
          <div className="summary-note">
            <MDBIcon fas icon="info-circle" className="me-2" />
            <span>Required minimum attendance: 75%</span>
          </div>
          <div className="legend">
            <span className="legend-dot good"></span>
            <span>Good (≥75%)</span>
            <span className="legend-dot warning"></span>
            <span>Warning (60-74%)</span>
            <span className="legend-dot danger"></span>
            <span>Critical (&lt;60%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;