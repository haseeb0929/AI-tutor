// models/QuizResult.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId:{
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
