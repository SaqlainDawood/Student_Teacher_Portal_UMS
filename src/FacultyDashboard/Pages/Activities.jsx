import React, { useState, useEffect, useContext } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import FacultyAPI from "../../FacAPI/facultyApi";
import FacultyActivitiesAPI from "../../FacAPI/facultyActivitiesAPI";
import CreateActivityModal from "./CreateActivityModal";
import './Activities.css'; 

export default function Activities() {
  const { faculty } = useContext(AuthContext);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({});

  const activityTypes = {
    assignment: { icon: "file-alt", label: "Assignment", color: "#3498db" },
    quiz: { icon: "question-circle", label: "Quiz", color: "#9b59b6" },
    presentation: { icon: "file-powerpoint", label: "Presentation", color: "#e67e22" },
    mid_exam: { icon: "pen", label: "Mid Exam", color: "#e74c3c" },
    final_exam: { icon: "graduation-cap", label: "Final Exam", color: "#c0392b" }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await FacultyAPI.get(`/dashboard/${faculty?._id}`);
        
        if (res.data.success) {
          setClasses(res.data.data.classList || []);
          if (res.data.data.classList?.length > 0) {
            setSelectedClass(res.data.data.classList[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    
    if (faculty?._id) fetchClasses();
  }, [faculty]);

  useEffect(() => {
    if (selectedClass) {
      fetchActivities();
    }
  }, [selectedClass, filterType]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const url = `/class/${selectedClass}${filterType !== "all" ? `?type=${filterType}` : ""}`;
      const res = await FacultyActivitiesAPI.get(url);
      
      if (res.data.success) {
        setActivities(res.data.data);
        const statsData = {
          total: res.data.data.length,
          published: res.data.data.filter(a => a.isPublished).length,
          draft: res.data.data.filter(a => !a.isPublished).length,
          ...res.data.stats?.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {})
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm("Are you sure you want to archive this activity?")) return;
    
    try {
      await FacultyActivitiesAPI.delete(`/${activityId}`);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleTogglePublish = async (activityId, currentStatus) => {
    try {
      await FacultyActivitiesAPI.patch(`/${activityId}/publish`, { 
        isPublished: !currentStatus 
      });
      fetchActivities();
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const handleGradeActivity = (activityId, type) => {
    if (type === "presentation") return;
    navigate(`/faculty/grading/${activityId}`);
  };

  const getActivityStatus = (activity) => {
    if (!activity.isPublished) return "draft";
    if (activity.dueDate && new Date(activity.dueDate) < new Date()) return "closed";
    return "published";
  };

  return (
    <div className="activities-container">
      {/* Page Header */}
      <div className="activities-page-header">
        <div className="activities-header-left">
          <h1>Activities & Assessments</h1>
          <p>Manage assignments, quizzes, presentations, and exams</p>
        </div>
        <div className="activities-header-right">
          <button className="activity-btn-secondary" onClick={fetchActivities}>
            <MDBIcon fas icon="sync-alt" /> Refresh
          </button>
          <button className="activity-btn-primary" onClick={() => setShowCreateModal(true)}>
            <MDBIcon fas icon="plus" /> Create New
          </button>
        </div>
      </div>

      {/* Class Selector */}
      <div className="activities-class-selector">
        <MDBIcon fas icon="book" style={{ color: "#7f8c8d" }} />
        <select 
          className="activities-class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.className} ({cls.classCode}) - Semester {cls.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Tabs */}
      <div className="activities-filter-tabs">
        <button 
          className={`activities-filter-tab ${filterType === "all" ? "active" : ""}`}
          onClick={() => setFilterType("all")}
        >
          All <span className="count-badge">{stats.total || 0}</span>
        </button>
        <button 
          className={`activities-filter-tab ${filterType === "assignment" ? "active" : ""}`}
          onClick={() => setFilterType("assignment")}
        >
          <MDBIcon fas icon="file-alt" /> Assignments
        </button>
        <button 
          className={`activities-filter-tab ${filterType === "quiz" ? "active" : ""}`}
          onClick={() => setFilterType("quiz")}
        >
          <MDBIcon fas icon="question-circle" /> Quizzes
        </button>
        <button 
          className={`activities-filter-tab ${filterType === "presentation" ? "active" : ""}`}
          onClick={() => setFilterType("presentation")}
        >
          <MDBIcon fas icon="file-powerpoint" /> Presentations
        </button>
        <button 
          className={`activities-filter-tab ${filterType === "mid_exam" ? "active" : ""}`}
          onClick={() => setFilterType("mid_exam")}
        >
          <MDBIcon fas icon="pen" /> Mid Exams
        </button>
        <button 
          className={`activities-filter-tab ${filterType === "final_exam" ? "active" : ""}`}
          onClick={() => setFilterType("final_exam")}
        >
          <MDBIcon fas icon="graduation-cap" /> Final Exams
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="activities-loading">
          <div className="activities-loading-spinner"></div>
          <p>Loading activities...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && activities.length === 0 && (
        <div className="activities-empty-state">
          <div className="activities-empty-icon">
            <MDBIcon fas icon="folder-open" />
          </div>
          <h3>No activities found</h3>
          <p>Get started by creating your first activity for this class.</p>
          <button className="activity-btn-primary" onClick={() => setShowCreateModal(true)}>
            <MDBIcon fas icon="plus" /> Create Activity
          </button>
        </div>
      )}

      {/* Activities Grid */}
      {!loading && activities.length > 0 && (
        <div className="activities-grid">
          {activities.map((activity) => {
            const typeInfo = activityTypes[activity.type] || activityTypes.assignment;
            const status = getActivityStatus(activity);
            
            return (
              <div key={activity._id} className={`activity-card ${activity.type}`}>
                <div className="activity-card-header">
                  <div className="activity-card-icon">
                    <MDBIcon fas icon={typeInfo.icon} />
                  </div>
                  <div className="activity-card-info">
                    <h3>{activity.title}</h3>
                    <div className="activity-card-meta">
                      <span><MDBIcon fas icon="clock" /> {new Date(activity.createdAt).toLocaleDateString()}</span>
                      <span><MDBIcon fas icon="users" /> {activity.submissionCount || 0} Submissions</span>
                    </div>
                  </div>
                </div>

                <div className="activity-card-body">
                  <p>{activity.description || "No description provided."}</p>
                  
                  {activity.type !== "presentation" && (
                    <div className="activity-card-stats">
                      <div className="activity-stat-item">
                        <span className="activity-stat-value">{activity.totalMarks}</span>
                        <span className="activity-stat-label">Total Marks</span>
                      </div>
                      {activity.dueDate && (
                        <div className="activity-stat-item">
                          <span className="activity-stat-value">
                            {new Date(activity.dueDate).toLocaleDateString()}
                          </span>
                          <span className="activity-stat-label">Due Date</span>
                        </div>
                      )}
                      {activity.type === "quiz" && activity.quizDetails && (
                        <div className="activity-stat-item">
                          <span className="activity-stat-value">{activity.quizDetails.questions?.length || 0}</span>
                          <span className="activity-stat-label">Questions</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activity.type === "presentation" && activity.attachments?.length > 0 && (
                    <div className="activity-card-stats">
                      <div className="activity-stat-item">
                        <span className="activity-stat-value">{activity.attachments.length}</span>
                        <span className="activity-stat-label">Files</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="activity-card-footer">
                  <span className={`activity-status-badge ${status}`}>
                    {status === "published" && <><MDBIcon fas icon="check-circle" /> Published</>}
                    {status === "draft" && <><MDBIcon fas icon="edit" /> Draft</>}
                    {status === "closed" && <><MDBIcon fas icon="lock" /> Closed</>}
                  </span>
                  
                  <div className="activity-card-actions">
                    {activity.type !== "presentation" && (
                      <button 
                        className="activity-icon-btn"
                        onClick={() => handleGradeActivity(activity._id, activity.type)}
                        title="Grade Submissions"
                      >
                        <MDBIcon fas icon="check-double" />
                      </button>
                    )}
                    <button 
                      className="activity-icon-btn"
                      onClick={() => handleTogglePublish(activity._id, activity.isPublished)}
                      title={activity.isPublished ? "Unpublish" : "Publish"}
                    >
                      <MDBIcon fas icon={activity.isPublished ? "eye-slash" : "eye"} />
                    </button>
                    <button 
                      className="activity-icon-btn delete"
                      onClick={() => handleDeleteActivity(activity._id)}
                      title="Archive"
                    >
                      <MDBIcon fas icon="archive" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Activity Modal */}
      {showCreateModal && (
        <CreateActivityModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchActivities();
          }}
          classId={selectedClass}
          classes={classes}
        />
      )}
    </div>
  );
}