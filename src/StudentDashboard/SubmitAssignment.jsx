import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import StudentActivitiesAPI from "./api/studentActivitiesApi";
import './SubmitAssignment.css';

export default function SubmitAssignment() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  
  const [activity, setActivity] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchActivityDetails();
  }, [activityId]);

  const fetchActivityDetails = async () => {
    try {
      const res = await StudentActivitiesAPI.get(`/activities/${activityId}`);
      if (res.data.success) {
        setActivity(res.data.data.activity);
        
        // Check if already submitted
        if (res.data.data.submission) {
          navigate(`/student/submission/${res.data.data.submission._id}`);
        }
        
        // Check if can submit
        if (!res.data.data.canSubmit) {
          setError("You cannot submit this activity. Deadline may have passed.");
        }
      }
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
      'image/jpeg',
      'image/png',
      'text/plain'
    ];
    
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload PDF, DOC, DOCX, ZIP, JPG, PNG, or TXT.");
      return;
    }
    
    if (selectedFile.size > maxSize) {
      setError("File size exceeds 50MB limit.");
      return;
    }
    
    setFile(selectedFile);
    setError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to submit.");
      return;
    }
    
    setSubmitting(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await StudentActivitiesAPI.post(
        `/activities/${activityId}/submit`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      
      if (res.data.success) {
        alert(res.data.message);
        navigate('/student/activities');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit assignment.");
    } finally {
      setSubmitting(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="submit-loading">
        <div className="submit-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="submit-error">
        <MDBIcon fas icon="exclamation-circle" />
        <h3>Activity not found</h3>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const isOverdue = activity.dueDate && new Date(activity.dueDate) < new Date();

  return (
    <div className="submit-assignment-container">
      {/* Back Button */}
      <button className="submit-back-btn" onClick={() => navigate(-1)}>
        <MDBIcon fas icon="arrow-left" /> Back to Activities
      </button>

      {/* Activity Header */}
      <div className="submit-header-card">
        <div className="submit-header-left">
          <div className="activity-type-badge">
            <MDBIcon fas icon="file-alt" /> Assignment
          </div>
          <h1>{activity.title}</h1>
          <div className="submit-meta">
            <span><MDBIcon fas icon="book" /> {activity.classId?.className} ({activity.classId?.classCode})</span>
            <span><MDBIcon fas icon="user" /> {activity.facultyId?.firstName} {activity.facultyId?.lastName}</span>
            <span><MDBIcon fas icon="chart-bar" /> Total Marks: {activity.totalMarks}</span>
            <span className={isOverdue ? 'overdue' : ''}>
              <MDBIcon fas icon="calendar" /> 
              Due: {activity.dueDate ? new Date(activity.dueDate).toLocaleString() : 'No deadline'}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {activity.instructions && (
        <div className="submit-instructions">
          <h3><MDBIcon fas icon="info-circle" /> Instructions</h3>
          <p>{activity.instructions}</p>
        </div>
      )}

      {/* Description */}
      {activity.description && (
        <div className="submit-description">
          <h3><MDBIcon fas icon="align-left" /> Description</h3>
          <p>{activity.description}</p>
        </div>
      )}

      {/* File Upload Area */}
      <div className="submit-upload-section">
        <h3>Submit Your Work</h3>
        
        {error && (
          <div className="submit-error-message">
            <MDBIcon fas icon="exclamation-triangle" /> {error}
          </div>
        )}
        
        {!file ? (
          <div
            className={`submit-dropzone ${dragActive ? 'active' : ''} ${isOverdue && !activity.allowLateSubmission ? 'disabled' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="dropzone-content">
              <div className="dropzone-icon">
                <MDBIcon fas icon="cloud-upload-alt" />
              </div>
              <h4>Drag & drop your file here</h4>
              <p>or</p>
              <label className="submit-file-label">
                <MDBIcon fas icon="folder-open" /> Browse Files
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.txt"
                  disabled={isOverdue && !activity.allowLateSubmission}
                />
              </label>
              <p className="file-hint">
                Supported formats: PDF, DOC, DOCX, ZIP, JPG, PNG, TXT (Max 50MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="submit-file-preview">
            <div className="file-info">
              <div className="file-icon">
                <MDBIcon fas icon="file" />
              </div>
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
              <button className="file-remove" onClick={removeFile}>
                <MDBIcon fas icon="times" />
              </button>
            </div>
          </div>
        )}

        {/* Late Submission Warning */}
        {isOverdue && activity.allowLateSubmission && (
          <div className="submit-late-warning">
            <MDBIcon fas icon="exclamation-triangle" />
            <span>
              You are submitting late. A penalty of {activity.latePenalty}% per day will be applied.
            </span>
          </div>
        )}

        {/* Submit Button */}
        <div className="submit-actions">
          <button 
            className="submit-btn-cancel" 
            onClick={() => navigate(-1)}
            disabled={submitting}
          >
            Cancel
          </button>
          <button 
            className="submit-btn-primary" 
            onClick={handleSubmit}
            disabled={!file || submitting || (isOverdue && !activity.allowLateSubmission)}
          >
            {submitting ? (
              <><MDBIcon fas icon="spinner" spin /> Submitting...</>
            ) : (
              <><MDBIcon fas icon="paper-plane" /> Submit Assignment</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}