import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Brain,
  BookOpen,
  CheckCircle,
  RotateCcw,
  Target,
  TrendingUp,
  ExternalLink,
  Play,
  FileText,
  Code,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react"
import { useEffect, useState } from "react"

export const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [expandedGoals, setExpandedGoals] = useState(new Set([0])) // First goal expanded by default
  const [completedGoals, setCompletedGoals] = useState(new Set()) // Track completed goals

  useEffect(() => {
    const stored = localStorage.getItem("dashboardData")
    if (stored) {
      const parsedData = JSON.parse(stored)
      // Extract the nested data structure
      setDashboardData(parsedData.data || parsedData)
    }
  }, [])

  const toggleGoalExpansion = (goalId) => {
    const newExpanded = new Set(expandedGoals)
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId)
    } else {
      newExpanded.add(goalId)
    }
    setExpandedGoals(newExpanded)
  }

  const markGoalComplete = (goalId) => {
    const newCompleted = new Set(completedGoals)
    if (newCompleted.has(goalId)) {
      newCompleted.delete(goalId)
    } else {
      newCompleted.add(goalId)
    }
    setCompletedGoals(newCompleted)
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <div className="text-lg font-medium">Loading your personalized dashboard...</div>
          <div className="text-sm text-muted-foreground mt-2">Analyzing your learning progress</div>
        </div>
      </div>
    )
  }

  const { courseName, studentPerformance, learningPlan } = dashboardData

  // Extract learning goals from the new structured format
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

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return <Play className="w-4 h-4" />
      case "tutorial":
        return <FileText className="w-4 h-4" />
      case "documentation":
        return <BookOpen className="w-4 h-4" />
      case "exercise":
        return <Code className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  // Get resource color based on type
  const getResourceColor = (type) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
      case "tutorial":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      case "documentation":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      case "exercise":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{courseName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">Learning Dashboard</Badge>
                  <Badge variant="outline">AI-Powered</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <div className="text-2xl font-bold text-primary">{studentPerformance.overallScore}%</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Map</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Performance Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentPerformance.overallScore}%</div>
                  <p className="text-xs text-muted-foreground">Current performance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total CLOs</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentPerformance.totalCLOs}</div>
                  <p className="text-xs text-muted-foreground">Course learning outcomes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Strong Areas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{studentPerformance.strongAreas}</div>
                  <p className="text-xs text-muted-foreground">Mastered concepts</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weak Areas</CardTitle>
                  <BookOpen className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{studentPerformance.weakAreas}</div>
                  <p className="text-xs text-muted-foreground">Need improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Learning Goals Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Today's Goal Stack
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <CardDescription>Optimized learning path with resources and objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningGoals.map((cloGoal, cloIndex) => (
                    <div
                      key={cloGoal.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        completedGoals.has(cloGoal.id)
                          ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                          : ""
                      }`}
                    >
                      {/* CLO Header */}
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleGoalExpansion(cloGoal.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                              completedGoals.has(cloGoal.id)
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {completedGoals.has(cloGoal.id) ? <Check className="w-5 h-5" /> : cloIndex + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{cloGoal.topic}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{cloGoal.studyTimeline}</Badge>
                              {completedGoals.has(cloGoal.id) && (
                                <Badge variant="default" className="bg-green-600">
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={completedGoals.has(cloGoal.id) ? "outline" : "default"}
                            onClick={(e) => {
                              e.stopPropagation()
                              markGoalComplete(cloGoal.id)
                            }}
                            className={completedGoals.has(cloGoal.id) ? "text-green-600 border-green-600" : ""}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Done
                          </Button>
                          {expandedGoals.has(cloGoal.id) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedGoals.has(cloGoal.id) && (
                        <div className="mt-4 space-y-4">
                          {/* Learning Objectives */}
                          <div>
                            <h5 className="font-medium mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Learning Objectives
                            </h5>
                            <div className="space-y-2">
                              {cloGoal.learningGoals.map((goal, goalIndex) => (
                                <div key={goalIndex} className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{goal}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Learning Resources */}
                          <div>
                            <h5 className="font-medium mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Learning Resources ({cloGoal.resources.length})
                            </h5>
                            <div className="grid gap-3 md:grid-cols-2">
                              {cloGoal.resources.map((resource, resourceIndex) => (
                                <a
                                  key={resourceIndex}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
                                >
                                  <div className={`p-2 rounded-md ${getResourceColor(resource.type)}`}>
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h6 className="font-medium text-sm group-hover:text-primary transition-colors">
                                      {resource.title}
                                    </h6>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" className="text-xs">
                                        {resource.type}
                                      </Badge>
                                      {resource.source && (
                                        <span className="text-xs text-muted-foreground">{resource.source}</span>
                                      )}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Assessment Method */}
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Assessment Method
                            </h5>
                            <p className="text-sm text-muted-foreground">{cloGoal.assessmentMethod}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Knowledge Profile - {courseName}
                </CardTitle>
                <CardDescription>Performance analysis across course learning outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Strong Areas */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Strong Areas ({studentPerformance.strongAreas})
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Data Link Layer</h4>
                          <Badge variant="default" className="bg-green-600">
                            85%
                          </Badge>
                        </div>
                        <Progress value={85} className="mb-2" />
                        <div className="text-sm text-muted-foreground">
                          Strong understanding of framing and error detection
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Transport Layer</h4>
                          <Badge variant="default" className="bg-green-600">
                            82%
                          </Badge>
                        </div>
                        <Progress value={82} className="mb-2" />
                        <div className="text-sm text-muted-foreground">Good grasp of TCP/UDP protocols</div>
                      </div>
                    </div>
                  </div>

                  {/* Weak Areas */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-orange-600 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Areas for Improvement ({studentPerformance.weakAreas})
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Physical Layer</h4>
                          <Badge variant="destructive">40%</Badge>
                        </div>
                        <Progress value={40} className="mb-2" />
                        <div className="text-sm text-muted-foreground">
                          Need to focus on transmission media and encoding
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Network Layer</h4>
                          <Badge variant="destructive">60%</Badge>
                        </div>
                        <Progress value={60} className="mb-2" />
                        <div className="text-sm text-muted-foreground">Routing protocols need more attention</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
