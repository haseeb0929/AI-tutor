import React, { useState, useEffect } from "react";
import api from "../../api";
import "./GenerateQuiz.css";

export const GenerateQuiz = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState("");
    const [numQuizzes, setNumQuizzes] = useState(1);
    const [numMcqs, setNumMcqs] = useState(5);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // For loader state

    useEffect(() => {
        api.get("/TeacherDashboard/pdf/list")
            .then((res) => setPdfFiles(res.data.files || []))
            .catch((err) => console.error("Error fetching PDFs:", err));

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPdf) {
            return setMessage("Please select a PDF first.");
        }

        setLoading(true);
        setMessage("");

        const payload = {
            fileId: selectedPdf,
            numQuizzes,
            numMcqs
        };

        try {
            const res = await api.post("/TeacherDashboard/generate-quizzes", payload);
            setMessage(res.data.message || "Quiz generation request sent.");
        } catch (error) {
            console.error("Error:", error);
            setMessage("Failed to generate quizzes.");
        } finally {
            setLoading(false);
        }
    };


    const handlePdfSelect = (id) => {
        setSelectedPdf(id);
        setMessage(""); // Clear previous result when new PDF selected
    };

    return (
        <section className="generate-quizzes">
            <h2>Generate Quizzes</h2>

            <div className="pdf-list">
                <h3>Select a PDF:</h3>
                {pdfFiles.length === 0 ? (
                    <p>No PDFs uploaded yet.</p>
                ) : (
                    <ul>
                        {pdfFiles.map((file) => (
                            <li
                                key={file._id}
                                className={`pdf-item ${selectedPdf === file._id ? "selected" : ""}`}
                                onClick={() => handlePdfSelect(file._id)}
                            >
                                <span>{file.fileName}</span>
                                <a
                                    href={`http://localhost:3000/${file.filePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    (Preview)
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={handleSubmit} className="quiz-form">
                <label>
                    Number of Quizzes:
                    <input
                        type="number"
                        value={numQuizzes}
                        onChange={(e) => setNumQuizzes(e.target.value)}
                        min="1"
                        required
                    />
                </label>

                <label>
                    MCQs per Quiz:
                    <input
                        type="number"
                        value={numMcqs}
                        onChange={(e) => setNumMcqs(e.target.value)}
                        min="1"
                        required
                    />
                </label>

                <div className="button-wrapper">
                    <button type="submit" disabled={loading}>
                        Generate Quiz
                    </button>
                    {loading && <div className="loader" />}
                </div>
            </form>

            {message && <p className="feedback-message">{message}</p>}
        </section>
    );
};
