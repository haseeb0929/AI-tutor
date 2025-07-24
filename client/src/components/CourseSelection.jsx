import { Brain, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "./CourseSelection.css"; // Make sure to import your CSS

export const CourseSelection = () => {
    const courses = [
        {
            id: 1,
            name: "Computer Networks",
            createdAt: new Date(),
            diagnosticComplete: false,
            quiz: true,
            masteryStats: {
                averageMastery: 0.0,
            },
        }
    ];

    return (
        <div className="course-selection">
            <header className="course-selection__header">
                <div className="container">
                    <div className="header-content">
                        <h1 className="title">Choose Your Learning Path</h1>
                    </div>
                </div>
            </header>

            <main className="container">
                <div className="content-wrapper">
                    <div className="intro-text">
                        <h2 className="subtitle">What would you like to learn?</h2>
                        <p className="description">
                            Start your personalized learning journey with any of the following courses.
                        </p>
                    </div>

                    <div className="course-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <div className="card-header">
                                    <div className="course-title">
                                        <BookOpen className="icon-small" />
                                        {course.name}
                                    </div>
                                    <div className="status-badges">
                                        {course.diagnosticComplete && (
                                            <span className="badge badge-complete">Completed</span>
                                        )}
                                        {course.quiz && !course.diagnosticComplete && (
                                            <span className="badge badge-ready">Ready</span>
                                        )}
                                        {!course.quiz && (
                                            <span className="badge badge-outline">Generating...</span>
                                        )}
                                    </div>
                                </div>

                                <div className="card-body">
                                    <p className="created-date">
                                        Created: {course.createdAt.toLocaleDateString()}
                                    </p>

                                    {course.diagnosticComplete && (
                                        <div className="progress-section">
                                            <p className="progress-text">
                                                Progress: {Math.round(course.masteryStats.averageMastery * 100)}%
                                            </p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${course.masteryStats.averageMastery * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Link
                                        to="/DiagnosticQuiz"
                                        onClick={() => {
                                            localStorage.setItem("selectedCourse", JSON.stringify(course.name));
                                        }}
                                    >
                                        <button className="start-button">
                                            {course.diagnosticComplete ? "Continue Learning" : "Start Diagnostic"}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
