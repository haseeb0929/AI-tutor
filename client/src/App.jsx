import { useState } from 'react'
import LandingPage from './components/LandingPage'
import { CourseSelection } from './components/CourseSelection'
import { DiagnosticQuiz } from './components/DiagnosticQuiz'
import {Routes, Route} from 'react-router-dom'
import { DashBoard } from './components/DashBoard'
import { TeacherDashboard } from './components/TeacherDashboard'
import { StudentDashboard } from './components/StudentDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { Login } from "./components/Login"
import { SignUp } from './components/SignUp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SelectCourse" element={<ProtectedRoute> <CourseSelection/> </ProtectedRoute> } />
      <Route path="/DiagnosticQuiz" element={<ProtectedRoute> <DiagnosticQuiz/> </ProtectedRoute>} />
      <Route path="/DashBoard" element={<ProtectedRoute> <DashBoard /> </ProtectedRoute>} />
      <Route path="/TeacherDashboard" element={<ProtectedRoute> <TeacherDashboard /> </ProtectedRoute>} />
      <Route path="/StudentDashboard" element={<ProtectedRoute> <StudentDashboard /> </ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
