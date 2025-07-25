const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const goalsRoutes = require('./routes/getGoalsStackRoute');
const TeacherDashboardRoutes = require('./routes/Teacher/Routes');
const StudentDashboardRoutes = require('./routes/Student/Routes');
const connectDB = require('./config/db.connection');
const verifyToken = require("./middleware/auth.middleware");
const authRoutes = require('./routes/auth');


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/getGoals', verifyToken, goalsRoutes);

app.use('/TeacherDashboard', verifyToken, TeacherDashboardRoutes);
app.use('/StudentDashboard', verifyToken, StudentDashboardRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('✅ AI Tutor Backend is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});