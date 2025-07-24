import React, { useState } from "react";
import "./UploadPdf.css";


export const UploadPdf = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setMessage("");
        } else {
            setPdfFile(null);
            setMessage("Only PDF files are allowed.");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!pdfFile) {
            setMessage("Please select a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", pdfFile); // "file" is the key backend should expect

        try {
            const response = await fetch("http://localhost:3000/TeacherDashboard/uploadFile", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json(); 
                setMessage(`"${pdfFile.name}" uploaded successfully.`);
            } else {
                setMessage("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("An error occurred during upload.");
        }

        setPdfFile(null);
    };


    return (
        <div className="dashboard-body">
            <h2>Upload PDF</h2>
            <p>Select a PDF file to upload, such as lecture notes or quiz content.</p>
            <form onSubmit={handleUpload} className="upload-form">
                <label htmlFor="pdf-upload" className="custom-upload-box">
                    <span className="upload-plus">+</span>
                    <span className="upload-text">Click to choose a PDF file</span>
                </label>
                <input
                    type="file"
                    id="pdf-upload"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden-file-input"
                />

                {pdfFile && (
                    <div className="selected-file">
                        Selected File: <strong>{pdfFile.name}</strong>
                    </div>
                )}

                <button type="submit" className="upload-button">
                    Upload PDF
                </button>

                {message && <div className="upload-message">{message}</div>}
            </form>

        </div>
    );
};
