const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth.controller");

// Student routes
router.post("/student/signup", (req, res) => signup(req, res, "student"));
router.post("/student/login", (req, res) => login(req, res, "student"));

// Teacher routes
router.post("/teacher/signup", (req, res) => signup(req, res, "teacher"));
router.post("/teacher/login", (req, res) => login(req, res, "teacher"));

module.exports = router;
