import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import FacultyGradingAPI from "../../api/facultyGradingAPI";
import './Faculty.css';

export default function MarkingList() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [markingList, setMarkingList] = useState([]);
  const [summary, setSummary] = useState({});
  const [grades, setGrades] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [saving, setSaving] = useState({});
  const [autoSaving, setAutoSaving] = useState(false);

  useEffect(() => {
    fetchMarkingList();
  }, [activityId]);

  const fetchMarkingList = async () => {
    setLoading(true);
    try {
      const res = await FacultyGradingAPI.get(`/activity/${activityId}`);
      
      if (res.data.success) {
        setActivity(res.data.data.activity);
        setClassInfo(res.data.data.class);
        setMarkingList(res.data.data.markingList);
        setSummary(res.data.data.summary);
        
        // Initialize grades and feedbacks
        const initialGrades = {};
        const initialFeedbacks = {};
        res.data.data.markingList.forEach(item => {
          if (item.submission) {
            initialGrades[item.submission._id] = item.submission.obtainedMarks || "";
            initialFeedbacks[item.submission._id] = item.submission.feedback || "";
          }
        });
        setGrades(initialGrades);
        setFeedbacks(initialFeedbacks);
      }
    } catch (error) {
      console.error("Error fetching marking list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (submissionId, value) => {
    setGrades(prev => ({ ...prev, [submissionId]: value }));
  };

  const handleFeedbackChange = (submissionId, value) => {
    setFeedbacks(prev => ({ ...prev, [submissionId]: value }));
  };

  const saveGrade = async (submissionId) => {
    const obtainedMarks = grades[submissionId];
    const feedback = feedbacks[submissionId];
    
    if (obtainedMarks === "" || obtainedMarks === undefined) return;
    
    setSaving(prev => ({ ...prev, [submissionId]: true }));
    
    try {
      await FacultyGradingAPI.put(
        `/activity/${activityId}/submission/${submissionId}`,
        { obtainedMarks: parseFloat(obtainedMarks), feedback }
      );
      
      // Update local state
      setMarkingList(prev => prev.map(item => {
        if (item.submission?._id === submissionId) {
          return {
            ...item,
            submission: {
              ...item.submission,
              obtainedMarks: parseFloat(obtainedMarks),
              feedback,
              status: "graded"
            }
          };
        }
        return item;
      }));
      
      setSummary(prev => ({
        ...prev,
        graded: prev.graded + (markingList.find(m => m.submission?._id === submissionId)?.submission?.status !== "graded" ? 1 : 0)
      }));
      
    } catch (error) {
      console.error("Error saving grade:", error);
      alert("Failed to save grade. Please try again.");
    } finally {
      setSaving(prev => ({ ...prev, [submissionId]: false }));
    }
  };

  const saveAllGrades = async () => {
    setAutoSaving(true);
    
    const gradesToSave = Object.entries(grades)
      .filter(([submissionId, marks]) => marks !== "" && marks !== undefined)
      .map(([submissionId, marks]) => ({
        submissionId,
        obtainedMarks: parseFloat(marks),
        feedback: feedbacks[submissionId] || ""
      }));
    
    if (gradesToSave.length === 0) {
      setAutoSaving(false);
      return;
    }
    
    try {
      await FacultyGradingAPI.put(
        `/activity/${activityId}/bulk-grade`,
        { grades: gradesToSave }
      );
      
      fetchMarkingList();
      alert(`Successfully saved ${gradesToSave.length} grades!`);
    } catch (error) {
      console.error("Error saving grades:", error);
      alert("Failed to save grades. Please try again.");
    } finally {
      setAutoSaving(false);
    }
  };

  const handleAutoGrade = async () => {
    if (!window.confirm("Auto-grade all quiz submissions?")) return;
    
    try {
      const res = await FacultyGradingAPI.post(`/activity/${activityId}/auto-grade`);
      alert(res.data.message);
      fetchMarkingList();
    } catch (error) {
      console.error("Error auto-grading:", error);
    }
  };

  const handleExport = async () => {
    try {
      const res = await FacultyGradingAPI.get(`/activity/${activityId}/export?format=csv`);
      
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grades_${activity?.title || "export"}.csv`;
      a.click();
    } catch (error) {
      console.error("Error exporting grades:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p style={{ marginTop: 16, color: "#7f8c8d" }}>Loading marking list...</p>
      </div>
    );
  }

  return (
    <div className="marking-container">
      {/* Back Button */}
      <button 
        className="btn-secondary" 
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        <MDBIcon fas icon="arrow-left" /> Back to Activities
      </button>

      {/* Activity Header */}
      <div className="marking-header">
        <div className="marking-title">
          <h2>{activity?.title}</h2>
          <div className="marking-meta">
            <span><MDBIcon fas icon="book" /> {classInfo?.name} ({classInfo?.code})</span>
            <span><MDBIcon fas icon="chart-bar" /> Total Marks: {activity?.totalMarks}</span>
            {activity?.dueDate && (
              <span><MDBIcon fas icon="calendar" /> Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
        
        <div className="marking-stats">
          <div className="stat-card">
            <div className="stat-number">{summary.total || 0}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#3498db" }}>{summary.submitted || 0}</div>
            <div className="stat-label">Submitted</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#e74c3c" }}>{summary.notSubmitted || 0}</div>
            <div className="stat-label">Not Submitted</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#27ae60" }}>{summary.graded || 0}</div>
            <div className="stat-label">Graded</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#f39c12" }}>{summary.pending || 0}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {activity?.type === "quiz" && (
          <button className="btn-secondary" onClick={handleAutoGrade}>
            <MDBIcon fas icon="magic" /> Auto-Grade Quiz
          </button>
        )}
        <button className="btn-secondary" onClick={handleExport}>
          <MDBIcon fas icon="download" /> Export Grades
        </button>
        <button className="btn-primary" onClick={saveAllGrades} disabled={autoSaving}>
          {autoSaving ? (
            <><MDBIcon fas icon="spinner" spin /> Saving...</>
          ) : (
            <><MDBIcon fas icon="save" /> Save All Grades</>
          )}
        </button>
      </div>

      {/* Marking Table */}
      <div className="marking-table-container">
        <table className="marking-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Grade (/{activity?.totalMarks})</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {markingList.map((item) => {
              const submissionId = item.submission?._id;
              const isGraded = item.submission?.status === "graded";
              const isSaving = saving[submissionId];
              
              return (
                <tr key={item.student._id}>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        {item.student.name?.charAt(0) || "S"}
                      </div>
                      <div className="student-details">
                        <span className="student-name">{item.student.name}</span>
                        <span className="student-roll">{item.student.registrationNo}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.student.rollNo || "-"}</td>
                  <td>
                    <span className={`status-indicator ${item.submissionStatus}`}>
                      {item.submissionStatus === "submitted" && (
                        isGraded ? (
                          <><MDBIcon fas icon="check-circle" style={{ color: "#27ae60" }} /> Graded</>
                        ) : (
                          <><MDBIcon fas icon="clock" style={{ color: "#3498db" }} /> Pending</>
                        )
                      )}
                      {item.submissionStatus === "not_submitted" && (
                        <><MDBIcon fas icon="times-circle" style={{ color: "#e74c3c" }} /> Not Submitted</>
                      )}
                      {item.isLate && (
                        <span className="status-indicator late" style={{ marginLeft: "8px" }}>
                          Late ({item.lateDays}d)
                        </span>
                      )}
                    </span>
                  </td>
                  <td>
                    {item.submission ? (
                      <a 
                        href={`${import.meta.env.VITE_API_URL}${item.submission.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "#3498db" }}
                      >
                        <MDBIcon fas icon="file-download" /> View
                      </a>
                    ) : "-"}
                  </td>
                  <td>
                    {item.submissionStatus === "submitted" ? (
                      <input
                        type="number"
                        className={`grade-input ${isGraded ? "graded" : ""}`}
                        value={grades[submissionId] || ""}
                        onChange={(e) => handleGradeChange(submissionId, e.target.value)}
                        onBlur={() => saveGrade(submissionId)}
                        min="0"
                        max={activity?.totalMarks}
                        step="0.5"
                        disabled={isSaving}
                      />
                    ) : (
                      <span style={{ color: "#7f8c8d" }}>-</span>
                    )}
                  </td>
                  <td>
                    {item.submissionStatus === "submitted" ? (
                      <input
                        type="text"
                        className="feedback-input"
                        placeholder="Add feedback..."
                        value={feedbacks[submissionId] || ""}
                        onChange={(e) => handleFeedbackChange(submissionId, e.target.value)}
                        onBlur={() => saveGrade(submissionId)}
                        disabled={isSaving}
                      />
                    ) : (
                      <span style={{ color: "#7f8c8d" }}>-</span>
                    )}
                  </td>
                  <td>
                    {item.submissionStatus === "submitted" && (
                      <button
                        className="icon-btn"
                        onClick={() => saveGrade(submissionId)}
                        disabled={isSaving}
                        title="Save Grade"
                      >
                        {isSaving ? (
                          <MDBIcon fas icon="spinner" spin />
                        ) : (
                          <MDBIcon fas icon="save" />
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}