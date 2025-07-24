const express = require('express');
const router = express.Router();
const quizCtrl = require('../../controllers/TeacherDashboardControllers/quiz.controller');


router.get("/getAssignedQuizes",quizCtrl.getAssignedQuizes);
router.post("/submitQuiz", quizCtrl.submitQuizResult);

module.exports = router;