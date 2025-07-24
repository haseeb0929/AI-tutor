import React, { useEffect, useState } from "react";
import "./AssignQuiz.css";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }
    return this.props.children;
  }
}

export const AssignQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:3000/TeacherDashboard/quizzes");
        const data = await response.json();
        console.log("Fetched Quizzes:", data);
        setQuizzes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const assignQuiz = async (quizId) => {
    try {
      const response = await fetch(`http://localhost:3000/TeacherDashboard/assignQuiz/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAssigned: true }),
      });

      if (response.ok) {
        setQuizzes((prev) =>
          prev.map((quiz) =>
            quiz._id === quizId ? { ...quiz, isAssigned: true } : quiz
          )
        );
      }
    } catch (error) {
      console.error("Error assigning quiz:", error);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <ErrorBoundary>
      <div className="assign-quiz-container">
        <h2>Assign Quizzes</h2>
        <div className="quiz-list">
          {quizzes.length === 0 ? (
            <p>No quizzes found.</p>
          ) : (
            quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz._id}>
                <h3>Quiz ID: {quiz._id.slice(-6)}</h3>
                <p><strong>From PDF:</strong> {quiz.pdfName}</p>
                <button
                  className="preview-btn"
                  onClick={() => {
                    console.log("Selected Quiz:", quiz);
                    setSelectedQuiz(quiz);
                  }}
                >
                  Preview
                </button>
                <button
                  className="assign-btn"
                  onClick={() => assignQuiz(quiz._id)}
                  disabled={quiz.isAssigned}
                >
                  {quiz.isAssigned ? "Assigned" : "Assign Quiz"}
                </button>
              </div>
            ))
          )}
        </div>
        {selectedQuiz && (
          <div className="quiz-preview-modal">
            <div className="quiz-preview">
              <h3>Quiz Preview (from {selectedQuiz.pdfName || "Unknown"})</h3>
              {selectedQuiz.mcqs && Array.isArray(selectedQuiz.mcqs) ? (
                selectedQuiz.mcqs.map((q, i) => (
                  <div className="preview-question" key={i}>
                    <p><strong>Q{i + 1}:</strong> {q.question || "No question text"}</p>
                    <ul>
                      {q.options && Array.isArray(q.options) ? (
                        q.options.map((opt, j) => (
                          <li key={j}>
                            {String.fromCharCode(65 + j)}. {opt || "No option text"}
                          </li>
                        ))
                      ) : (
                        <li>No options available</li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No questions available</p>
              )}
              <button className="close-preview" onClick={() => setSelectedQuiz(null)}>
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};