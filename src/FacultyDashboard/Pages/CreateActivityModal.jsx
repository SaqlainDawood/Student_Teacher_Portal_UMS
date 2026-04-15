import React, { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import FacultyActivitiesAPI from "../../FacAPI/facultyActivitiesAPI";
import './CreateActivityModal.css';
const ACTIVITY_TYPES = [
  { value: "assignment", label: "Assignment", icon: "file-alt" },
  { value: "quiz", label: "Quiz", icon: "question-circle" },
  { value: "presentation", label: "Presentation", icon: "file-powerpoint" },
  { value: "mid_exam", label: "Mid Exam", icon: "pen" },
  { value: "final_exam", label: "Final Exam", icon: "graduation-cap" }
];

export default function CreateActivityModal({ onClose, onSuccess, classId, classes }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    type: "assignment",
    classId: classId || "",
    totalMarks: 100,
    dueDate: "",
    allowLateSubmission: false,
    latePenalty: 10,
    isPublished: false
  });
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Quiz question handlers
  const addQuestion = () => {
    setQuestions([...questions, {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 1
    }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { ...formData };
      
      // Add quiz details if type is quiz
      if (formData.type === "quiz") {
        if (questions.length === 0) {
          setError("Please add at least one question for the quiz.");
          setLoading(false);
          return;
        }
        payload.quizDetails = { questions };
        payload.totalMarks = questions.reduce((sum, q) => sum + (q.points || 1), 0);
      }
      
      // Remove dueDate for presentations
      if (formData.type === "presentation") {
        delete payload.dueDate;
        delete payload.totalMarks;
      }

      await FacultyActivitiesAPI.post("/", payload);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Activity</h2>
          <button className="modal-close" onClick={onClose}>
            <MDBIcon fas icon="times" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-message" style={{ 
                background: "#fee2e2", 
                color: "#dc2626", 
                padding: "12px", 
                borderRadius: "8px",
                marginBottom: "16px"
              }}>
                <MDBIcon fas icon="exclamation-circle" /> {error}
              </div>
            )}

            {/* Activity Type Selector */}
            <div className="form-group">
              <label>Activity Type</label>
              <div className="type-selector">
                {ACTIVITY_TYPES.map((type) => (
                  <div
                    key={type.value}
                    className={`type-option ${formData.type === type.value ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, type: type.value })}
                  >
                    <MDBIcon fas icon={type.icon} />
                    <span>{type.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Selection */}
            <div className="form-group">
              <label>Select Class</label>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                required
              >
                <option value="">Choose a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.className} ({cls.classCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Assignment 1: Introduction to React"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief description of this activity..."
              />
            </div>

            {/* Instructions */}
            {formData.type !== "presentation" && formData.type !== "quiz" && (
              <div className="form-group">
                <label>Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Detailed instructions for students..."
                />
              </div>
            )}

            {/* Marks and Due Date */}
            {formData.type !== "presentation" && (
              <div className="form-row">
                <div className="form-group">
                  <label>Total Marks</label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Late Submission Settings */}
            {formData.type !== "presentation" && (
              <>
                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      name="allowLateSubmission"
                      checked={formData.allowLateSubmission}
                      onChange={handleChange}
                    />
                    Allow Late Submission
                  </label>
                </div>
                
                {formData.allowLateSubmission && (
                  <div className="form-group">
                    <label>Late Penalty (% per day)</label>
                    <input
                      type="number"
                      name="latePenalty"
                      value={formData.latePenalty}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                  </div>
                )}
              </>
            )}

            {/* Quiz Builder */}
            {formData.type === "quiz" && (
              <div className="quiz-builder">
                <label style={{ marginBottom: "12px", display: "block", fontWeight: "500" }}>
                  Quiz Questions
                </label>
                
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="question-card">
                    <div className="question-header">
                      <span className="question-number">Question {qIndex + 1}</span>
                      <button
                        type="button"
                        className="icon-btn delete"
                        onClick={() => removeQuestion(qIndex)}
                      >
                        <MDBIcon fas icon="trash" />
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      className="question-input"
                      placeholder="Enter your question"
                      value={q.questionText}
                      onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
                    />
                    
                    <div className="options-list">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="option-item">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            className="option-radio"
                            checked={q.correctAnswer === optIndex}
                            onChange={() => updateQuestion(qIndex, "correctAnswer", optIndex)}
                          />
                          <input
                            type="text"
                            className="option-input"
                            placeholder={`Option ${optIndex + 1}`}
                            value={opt}
                            onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <label style={{ fontSize: "13px" }}>Points:</label>
                      <input
                        type="number"
                        className="points-input"
                        value={q.points}
                        onChange={(e) => updateQuestion(qIndex, "points", parseInt(e.target.value) || 1)}
                        min="1"
                      />
                    </div>
                  </div>
                ))}
                
                <button type="button" className="add-question-btn" onClick={addQuestion}>
                  <MDBIcon fas icon="plus-circle" /> Add Question
                </button>
              </div>
            )}

            {/* Publish Option */}
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
                Publish immediately (students will see this activity)
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <><MDBIcon fas icon="spinner" spin /> Creating...</>
              ) : (
                <><MDBIcon fas icon="plus" /> Create Activity</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}