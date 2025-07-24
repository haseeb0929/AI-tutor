const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const goalsRoutes = require('./routes/getGoalsStackRoute');
const TeacherDashboardRoutes = require('./routes/Teacher/Routes');
const StudentDashboardRoutes = require('./routes/Student/Routes');
const connectDB = require('./config/db.connection');

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/getGoals', goalsRoutes);

app.use('/TeacherDashboard', TeacherDashboardRoutes);
app.use('/StudentDashboard', StudentDashboardRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('✅ AI Tutor Backend is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});