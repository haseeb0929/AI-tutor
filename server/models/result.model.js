// models/QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    studentId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Student",
        type: String,
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    answers: [
        {
            question: String,
            selectedAnswer: String,
            correctAnswer: String,
            isCorrect: Boolean
        }
    ],
    score: {
        type: Number,
        required: true,
    },
    attemptedAt: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: Number, // in seconds
        required: true
    },
    isMarked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("QuizResult", quizResultSchema);
