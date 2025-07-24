const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    pdf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pdf",
        required: true
    },
    mcqs: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ],
    pdfName: {
        type: String,
        required: true
    },
    isAssigned: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);