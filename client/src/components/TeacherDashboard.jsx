import { UploadPdf } from "./TeacherDashboard/UploadPdf";
import { GenerateQuiz } from "./TeacherDashboard/GenerateQuiz";
import { AssignQuiz } from "./TeacherDashboard/AssignQuiz";
import { CheckSubmissions } from "./TeacherDashboard/CheckSubmissions";
import styles from "./TeacherDashboard.module.css";
import React, { useState, useRef } from "react";

export const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const menuText = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "upload-pdf":
        return <UploadPdf />;
      case "generate-quizzes":
        return <GenerateQuiz />;
      case "assign-quiz":
        return <AssignQuiz />;
      case "check-submissions":
        return <CheckSubmissions />;
      default:
        return (
          <section className={styles["dashboard-body"]}>
            <h2>Your Actions</h2>
            <p>
              Use the sidebar to upload PDFs, generate quizzes, assign deadlines, and monitor student progress.
            </p>
          </section>
        );
    }
  };

  return (
    <div className={styles["teacher-dashboard-container"]}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
        <h2>Teacher Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => setCurrentPage("upload-pdf")}>
                Upload PDF
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("generate-quizzes")}>
                Generate Quizzes
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("assign-quiz")}>
                Assign Quiz
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("check-submissions")}>
                Check Submissions
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={styles["teacher-main-content"]}>
        <header className={styles["teacher-dashboard-header"]}>
          <button className={styles["hamburger"]} onClick={toggleSidebar}>
            <div
              className={`${styles["hamburger-text"]} ${isSidebarOpen ? styles["menu-padded"] : ""}`}
              ref={menuText}
            >
              Menu
            </div>
          </button>
          <h1>Dashboard</h1>
          <div className={styles["teacher-info"]}>
            <span style={{ paddingRight: "10px" }}>Welcome, Teacher</span>
            <button className={styles["logout-btn"]}>Logout</button>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};
