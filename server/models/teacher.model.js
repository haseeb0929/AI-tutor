// models/QuizResult.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherId:{
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

module.exports = mongoose.model("Teacher", teacherSchema);
