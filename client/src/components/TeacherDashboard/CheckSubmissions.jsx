import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckSubmissions.css";

export const CheckSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/TeacherDashboard/getQuizSubmissions");
        const data = response.data;
        setSubmissions(Array.isArray(data.quizResults) ? data.quizResults : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch submissions");
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
  };

  const closeDetails = () => {
    setSelectedSubmission(null);
  };

  if (loading) {
    return <div className="loading">Loading submissions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="submissions-section">
      <h2>Quiz Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="submissions-list">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Submission Date</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.studentId}</td>
                  <td>{submission.quizId.pdfName}</td>
                  <td>{submission.score}/{submission.answers.length}</td>
                  <td>{new Date(submission.attemptedAt).toLocaleDateString()}</td>
                  <td>
                    {Math.floor(submission.duration / 60)}:
                    {submission.duration % 60 < 10 ? "0" : ""}
                    {submission.duration % 60}
                  </td>
                  <td>
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(submission)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedSubmission && (
            <div className="submission-details-modal">
              <div className="modal-content">
                <h3>Submission Details</h3>
                <p><strong>Student ID:</strong> {selectedSubmission.studentId}</p>
                <p><strong>Quiz:</strong> {selectedSubmission.quizId.pdfName}</p>
                <p>
                  <strong>Score:</strong> {selectedSubmission.score}/
                  {selectedSubmission.answers.length}
                </p>
                <p>
                  <strong>Submission Date:</strong>{" "}
                  {new Date(selectedSubmission.attemptedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {Math.floor(selectedSubmission.duration / 60)}:
                  {selectedSubmission.duration % 60 < 10 ? "0" : ""}
                  {selectedSubmission.duration % 60}
                </p>
                <h4>Answers:</h4>
                <ul className="answers-list">
                  {selectedSubmission.answers.map((answer, index) => (
                    <li
                      key={index}
                      className={answer.isCorrect ? "correct" : "incorrect"}
                    >
                      <p>
                        <strong>Question {index + 1}:</strong> {answer.question}
                      </p>
                      <p>
                        <strong>Selected Answer:</strong> {answer.selectedAnswer}
                      </p>
                      <p>
                        <strong>Correct Answer:</strong> {answer.correctAnswer}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {answer.isCorrect ? "Correct" : "Incorrect"}
                      </p>
                    </li>
                  ))}
                </ul>
                <button className="close-modal-btn" onClick={closeDetails}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
