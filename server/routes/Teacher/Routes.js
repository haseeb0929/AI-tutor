const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const quizCtrl = require('../../controllers/TeacherDashboardControllers/quiz.controller');
const uploadFileCtrl = require('../../controllers/TeacherDashboardControllers/uploadFile.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uploadPath = path.join('uploads', file.originalname);
    if (fs.existsSync(uploadPath)) {
      return cb(new Error('File already exists'), null); 
    }
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage });

router.post('/uploadFile', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    uploadFileCtrl.uploadFile(req, res);
  });
});
router.post("/generate-quizzes", quizCtrl.generateQuizzes);
router.get("/pdf/list", quizCtrl.listAllPdfs);
router.get("/quizzes/:pdfId", quizCtrl.getQuizzesByPdf);

router.get("/quizzes", quizCtrl.getAllQuizzes);
router.put("/assignQuiz/:quizId", quizCtrl.updateQuizAssignment);

router.get("/getQuizSubmissions", quizCtrl.getAllQuizResults);

module.exports = router;
