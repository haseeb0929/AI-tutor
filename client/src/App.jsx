import { useState } from 'react'
import LandingPage from './components/LandingPage'
import { CourseSelection } from './components/CourseSelection'
import { DiagnosticQuiz } from './components/DiagnosticQuiz'
import {Routes, Route} from 'react-router-dom'

import './App.css'
import { DashBoard } from './components/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SelectCourse" element={<CourseSelection/>} />
      <Route path="/DiagnosticQuiz" element={<DiagnosticQuiz/>} />
      <Route path="/DashBoard" element={<DashBoard />} />
      </Routes>
    </div>
  )
}

export default App
