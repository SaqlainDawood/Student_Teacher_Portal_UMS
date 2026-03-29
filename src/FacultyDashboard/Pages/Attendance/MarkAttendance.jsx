import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBRow,
//   MDBCol,
  MDBIcon,
  MDBBadge,
  MDBSpinner,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import FacultyAPI from '../../../FacAPI/facultyApi';
import './MarkAttendance.css';

const MarkAttendance = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [globalRemarks, setGlobalRemarks] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchClassStudents();
  }, [classId, selectedDate]);

  const fetchClassStudents = async () => {
    try {
      setLoading(true);
      const facultyId = localStorage.getItem('facultyId');
      const token = localStorage.getItem('facultyToken');

      const response = await FacultyAPI.get(`/class/${classId}/students?date=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        setClassData(response.data.data);
        setStudents(response.data.data.students);
      } else {
        toast.error('Failed to load student data');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error loading student list');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setStudents(prev => prev.map(student =>
      student.studentId === studentId
        ? { ...student, status }
        : student
    ));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setStudents(prev => prev.map(student =>
      student.studentId === studentId
        ? { ...student, remarks }
        : student
    ));
  };

  const handleSelectAll = () => {
    const newStatus = !selectAll ? 'present' : 'unmarked';
    setStudents(prev => prev.map(student => ({
      ...student,
      status: newStatus
    })));
    setSelectAll(!selectAll);
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(student => ({
      ...student,
      status: 'present'
    })));
    setSelectAll(true);
    toast.info('All students marked as present');
  };

  const handleMarkAllAbsent = () => {
    setStudents(prev => prev.map(student => ({
      ...student,
      status: 'absent'
    })));
    setSelectAll(false);
    toast.info('All students marked as absent');
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      const facultyId = localStorage.getItem('facultyId');
      const token = localStorage.getItem('facultyToken');

      const attendanceData = students.map(student => ({
        studentId: student.studentId,
        status: student.status !== 'unmarked' ? student.status : 'absent',
        studentRemarks: student.remarks
      }));

      const response = await FacultyAPI.post('/attendance/mark', {
        classId,
        date: selectedDate,
        attendanceData,
        facultyId,
        remarks: globalRemarks
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        toast.success('Attendance saved successfully!');
        navigate('/faculty/dashboard');
      } else {
        toast.error(response.data?.message || 'Failed to save attendance');
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('Error saving attendance');
    } finally {
      setSaving(false);
    }
  };

  const getStatusCount = () => {
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    const unmarked = students.filter(s => s.status === 'unmarked').length;
    return { present, absent, late, unmarked };
  };

  const statusCount = getStatusCount();

  if (loading) {
    return (
      <div className="loading-container">
        <MDBSpinner role="status" color="primary" size="lg">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        <p className="mt-3">Loading student list...</p>
      </div>
    );
  }

  return (
    <div className="mark-attendance-page">
      <div className="attendance-header">
        <button className="back-btn" onClick={() => navigate('/faculty/dashboard')}>
          <MDBIcon fas icon="arrow-left" className="me-2" />
          Back to Dashboard
        </button>
        <h1>Mark Attendance</h1>
      </div>

      {/* Class Info Card */}
      <div className="class-info-card">
        <div className="class-info-header">
          <MDBIcon fas icon="chalkboard-teacher" className="info-icon" />
          <div>
            <h2>{classData?.subject}</h2>
            <p>{classData?.classCode} | {classData?.className}</p>
          </div>
        </div>
        <div className="class-info-details">
          <MDBBadge color="light" pill>
            <MDBIcon fas icon="layer-group" className="me-1" />
            Section {classData?.section}
          </MDBBadge>
          <MDBBadge color="light" pill>
            <MDBIcon fas icon="calendar-alt" className="me-1" />
            Semester {classData?.semester}
          </MDBBadge>
          <MDBBadge color="light" pill>
            <MDBIcon fas icon="users" className="me-1" />
            {classData?.totalStudents} Students
          </MDBBadge>
        </div>
      </div>

      {/* Attendance Controls */}
      <div className="attendance-controls">
        <div className="date-selector">
          <MDBIcon fas icon="calendar-alt" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="bulk-actions">
          <button className="bulk-btn present" onClick={handleMarkAllPresent}>
            <MDBIcon fas icon="check-circle" className="me-1" />
            Mark All Present
          </button>
          <button className="bulk-btn absent" onClick={handleMarkAllAbsent}>
            <MDBIcon fas icon="times-circle" className="me-1" />
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-summary present">
          <span className="stat-count">{statusCount.present}</span>
          <span className="stat-label">Present</span>
        </div>
        <div className="stat-summary absent">
          <span className="stat-count">{statusCount.absent}</span>
          <span className="stat-label">Absent</span>
        </div>
        <div className="stat-summary late">
          <span className="stat-count">{statusCount.late}</span>
          <span className="stat-label">Late</span>
        </div>
        <div className="stat-summary unmarked">
          <span className="stat-count">{statusCount.unmarked}</span>
          <span className="stat-label">Unmarked</span>
        </div>
      </div>

      {/* Student List */}
      <div className="student-list-card">
        <div className="student-list-header">
          <h3>
            <MDBIcon fas icon="users" className="me-2" />
            Student List
          </h3>
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span>Select All (Present)</span>
          </label>
        </div>

        <div className="student-table-responsive">
          <table className="student-attendance-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId} className={student.status === 'present' ? 'row-present' : student.status === 'absent' ? 'row-absent' : student.status === 'late' ? 'row-late' : ''}>
                  <td>{student.rollNo}</td>
                  <td>
                    <div className="student-info-cell">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>
                      <span className="student-name">{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="status-buttons">
                      <button
                        className={`status-btn present ${student.status === 'present' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student.studentId, 'present')}
                      >
                        <MDBIcon fas icon="check" />
                        P
                      </button>
                      <button
                        className={`status-btn absent ${student.status === 'absent' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student.studentId, 'absent')}
                      >
                        <MDBIcon fas icon="times" />
                        A
                      </button>
                      <button
                        className={`status-btn late ${student.status === 'late' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(student.studentId, 'late')}
                      >
                        <MDBIcon fas icon="clock" />
                        L
                      </button>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="remarks-input"
                      placeholder="Optional remarks"
                      value={student.remarks || ''}
                      onChange={(e) => handleRemarksChange(student.studentId, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Remarks */}
        <div className="global-remarks">
          <label>Global Remarks (applies to all students):</label>
          <textarea
            className="global-remarks-input"
            rows="2"
            placeholder="Add general remarks for this class session..."
            value={globalRemarks}
            onChange={(e) => setGlobalRemarks(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="save-actions">
          <button className="save-btn" onClick={handleSaveAttendance} disabled={saving}>
            {saving ? (
              <>
                <MDBSpinner size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <MDBIcon fas icon="save" className="me-2" />
                Save Attendance
              </>
            )}
          </button>
          <button className="cancel-btn" onClick={() => navigate('/faculty/dashboard')}>
            <MDBIcon fas icon="times" className="me-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;