import { useState, useEffect } from "react"
import { Target, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "./DiagnosticQuiz.css"

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
];

export const DiagnosticQuiz = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const generateQuiz = async () => {
      setLoading(true);
      const selectedCourseName = JSON.parse(localStorage.getItem("selectedCourse"));
      if (!selectedCourseName) {
        setError("No course selected.");
        setLoading(false);
        return;
      }

      const selectedCourseOutline = courseOutlines.find((c) => c.name === selectedCourseName);
      const weekData = selectedCourseOutline?.weeks.find((w) => w.week === currentWeek);

      if (!selectedCourseOutline || !weekData) {
        setError("Invalid course or week data.");
        setLoading(false);
        return;
      }

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
}`;

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
                content: "You are an expert educational advisor who ...",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 2000,
            temperature: 0.7,
          }),
        });

        const data = await res.json();
        const aiContent = data.choices[0].message.content;
        const cleaned = aiContent.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned.match(/\{[\s\S]*\}/)[0]);
        setCourse(parsed);
        setLoading(false);
      } catch (err) {
        setError("Error generating quiz.");
        setLoading(false);
      }
    };

    generateQuiz();
  }, [currentWeek]);

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    setSelectedAnswer(index);

    if (currentQuestion < course.quiz.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 300);
    }
  };

  const buildResults = () => {
    const topicScores = {};
    course.topics.forEach((t) => (topicScores[t] = { correct: 0, total: 0 }));
    course.quiz.forEach((q, i) => {
      const correct = answers[i] === q.answer;
      topicScores[q.topic].total++;
      if (correct) topicScores[q.topic].correct++;
    });
    return Object.entries(topicScores).map(([topic, stats]) => ({
      topic,
      ...stats,
      score: stats.total ? ((stats.correct / stats.total) * 100).toFixed(0) : "0",
      level: stats.correct / stats.total >= 0.6 ? "strong" : "weak",
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const topicResults = buildResults();
    try {
      const res = await fetch("http://localhost:3000/getGoals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: course.name,
          week: course.week,
          topicResults,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("dashboardData", JSON.stringify(data.data));
        navigate("/Dashboard");
      } else {
        throw new Error();
      }
    } catch {
      setSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="page">
        <header className="page-header">
          <div className="header-content">
            <div>
              <h1 className="title">Loading Course...</h1>
              <span className="badge outline">Preparing Quiz</span>
            </div>
          </div>
        </header>
        <main className="loading-box">
          <h2 className="gradient-text">Generating Quiz for Week {currentWeek}</h2>
          <p className="muted">This may take 10–15 seconds.</p>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page center">
        <div className="card">
          <Target className="icon error" />
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
          <button onClick={() => navigate("/courses")}>Back to Courses</button>
        </div>
      </div>
    )
  }

  if (!course) return null

  const question = course.quiz[currentQuestion]
  const isLast = currentQuestion === course.quiz.length - 1

  return (
    <div className="page">
      <header className="page-header">
        <div className="header-content">
         
          <div>
            <h1 className="title">{course.name}</h1>
            <div className="badges">
              <span className="badge outline">Diagnostic Assessment</span>
              <span className="badge secondary">Week {course.week}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="quiz-box">
        <div className="card">
          <div className="card-header">
            <div className="question-number">Question {currentQuestion + 1} of {course.quiz.length}</div>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / course.quiz.length) * 100}%` }} />
            </div>
          </div>
          <div className="card-body">
            <span className="badge small">Topic: {question.topic}</span>
            <h3>{question.question}</h3>
            <div className="options">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option ${selectedAnswer === idx ? "selected" : ""}`}
                  onClick={() => handleAnswer(idx)}
                  disabled={submitting}
                >
                  {option}
                </button>
              ))}
            </div>
            {isLast && selectedAnswer !== null && (
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
