import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import StudentActivitiesAPI from "../../api/studentActivitiesAPI";
import './TakeQuiz.css';

export default function TakeQuiz() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  
  const [activity, setActivity] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState("");
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    fetchQuizDetails();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activityId]);

  const fetchQuizDetails = async () => {
    try {
      const res = await StudentActivitiesAPI.get(`/activities/${activityId}`);
      if (res.data.success) {
        setActivity(res.data.data.activity);
        
        if (res.data.data.submission) {
          navigate(`/student/activities`);
          return;
        }
        
        if (!res.data.data.canSubmit) {
          setError("You cannot take this quiz. Maximum attempts reached or deadline passed.");
        }
        
        if (res.data.data.attemptsRemaining === 0) {
          setError("You have reached the maximum number of attempts for this quiz.");
        }
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    startTimeRef.current = Date.now();
    
    const timeLimit = activity.quizDetails?.timeLimit;
    if (timeLimit) {
      setTimeLeft(timeLimit * 60);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    const questions = activity.quizDetails?.questions || [];
    const unanswered = questions.filter(q => answers[q._id] === undefined).length;
    
    if (unanswered > 0) {
      if (!window.confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
        return;
      }
    }
    
    setSubmitting(true);
    
    try {
      const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      const answersArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption
      }));
      
      const res = await StudentActivitiesAPI.post(`/activities/${activityId}/quiz-submit`, {
        answers: answersArray,
        timeTaken
      });
      
      if (res.data.success) {
        if (timerRef.current) clearInterval(timerRef.current);
        
        alert(`Quiz submitted! Your score: ${res.data.data.obtainedMarks}/${res.data.data.totalMarks}`);
        navigate('/student/activities');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit quiz.");
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="quiz-loading-spinner"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="quiz-error">
        <MDBIcon fas icon="exclamation-circle" />
        <h3>Quiz not found</h3>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const questions = activity.quizDetails?.questions || [];
  const currentQ = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  if (!quizStarted) {
    return (
      <div className="quiz-start-container">
        <div className="quiz-start-card">
          <div className="quiz-icon">
            <MDBIcon fas icon="question-circle" />
          </div>
          <h1>{activity.title}</h1>
          <p className="quiz-class">{activity.classId?.className} ({activity.classId?.classCode})</p>
          
          <div className="quiz-info-grid">
            <div className="quiz-info-item">
              <MDBIcon fas icon="question" />
              <span>{questions.length} Questions</span>
            </div>
            <div className="quiz-info-item">
              <MDBIcon fas icon="chart-bar" />
              <span>{activity.totalMarks} Marks</span>
            </div>
            <div className="quiz-info-item">
              <MDBIcon fas icon="clock" />
              <span>{activity.quizDetails?.timeLimit || 'No'} Time Limit</span>
            </div>
            <div className="quiz-info-item">
              <MDBIcon fas icon="redo-alt" />
              <span>Attempt {activity.attemptsRemaining !== null ? 
                `${activity.attemptsRemaining} remaining` : 'Unlimited'}</span>
            </div>
          </div>
          
          {activity.instructions && (
            <div className="quiz-instructions">
              <h3>Instructions</h3>
              <p>{activity.instructions}</p>
            </div>
          )}
          
          {error ? (
            <div className="quiz-error-message">
              <MDBIcon fas icon="exclamation-triangle" /> {error}
            </div>
          ) : (
            <button className="quiz-start-btn" onClick={startQuiz}>
              <MDBIcon fas icon="play" /> Start Quiz
            </button>
          )}
          
          <button className="quiz-back-btn" onClick={() => navigate(-1)}>
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-take-container">
      {/* Quiz Header */}
      <div className="quiz-header">
        <div className="quiz-title-section">
          <h2>{activity.title}</h2>
          <span className="quiz-meta">
            {activity.classId?.className} • {questions.length} Questions • {activity.totalMarks} Marks
          </span>
        </div>
        
        <div className="quiz-timer-section">
          <div className={`quiz-timer ${timeLeft < 60 ? 'warning' : ''}`}>
            <MDBIcon fas icon="clock" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="quiz-navigator">
        {questions.map((q, index) => (
          <button
            key={q._id}
            className={`quiz-nav-btn ${answers[q._id] !== undefined ? 'answered' : ''} ${currentQuestion === index ? 'active' : ''}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      {currentQ && (
        <div className="quiz-question-card">
          <div className="question-header">
            <span className="question-number">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="question-points">{currentQ.points} {currentQ.points === 1 ? 'point' : 'points'}</span>
          </div>
          
          <h3 className="question-text">{currentQ.questionText}</h3>
          
          <div className="question-options">
            {currentQ.options.map((option, optIndex) => (
              <label
                key={optIndex}
                className={`quiz-option ${answers[currentQ._id] === optIndex ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ._id}`}
                  checked={answers[currentQ._id] === optIndex}
                  onChange={() => handleAnswerSelect(currentQ._id, optIndex)}
                />
                <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="quiz-navigation">
        <button
          className="quiz-nav-prev"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          <MDBIcon fas icon="chevron-left" /> Previous
        </button>
        
        <div className="quiz-progress">
          <span>{answeredCount} of {questions.length} answered</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {currentQuestion < questions.length - 1 ? (
          <button
            className="quiz-nav-next"
            onClick={() => setCurrentQuestion(prev => prev + 1)}
          >
            Next <MDBIcon fas icon="chevron-right" />
          </button>
        ) : (
          <button
            className="quiz-submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <><MDBIcon fas icon="spinner" spin /> Submitting...</>
            ) : (
              <><MDBIcon fas icon="check" /> Submit Quiz</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}