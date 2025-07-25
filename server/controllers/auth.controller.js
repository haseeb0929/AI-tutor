const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT
const generateToken = (user, role) => {
  return jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "1d" });
};

// Signup (shared logic for both)
const signup = async (req, res, role) => {
  const { name, password, id } = req.body;
  try {
    const Model = role === "student" ? Student : Teacher;
    let existingUser = null;
    if(role === "student"){
        existingUser = await Model.findOne({ studentId: id });
    }else{
        existingUser = existingUser || await Model.findOne({ teacherId: id });
    }
    
    if (existingUser == null) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({ name, studentId: id, password: hashedPassword });
    await newUser.save();

    res.json({ user: { id: newUser._id, name, role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Login
const login = async (req, res, role) => {
  const { id, password } = req.body;
  try {
    const Model = role === "student" ? Student : Teacher;
    let user = null;
    if(role === "student") {
        user = await Model.findOne({ studentId: id });
    }
    else {
        user = await Model.findOne({ teacherId: id });
    }
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user, role);
    res.json({ token, user: { id: user._id, name: user.name, role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { login, signup };
