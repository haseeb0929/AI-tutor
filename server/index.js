const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const goalsRoutes = require('./routes/getGoalsStackRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/getGoals', goalsRoutes);


app.get('/', (req, res) => {
  res.send('✅ AI Tutor Backend is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
