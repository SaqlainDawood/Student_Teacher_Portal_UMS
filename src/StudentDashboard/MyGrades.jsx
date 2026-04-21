import React, { useState, useEffect, useContext } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { AuthContext } from "../FacultyDashboard/Context/AuthContext";
import StudentActivitiesAPI from "./api/studentActivitiesApi";
import './MyGrades.css';

export default function MyGrades() {
  const { student } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  const [gradesData, setGradesData] = useState({ overallStats: {}, classes: [], recentGrades: [] });
  const [expandedClasses, setExpandedClasses] = useState({});
  const [selectedClass, setSelectedClass] = useState("all");

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const res = await StudentActivitiesAPI.get('/grades');
      if (res.data.success) {
        setGradesData(res.data.data);
        
        // Auto-expand all classes
        const expanded = {};
        res.data.data.classes.forEach(cls => {
          expanded[cls.classInfo._id] = true;
        });
        setExpandedClasses(expanded);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleClassExpand = (classId) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 70) return 'average';
    if (percentage >= 60) return 'pass';
    return 'fail';
  };

  const filteredClasses = selectedClass === "all" 
    ? gradesData.classes 
    : gradesData.classes.filter(c => c.classInfo._id === selectedClass);

  if (loading) {
    return (
      <div className="grades-loading">
        <div className="grades-loading-spinner"></div>
        <p>Loading your grades...</p>
      </div>
    );
  }

  return (
    <div className="grades-container">
      {/* Header */}
      <div className="grades-page-header">
        <div className="grades-header-left">
          <h1>My Grades</h1>
          <p>View your academic performance across all courses</p>
        </div>
        <div className="grades-header-right">
          <button className="grades-btn-secondary" onClick={fetchGrades}>
            <MDBIcon fas icon="sync-alt" /> Refresh
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grades-overall-card">
        <div className="overall-stat">
          <div className="stat-circle">
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e9ecef"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#27ae60"
                strokeWidth="3"
                strokeDasharray={`${gradesData.overallStats?.averagePercentage || 0}, 100`}
              />
            </svg>
            <span className="circle-value">{gradesData.overallStats?.averagePercentage || 0}%</span>
          </div>
          <span className="stat-label">Overall Average</span>
        </div>
        
        <div className="overall-stats-grid">
          <div className="overall-stat-item">
            <span className="stat-value">{gradesData.overallStats?.totalActivities || 0}</span>
            <span className="stat-label">Total Activities</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-value">{gradesData.overallStats?.totalMarksObtained || 0}</span>
            <span className="stat-label">Marks Obtained</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-value">{gradesData.overallStats?.totalMarksPossible || 0}</span>
            <span className="stat-label">Total Marks</span>
          </div>
        </div>
      </div>

      {/* Class Filter */}
      <div className="grades-filter">
        <select 
          className="class-filter-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="all">All Classes</option>
          {gradesData.classes?.map(cls => (
            <option key={cls.classInfo._id} value={cls.classInfo._id}>
              {cls.classInfo.className} ({cls.classInfo.classCode})
            </option>
          ))}
        </select>
      </div>

      {/* Classes and Grades */}
      <div className="grades-classes-list">
        {filteredClasses?.length === 0 ? (
          <div className="grades-empty-state">
            <div className="empty-icon">
              <MDBIcon fas icon="chart-bar" />
            </div>
            <h3>No grades available</h3>
            <p>Your graded activities will appear here.</p>
          </div>
        ) : (
          filteredClasses?.map(classGroup => (
            <div key={classGroup.classInfo._id} className="grades-class-card">
              {/* Class Header */}
              <div 
                className="class-header"
                onClick={() => toggleClassExpand(classGroup.classInfo._id)}
              >
                <div className="class-info">
                  <div className="class-icon">
                    <MDBIcon fas icon="book" />
                  </div>
                  <div className="class-details">
                    <h3>{classGroup.classInfo.className}</h3>
                    <span>{classGroup.classInfo.classCode} • {classGroup.classInfo.subject}</span>
                  </div>
                </div>
                <div className="class-grade-summary">
                  <div className="class-percentage">
                    <span className={`percentage-value ${getGradeColor(classGroup.classStats.percentage)}`}>
                      {classGroup.classStats.percentage}%
                    </span>
                  </div>
                  <div className="class-marks">
                    {classGroup.classStats.totalObtained} / {classGroup.classStats.totalPossible}
                  </div>
                  <MDBIcon 
                    fas icon={expandedClasses[classGroup.classInfo._id] ? "chevron-up" : "chevron-down"} 
                  />
                </div>
              </div>

              {/* Grades List */}
              {expandedClasses[classGroup.classInfo._id] && (
                <div className="class-grades-list">
                  <table className="grades-table">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Type</th>
                        <th>Submitted</th>
                        <th>Grade</th>
                        <th>Percentage</th>
                        <th>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classGroup.submissions.map(submission => {
                        const gradeColor = getGradeColor(submission.percentage);
                        
                        return (
                          <tr key={submission._id}>
                            <td className="activity-title">{submission.activityTitle}</td>
                            <td>
                              <span className={`activity-type-badge ${submission.activityType}`}>
                                {submission.activityType}
                              </span>
                            </td>
                            <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                            <td className="grade-value">
                              {submission.obtainedMarks} / {submission.totalMarks}
                            </td>
                            <td>
                              <span className={`percentage-badge ${gradeColor}`}>
                                {submission.percentage}%
                              </span>
                            </td>
                            <td className="feedback-cell">
                              {submission.feedback ? (
                                <span className="feedback-text">{submission.feedback}</span>
                              ) : (
                                <span className="no-feedback">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Recent Grades */}
      {gradesData.recentGrades?.length > 0 && (
        <div className="grades-recent-section">
          <h3>Recent Grades</h3>
          <div className="recent-grades-grid">
            {gradesData.recentGrades.map(grade => (
              <div key={grade._id} className="recent-grade-card">
                <div className="recent-grade-header">
                  <span className="recent-class">{grade.className}</span>
                  <span className={`recent-percentage ${getGradeColor(grade.percentage)}`}>
                    {grade.percentage}%
                  </span>
                </div>
                <h4>{grade.activityTitle}</h4>
                <div className="recent-grade-footer">
                  <span>{grade.obtainedMarks} / {grade.totalMarks}</span>
                  <span>{new Date(grade.gradedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}