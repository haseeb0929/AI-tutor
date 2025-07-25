import React, { useState, useEffect, useRef } from "react";
import "./StudentDashboard.module.css";
import api from "../api";

export const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [attemptedQuizIds, setAttemptedQuizIds] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const menuText = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchAssignedQuizzes = async () => {
      try {
        const response = await api.get("/StudentDashboard/getAssignedQuizes");
        setQuizzes(Array.isArray(response.data.quizzes) ? response.data.quizzes : []);

      } catch (error) {
        console.error("Failed to fetch assigned quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedQuizzes();
  }, []);

  useEffect(() => {
    if (!activeQuiz) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, activeQuiz]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (activeQuiz && modalRef.current && !modalRef.current.contains(e.target)) {
        e.stopPropagation(); // Prevent clicks outside modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeQuiz]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStartQuiz = (quiz) => {
    if (attemptedQuizIds.includes(quiz._id)) return;
    setActiveQuiz(quiz);
    setTimeLeft(15 * 60);
    setSelectedAnswers({});
    setSubmissionStatus(null);
  };

  const handleSelectAnswer = (questionIdx, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: option,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz || submissionStatus === "submitting") return;

    setSubmissionStatus("submitting");
    try {
      const answers = activeQuiz.mcqs.map((mcq, index) => {
        const selected = selectedAnswers[index] || "";
        return {
          question: mcq.question,
          selectedAnswer: selected,
          correctAnswer: mcq.correctAnswer,
          isCorrect: selected === mcq.correctAnswer,
        };
      });

      const score = answers.filter((a) => a.isCorrect).length;

      const response = await api.post("/StudentDashboard/submitQuiz", {
        studentId: "fake_student",
        quizId: activeQuiz._id,
        answers,
        score,
        duration: 15 * 60 - timeLeft,
      });


      if (!response.ok) throw new Error("Failed to submit quiz");
      setSubmissionStatus("success");
      setAttemptedQuizIds((prev) => [...prev, activeQuiz._id]);
      setActiveQuiz(null);
      setSelectedAnswers({});
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setSubmissionStatus("error");
    }
  };

  const handleAutoSubmit = async () => {
    if (!activeQuiz || submissionStatus === "submitting") return;

    setSubmissionStatus("submitting");
    try {
      await api.post("/StudentDashboard/submitQuiz", {
        quizId: activeQuiz._id,
        studentId: "fake_student",
        answers: [],
        score: 0,
        duration: 15 * 60,
      });


      setAttemptedQuizIds((prev) => [...prev, activeQuiz._id]);
      setActiveQuiz(null);
      setSelectedAnswers({});
      setSubmissionStatus("timeout");
    } catch (error) {
      console.error("Failed to auto-submit quiz:", error);
      setSubmissionStatus("error");
    }
  };

  const handleCloseQuiz = () => {
    if (window.confirm("Are you sure you want to cancel the quiz? You will receive 0 marks.")) {
      handleAutoSubmit();
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "Assigned-Quiz":
      default:
        return (
          <section className="dashboard-body">
            <h2>Assigned Quizzes</h2>
            {loading ? (
              <p>Loading quizzes...</p>
            ) : quizzes.length === 0 ? (
              <p>No quizzes assigned yet.</p>
            ) : (
              <ul className="quiz-list">
                {quizzes.map((quiz) => (
                  <li key={quiz._id} className="quiz-item">
                    <div className="quiz-info">
                      <h3>{quiz.title || "Untitled Quiz"}</h3>
                      <p>
                        <strong>PDF:</strong> {quiz.pdfName || "Unknown PDF"}
                      </p>
                    </div>
                    <button
                      className="start-quiz-btn"
                      disabled={attemptedQuizIds.includes(quiz._id)}
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      {attemptedQuizIds.includes(quiz._id) ? "Attempted" : "Start Quiz"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
    }
  };

  return (
    <div className="teacher-dashboard-container">
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <h2>Student Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => setCurrentPage("Assigned-Quiz")}>
                Assigned Quiz
              </a>
            </li>
            <li>
              <a href="#">Student Reports</a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="teacher-main-content">
        <header className="teacher-dashboard-header">
          <button className="hamburger" onClick={toggleSidebar} disabled={activeQuiz}>
            <div className={`hamburger-text${isSidebarOpen ? " menu-padded" : ""}`} ref={menuText}>
              Menu
            </div>
          </button>
          <h1>Dashboard</h1>
          <div className="teacher-info">
            <span style={{ paddingRight: "10px" }}>Welcome, Student</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        {renderContent()}

        {activeQuiz && (
          <div className="quiz-modal-overlay">
            <div className="quiz-modal" ref={modalRef}>
              <button className="close-btn" onClick={handleCloseQuiz}>
                &times;
              </button>
              <h2>{activeQuiz.title}</h2>
              <p>
                Time Remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </p>
              {submissionStatus === "success" && (
                <p className="submission-message success">Quiz submitted successfully!</p>
              )}
              {submissionStatus === "error" && (
                <p className="submission-message error">Error submitting quiz. Please try again.</p>
              )}
              {submissionStatus === "timeout" && (
                <p className="submission-message error">Time's up! Quiz auto-submitted with 0 marks.</p>
              )}
              <ul className="quiz-questions">
                {activeQuiz.mcqs.map((mcq, idx) => (
                  <li key={idx} className="quiz-question">
                    <p>
                      <strong>Q{idx + 1}:</strong> {mcq.question}
                    </p>
                    <div className="options">
                      {mcq.options.map((opt, i) => (
                        <label key={i} className="option-label">
                          <input
                            type="radio"
                            name={`question-${idx}`}
                            value={opt}
                            checked={selectedAnswers[idx] === opt}
                            onChange={() => handleSelectAnswer(idx, opt)}
                            disabled={submissionStatus === "submitting"}
                            aria-label={`Option ${i + 1} for question ${idx + 1}`}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="submit-quiz-btn"
                onClick={handleSubmitQuiz}
                disabled={submissionStatus === "submitting"}
              >
                {submissionStatus === "submitting" ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};