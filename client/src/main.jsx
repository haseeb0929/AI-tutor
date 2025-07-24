import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { TeacherDashboard } from './components/TeacherDashboard.jsx'
import { StudentDashboard } from './components/StudentDashboard.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      {/* <App /> */}
      {/* <TeacherDashboard />  */}
      <StudentDashboard /> 
    </Router>
  </div>,
)
