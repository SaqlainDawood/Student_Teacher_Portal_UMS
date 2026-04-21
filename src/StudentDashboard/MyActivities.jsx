import React, { useState, useEffect, useContext } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { AuthContext } from "../FacultyDashboard/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import StudentActivitiesAPI from "./api/studentActivitiesApi";
import './MyActivities.css';

export default function MyActivities() {
  const { student } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activitiesData, setActivitiesData] = useState({ classes: [], summary: {} });
  const [filterType, setFilterType] = useState("all");
  const [expandedClasses, setExpandedClasses] = useState({});

  const activityTypeIcons = {
    assignment: { icon: "file-alt", color: "#3498db", label: "Assignment" },
    quiz: { icon: "question-circle", color: "#9b59b6", label: "Quiz" },
    presentation: { icon: "file-powerpoint", color: "#e67e22", label: "Presentation" },
    mid_exam: { icon: "pen", color: "#e74c3c", label: "Mid Exam" },
    final_exam: { icon: "graduation-cap", color: "#c0392b", label: "Final Exam" }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await StudentActivitiesAPI.get('/activities');
      if (res.data.success) {
        setActivitiesData(res.data.data);
        // Auto-expand all classes
        const expanded = {};
        res.data.data.classes.forEach(cls => {
          expanded[cls.classInfo._id] = true;
        });
        setExpandedClasses(expanded);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
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

  const handleActivityAction = (activity) => {
    if (activity.type === 'presentation') {
      // View presentation
      navigate(`/student/presentation/${activity._id}`);
    } else if (activity.submissionStatus === 'not_submitted') {
      if (activity.type === 'quiz') {
        navigate(`/student/take-quiz/${activity._id}`);
      } else {
        navigate(`/student/submit/${activity._id}`);
      }
    } else {
      // View submission/grade
      navigate(`/student/submission/${activity.submission?._id}`);
    }
  };

  const getActionButtonText = (activity) => {
    if (activity.type === 'presentation') {
      return { text: 'View', icon: 'eye' };
    }
    
    switch (activity.submissionStatus) {
      case 'not_submitted':
        if (activity.isOverdue) {
          return { text: 'Overdue', icon: 'exclamation-triangle', className: 'overdue' };
        }
        return activity.type === 'quiz' 
          ? { text: 'Take Quiz', icon: 'play' }
          : { text: 'Submit', icon: 'upload' };
      case 'submitted':
        return { text: 'Submitted', icon: 'check', className: 'submitted' };
      case 'graded':
        return { text: 'View Grade', icon: 'chart-bar', className: 'graded' };
      default:
        return { text: 'View', icon: 'eye' };
    }
  };

  const getStatusBadge = (activity) => {
    if (activity.type === 'presentation') return null;
    
    if (activity.submissionStatus === 'graded') {
      return (
        <span className="student-status-badge graded">
          {activity.submission?.obtainedMarks}/{activity.totalMarks}
        </span>
      );
    }
    
    if (activity.submissionStatus === 'submitted') {
      return (
        <span className="student-status-badge submitted">
          Submitted
        </span>
      );
    }
    
    if (activity.isOverdue) {
      return (
        <span className="student-status-badge overdue">
          Overdue
        </span>
      );
    }
    
    if (activity.timeRemaining !== null) {
      const urgent = activity.timeRemaining <= 2;
      return (
        <span className={`student-status-badge ${urgent ? 'urgent' : 'pending'}`}>
          {activity.timeRemaining} {activity.timeRemaining === 1 ? 'day' : 'days'} left
        </span>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="student-loading">
        <div className="student-loading-spinner"></div>
        <p>Loading your activities...</p>
      </div>
    );
  }

  return (
    <div className="student-activities-container">
      {/* Header */}
      <div className="student-page-header">
        <div className="student-header-left">
          <h1>My Activities</h1>
          <p>View and submit assignments, quizzes, and track your progress</p>
        </div>
        <div className="student-header-right">
          <button className="student-btn-secondary" onClick={fetchActivities}>
            <MDBIcon fas icon="sync-alt" /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="student-summary-cards">
        <div className="student-summary-card">
          <div className="summary-icon pending">
            <MDBIcon fas icon="clock" />
          </div>
          <div className="summary-content">
            <span className="summary-value">{activitiesData.summary?.pendingSubmissions || 0}</span>
            <span className="summary-label">Pending</span>
          </div>
        </div>
        <div className="student-summary-card">
          <div className="summary-icon overdue">
            <MDBIcon fas icon="exclamation-circle" />
          </div>
          <div className="summary-content">
            <span className="summary-value">{activitiesData.summary?.overdueSubmissions || 0}</span>
            <span className="summary-label">Overdue</span>
          </div>
        </div>
        <div className="student-summary-card">
          <div className="summary-icon completed">
            <MDBIcon fas icon="check-circle" />
          </div>
          <div className="summary-content">
            <span className="summary-value">{activitiesData.summary?.completedActivities || 0}</span>
            <span className="summary-label">Completed</span>
          </div>
        </div>
        <div className="student-summary-card">
          <div className="summary-icon graded">
            <MDBIcon fas icon="star" />
          </div>
          <div className="summary-content">
            <span className="summary-value">{activitiesData.summary?.gradedActivities || 0}</span>
            <span className="summary-label">Graded</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="student-filter-tabs">
        <button 
          className={`student-filter-tab ${filterType === "all" ? "active" : ""}`}
          onClick={() => setFilterType("all")}
        >
          All Activities
        </button>
        <button 
          className={`student-filter-tab ${filterType === "pending" ? "active" : ""}`}
          onClick={() => setFilterType("pending")}
        >
          Pending
        </button>
        <button 
          className={`student-filter-tab ${filterType === "completed" ? "active" : ""}`}
          onClick={() => setFilterType("completed")}
        >
          Completed
        </button>
      </div>

      {/* Classes and Activities */}
      <div className="student-classes-list">
        {activitiesData.classes?.length === 0 ? (
          <div className="student-empty-state">
            <div className="empty-icon">
              <MDBIcon fas icon="book-open" />
            </div>
            <h3>No activities found</h3>
            <p>You don't have any activities assigned yet.</p>
          </div>
        ) : (
          activitiesData.classes?.map(classGroup => (
            <div key={classGroup.classInfo._id} className="student-class-card">
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
                <div className="class-meta">
                  <span className="activity-count">
                    {classGroup.activities.length} activities
                  </span>
                  <MDBIcon 
                    fas icon={expandedClasses[classGroup.classInfo._id] ? "chevron-up" : "chevron-down"} 
                  />
                </div>
              </div>

              {/* Activities List */}
              {expandedClasses[classGroup.classInfo._id] && (
                <div className="class-activities">
                  {classGroup.activities
                    .filter(activity => {
                      if (filterType === "pending") {
                        return activity.type !== 'presentation' && 
                               activity.submissionStatus === 'not_submitted';
                      }
                      if (filterType === "completed") {
                        return activity.type === 'presentation' || 
                               activity.submissionStatus !== 'not_submitted';
                      }
                      return true;
                    })
                    .map(activity => {
                      const typeInfo = activityTypeIcons[activity.type] || activityTypeIcons.assignment;
                      const actionBtn = getActionButtonText(activity);
                      const statusBadge = getStatusBadge(activity);
                      
                      return (
                        <div key={activity._id} className={`student-activity-item ${activity.type}`}>
                          <div className="activity-main">
                            <div className="activity-icon" style={{ backgroundColor: `${typeInfo.color}15` }}>
                              <MDBIcon fas icon={typeInfo.icon} style={{ color: typeInfo.color }} />
                            </div>
                            <div className="activity-details">
                              <h4>{activity.title}</h4>
                              <div className="activity-meta">
                                <span><MDBIcon fas icon="calendar" /> Due: {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No deadline'}</span>
                                {activity.type !== 'presentation' && (
                                  <span><MDBIcon fas icon="chart-bar" /> {activity.totalMarks} marks</span>
                                )}
                                {activity.isLate && (
                                  <span className="late-indicator">
                                    <MDBIcon fas icon="exclamation-triangle" /> Late
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="activity-actions">
                              {statusBadge}
                              <button 
                                className={`student-action-btn ${actionBtn.className || ''}`}
                                onClick={() => handleActivityAction(activity)}
                              >
                                <MDBIcon fas icon={actionBtn.icon} /> {actionBtn.text}
                              </button>
                            </div>
                          </div>
                          
                          {/* Show grade if available */}
                          {activity.submission?.status === 'graded' && (
                            <div className="activity-grade-preview">
                              <div className="grade-info">
                                <span className="grade-score">
                                  {activity.submission.obtainedMarks} / {activity.totalMarks}
                                </span>
                                <span className="grade-percentage">
                                  ({((activity.submission.obtainedMarks / activity.totalMarks) * 100).toFixed(1)}%)
                                </span>
                              </div>
                              {activity.submission.feedback && (
                                <p className="grade-feedback">
                                  <MDBIcon fas icon="comment" /> {activity.submission.feedback}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  
                  {classGroup.activities.filter(activity => {
                    if (filterType === "pending") {
                      return activity.type !== 'presentation' && 
                             activity.submissionStatus === 'not_submitted';
                    }
                    if (filterType === "completed") {
                      return activity.type === 'presentation' || 
                             activity.submissionStatus !== 'not_submitted';
                    }
                    return true;
                  }).length === 0 && (
                    <div className="no-activities-message">
                      <MDBIcon fas icon="info-circle" /> No activities in this category
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}