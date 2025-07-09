import { useState, useEffect } from "react"
import { Brain, Target, Loader2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"
import { useNavigate } from "react-router-dom"
import { cn } from "./lib/utils"

// Import course outlines data
const courseOutlines = [
  {
    name: "Computer Networks",
    weeks: [
      {
        week: 1,
        topics: [
          "Introduction to Computer Networks",
          "Network Topologies",
          "Types of Networks (LAN, WAN, MAN, PAN)",
          "Network Models: OSI and TCP/IP",
        ],
      },
      {
        week: 2,
        topics: [
          "Physical Layer Fundamentals",
          "Transmission Media (Wired & Wireless)",
          "Switching Techniques",
          "Network Devices: Hubs, Switches, Routers",
        ],
      },
    ],
  },
]

export const DiagnosticQuiz = () => {
  const navigate = useNavigate()
  // State management
  const [course, setCourse] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(1)

  // Loading styles
  const loadingStyles = ``

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        setLoading(true)
        setError(null)
        // Get selected course from localStorage (only once in useEffect)
        const selectedCourseName = JSON.parse(localStorage.getItem("selectedCourse"))
        if (!selectedCourseName) {
          setError("No course selected. Please select a course first.")
          setLoading(false)
          return
        }

        // Find the selected course outline
        const selectedCourseOutline = courseOutlines.find((course) => course.name === selectedCourseName)
        if (!selectedCourseOutline) {
          setError(`Course "${selectedCourseName}" not found.`)
          setLoading(false)
          return
        }

        // Find the current week's topics
        const weekData = selectedCourseOutline.weeks.find((w) => w.week === currentWeek)
        if (!weekData) {
          setError(`Week ${currentWeek} not found for ${selectedCourseName}`)
          setLoading(false)
          return
        }

        // Create prompt for AI
        const prompt = `Create a diagnostic quiz for the course "${selectedCourseName}" focusing on Week ${currentWeek} topics: ${weekData.topics.join(", ")}.

Generate exactly 5 multiple choice questions that assess student understanding of these topics. Each question should be mapped to one of the specific topics from this week.

Topics for this week:
${weekData.topics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

Return the response in this exact JSON format:
{
  "name": "${selectedCourseName}",
  "week": ${currentWeek},
  "topics": ${JSON.stringify(weekData.topics)},
  "quiz": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "topic": "Introduction to Computer Networks"
    }
  ]
}

Make sure:
- Questions are challenging but fair for diagnostic assessment
- Each question has exactly 4 options
- The "answer" field contains the index (0-3) of the correct option
- Each question maps to one of the topics from the week
- Questions cover different topics from the week
- The "topic" field matches exactly one of the topics provided`

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://yourdomain.com",
            "X-Title": "OpenRouter Quiz Generator",
          },
          body: JSON.stringify({
            model: "google/gemma-3-12b-it:free",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert educational advisor who creates diagnostic quizzes. Always respond with valid JSON only, no additional text or formatting.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 2000,
            temperature: 0.7,
          }),
        })

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        const aiResponse = data.choices[0].message.content

        // Parse the AI response
        let generatedCourse
        let cleanedResponse = aiResponse.trim()

        // Remove markdown code blocks (```json and ```)
        cleanedResponse = cleanedResponse.replace(/^```json\s*/i, "")
        cleanedResponse = cleanedResponse.replace(/^```\s*/i, "")
        cleanedResponse = cleanedResponse.replace(/\s*```$/i, "")

        // Remove any leading/trailing whitespace again
        cleanedResponse = cleanedResponse.trim()

        // Try to find JSON content if there's still extra text
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          cleanedResponse = jsonMatch[0]
        }

        try {
          generatedCourse = JSON.parse(cleanedResponse)
        } catch (parseError) {
          console.error("Failed to parse AI response:", aiResponse)
          console.error("Cleaned response:", cleanedResponse)
          throw new Error("Invalid response format from AI")
        }

        // Validate the generated course structure
        if (!generatedCourse.quiz || !Array.isArray(generatedCourse.quiz) || generatedCourse.quiz.length === 0) {
          throw new Error("Generated quiz is invalid or empty")
        }

        setCourse(generatedCourse)
        setLoading(false)
      } catch (err) {
        console.error("Error generating quiz:", err)
        setError(`Failed to generate quiz: ${err.message}`)
        setLoading(false)
      }
    }

    generateQuiz()
  }, [currentWeek]) // Only depend on currentWeek, not selectedCourseName

  // Enhanced loading state with detailed progress
  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: loadingStyles }} />
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-8 h-8 text-primary animate-pulse" />
                  <div>
                    <h1 className="text-2xl font-bold">Loading Course...</h1>
                    <Badge variant="outline">Preparing Quiz</Badge>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  {/* Main loading animation */}
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                      <Brain className="absolute inset-0 w-8 h-8 m-auto text-blue-600 animate-pulse" />
                    </div>
                  </div>
                  {/* Loading title */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Generating Your Personalized Quiz
                    </h3>
                    <p className="text-muted-foreground text-lg">Creating questions for Week {currentWeek}</p>
                  </div>
                  {/* Loading steps */}
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-blue-800">Analyzing course topics...</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse animation-delay-300"></div>
                      <span className="text-sm font-medium text-purple-800">Generating quiz questions...</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse animation-delay-600"></div>
                      <span className="text-sm font-medium text-green-800">Optimizing difficulty level...</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Preparing your assessment</span>
                      <span>Please wait...</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  {/* Fun facts while waiting */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-800">Did you know?</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Diagnostic assessments help identify your learning strengths and areas for improvement, creating a
                      personalized learning path just for you!
                    </p>
                  </div>
                  {/* Estimated time */}
                  <div className="text-xs text-muted-foreground">
                    <p>⏱️ This usually takes 10-15 seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-red-600">Quiz Generation Failed</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                  Try Again
                </Button>
                <Button onClick={() => navigate("/courses")} variant="default" className="w-full">
                  Select Different Course
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz content
  if (!course || !course.quiz || course.quiz.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>No quiz questions available.</p>
        </div>
      </div>
    )
  }

  const question = course.quiz[currentQuestion]
  const isLastQuestion = currentQuestion === course.quiz.length - 1

  const handleAnswer = (index) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
    setSelectedAnswer(index)

    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      }, 400)
    }
  }

  const buildResults = () => {
    const topicScores = {}
    // Initialize topic scores
    course.topics.forEach((topic) => {
      topicScores[topic] = { correct: 0, total: 0 }
    })

    // Aggregate scores from answers
    course.quiz.forEach((q, i) => {
      const userAnswer = answers[i]
      const isCorrect = userAnswer === q.answer
      const topic = q.topic

      if (topicScores[topic]) {
        topicScores[topic].total += 1
        if (isCorrect) topicScores[topic].correct += 1
      }
    })

    // Build final performance results — ensure no duplicates
    const performanceByTopic = Object.keys(topicScores).map((topic) => {
      const data = topicScores[topic]
      const score = data.total > 0 ? ((data.correct / data.total) * 100).toFixed(0) : "0"
      return {
        topic,
        correct: data.correct,
        total: data.total,
        score,
        level: data.correct / data.total >= 0.6 ? "strong" : "weak",
      }
    })

    return performanceByTopic
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const topicResults = buildResults()
    try {
      const res = await fetch("http://localhost:3000/getGoals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName: course.name,
          week: course.week,
          topicResults: topicResults,
        }),
      })
      if (res.ok) {
        console.log("Quiz result submitted")
        const responseData = await res.json()
        localStorage.setItem("dashboardData", JSON.stringify(responseData.data))
        navigate("/Dashboard")
      } else {
        console.error("Failed to submit quiz")
        setSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting quiz:", err)
      setSubmitting(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: loadingStyles }} />
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">{course.name}</h1>
                  <div className="flex gap-2">
                    <Badge variant="outline">Diagnostic Assessment</Badge>
                    <Badge variant="secondary">Week {course.week}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Question {currentQuestion + 1} of {course.quiz.length}
              </CardTitle>
              <Progress value={((currentQuestion + 1) / course.quiz.length) * 100} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  Topic: {question.topic}
                </Badge>
              </div>
              <h3 className="text-lg font-medium">{question.question}</h3>
              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={cn(
                      "justify-start text-left h-auto p-4 transition-all duration-200",
                      selectedAnswer === index
                        ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]"
                        : "bg-white hover:bg-blue-50 hover:border-blue-300 border-gray-200",
                    )}
                    onClick={() => handleAnswer(index)}
                    disabled={submitting}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          selectedAnswer === index ? "border-white bg-white" : "border-gray-300",
                        )}
                      >
                        {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
              {/* Submit button - only show on last question and when an answer is selected */}
              {isLastQuestion && selectedAnswer !== null && (
                <div className="pt-6 border-t">
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-black text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    size="lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Results...
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2" />
                        Submit Quiz & Continue
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}
