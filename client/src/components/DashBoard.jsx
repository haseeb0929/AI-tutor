import { useEffect, useState } from "react"
import { Brain } from "lucide-react"
import "./Dashboard.css"
import {
  TrendingUp,
  Target,
  CheckCircle,
  BookOpen,
  RotateCcw,
  Check,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react"

export const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [expandedGoals, setExpandedGoals] = useState(new Set([0]))
  const [completedGoals, setCompletedGoals] = useState(new Set())

  useEffect(() => {
    const stored = localStorage.getItem("dashboardData")
    if (stored) {
      const parsedData = JSON.parse(stored)
      setDashboardData(parsedData.data || parsedData)
    }
  }, [])

  const toggleGoalExpansion = (goalId) => {
    const newExpanded = new Set(expandedGoals)
    newExpanded.has(goalId) ? newExpanded.delete(goalId) : newExpanded.add(goalId)
    setExpandedGoals(newExpanded)
  }

  const markGoalComplete = (goalId) => {
    const newCompleted = new Set(completedGoals)
    newCompleted.has(goalId) ? newCompleted.delete(goalId) : newCompleted.add(goalId)
    setCompletedGoals(newCompleted)
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-loading">
        <div className="loading-box">
          <Brain className="loading-icon" />
          <div className="loading-text">Loading your personalized dashboard...</div>
          <div className="loading-subtext">Analyzing your learning progress</div>
        </div>
      </div>
    )
  }

  const { courseName, studentPerformance, learningPlan } = dashboardData

  const extractGoals = (planArray) => {
    if (!Array.isArray(planArray)) return []
    return planArray.map((item, index) => ({
      id: index,
      topic: item.topic,
      title: `${item.topic} Learning Goals`,
      learningGoals: item.learningGoals || [],
      resources: item.resources || [],
      studyTimeline: item.studyTimeline || "1 week",
      assessmentMethod: item.assessmentMethod || "Complete practice exercises",
    }))
  }

  const learningGoals = extractGoals(learningPlan)

  const categorizeTopics = (topics, strongCount, weakCount) => {
    if (!topics || topics.length === 0) return { strongTopics: [], weakTopics: [] }

    const shuffledTopics = [...topics].sort(() => Math.random() - 0.5)
    const maxStrongCount = Math.min(strongCount, topics.length)
    const maxWeakCount = Math.min(weakCount, topics.length - maxStrongCount)

    const strongTopics = shuffledTopics.slice(0, maxStrongCount).map((topic) => ({
      ...topic,
      percentage: Math.floor(Math.random() * 20) + 75,
    }))

    const weakTopics = shuffledTopics.slice(maxStrongCount, maxStrongCount + maxWeakCount).map((topic) => ({
      ...topic,
      percentage: Math.floor(Math.random() * 30) + 40,
    }))

    return { strongTopics, weakTopics }
  }

  const { strongTopics, weakTopics } = categorizeTopics(
    learningGoals,
    studentPerformance.strongAreas,
    studentPerformance.weakAreas,
  )

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
            <polygon points="15 11 22 7 22 17 15 13 15 11"></polygon>
          </svg>
        )
      case "article":
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 2v20h16V2H4zM12 17H7v-2h5v2zm0-4H7v-2h5v2zm0-4H7V7h5v2z"></path>
          </svg>
        )
      case "quiz":
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )
      default:
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
          <div className="header-content">
            <div className="course-info">
              <div className="course-icon">
                <Brain />
              </div>
              <div className="course-title">
                <h1>{courseName}</h1>
                <div className="badges">
                  <span className="badge primary">Learning Dashboard</span>
                  <span className="badge outline">AI-Powered</span>
                </div>
              </div>
            </div>
            <div className="score-box">
              <span className="score-label">Overall Score</span>
              <div className="score-value">{studentPerformance.overallScore}%</div>
            </div>
          </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="nav-tabs">
            <button className="nav-tab active">Dashboard</button>
            <button className="nav-tab">Knowledge Map</button>
          </div>

          <div className="stats-summary">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Overall Score</h3>
                <TrendingUp />
              </div>
              <div className="stat-content">
                <div className="stat-value">{studentPerformance.overallScore}%</div>
                <p className="stat-description">Current performance</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Total Topics</h3>
                <Target />
              </div>
              <div className="stat-content">
                <div className="stat-value">{learningGoals.length}</div>
                <p className="stat-description">Course topics</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Strong Areas</h3>
                <CheckCircle />
              </div>
              <div className="stat-content">
                <div className="stat-value">{studentPerformance.strongAreas}</div>
                <p className="stat-description">Mastered concepts</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Weak Areas</h3>
                <BookOpen />
              </div>
              <div className="stat-content">
                <div className="stat-value">{studentPerformance.weakAreas}</div>
                <p className="stat-description">Need improvement</p>
              </div>
            </div>
          </div>

          <div className="goals-section">
            <div className="goals-header">
              <div className="goals-title">
                <h2>
                  <Target />
                  Today's Goal Stack
                </h2>
                <button className="refresh-btn">
                  <RotateCcw />
                  Refresh
                </button>
              </div>
              <p className="goals-description">Optimized learning path with resources and objectives</p>
            </div>
            <div className="goals-list">
              {learningGoals.map((topicGoal, topicIndex) => (
                <div key={topicGoal.id} className={`goal-card ${completedGoals.has(topicGoal.id) ? "completed" : ""}`}>
                  <div className="goal-header" onClick={() => toggleGoalExpansion(topicGoal.id)}>
                    <div className="goal-index">{completedGoals.has(topicGoal.id) ? <Check /> : topicIndex + 1}</div>
                    <div className="goal-info">
                      <h4>{topicGoal.topic}</h4>
                      <div className="goal-meta">
                        <span>{topicGoal.studyTimeline}</span>
                        {completedGoals.has(topicGoal.id) && <span>Completed</span>}
                      </div>
                    </div>
                    <div className="goal-actions">
                      <button
                        className="mark-done"
                        onClick={(e) => {
                          e.stopPropagation()
                          markGoalComplete(topicGoal.id)
                        }}
                      >
                        <Check />
                        Done
                      </button>
                      {expandedGoals.has(topicGoal.id) ? (
                        <ChevronUp className="expand-icon" />
                      ) : (
                        <ChevronDown className="expand-icon" />
                      )}
                    </div>
                  </div>
                  {expandedGoals.has(topicGoal.id) && (
                    <div className="goal-details">
                      <div className="goal-section">
                        <h5>
                          <Target />
                          Learning Objectives
                        </h5>
                        <div className="objectives-list">
                          {topicGoal.learningGoals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="objective-item">
                              <CheckCircle />
                              <span>{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="goal-section">
                        <h5>
                          <BookOpen />
                          Learning Resources ({topicGoal.resources.length})
                        </h5>
                        <div className="resources-list">
                          {topicGoal.resources.map((resource, resourceIndex) => (
                            <a
                              key={resourceIndex}
                              className="resource-item"
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                              <div className="resource-content">
                                <h6>{resource.title}</h6>
                                <div className="resource-meta">
                                  <span>{resource.type}</span>
                                  {resource.source && <span>{resource.source}</span>}
                                </div>
                              </div>
                              <ExternalLink className="external-link" />
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="goal-section">
                        <h5>
                          <CheckCircle />
                          Assessment Method
                        </h5>
                        <p className="assessment-text">{topicGoal.assessmentMethod}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="knowledge-map" style={{ display: "none" }}>
          <div className="knowledge-header">
            <div className="knowledge-title">
              <h2>
                <Brain />
                Knowledge Profile - {courseName}
              </h2>
              <p>Performance analysis across course topics</p>
            </div>
            <div className="knowledge-content">
              <div className="strong-section">
                <h3>
                  <CheckCircle />
                  Strong Areas ({studentPerformance.strongAreas})
                </h3>
                <div className="topics-list">
                  {strongTopics.length > 0 ? (
                    strongTopics.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <div className="topic-header">
                          <h4>{topic.topic}</h4>
                          <span>{topic.percentage}%</span>
                        </div>
                        <div className="topic-progress">
                          <div className="progress-fill" style={{ width: `${topic.percentage}%` }}></div>
                        </div>
                        <div className="topic-description">
                          Strong understanding of {topic.topic.toLowerCase()} concepts
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-data">No strong areas identified yet</div>
                  )}
                </div>
              </div>
              <div className="weak-section">
                <h3>
                  <BookOpen />
                  Areas for Improvement ({studentPerformance.weakAreas})
                </h3>
                <div className="topics-list">
                  {weakTopics.length > 0 ? (
                    weakTopics.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <div className="topic-header">
                          <h4>{topic.topic}</h4>
                          <span>{topic.percentage}%</span>
                        </div>
                        <div className="topic-progress">
                          <div className="progress-fill" style={{ width: `${topic.percentage}%` }}></div>
                        </div>
                        <div className="topic-description">{topic.topic} needs more attention and practice</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-data">No weak areas identified yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
