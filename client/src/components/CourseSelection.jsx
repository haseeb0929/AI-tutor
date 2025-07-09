import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Brain, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

export const CourseSelection = () => {
    const courses = [
        {
            id: 1,
            name: "Computer Networks",
            createdAt: new Date(),
            diagnosticComplete: false,
            quiz: true,
            masteryStats: {
                averageMastery: 0.0,
            },
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2">
                        <Brain className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold">Choose Your Learning Path</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">What would you like to learn?</h2>
                        <p className="text-gray-600">
                            Start your personalized learning journey with any of the following courses.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {courses.map((course) => (
                            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            {course.name}
                                        </CardTitle>
                                        <div className="flex gap-2">
                                            {course.diagnosticComplete && <Badge variant="default">Completed</Badge>}
                                            {course.quiz && !course.diagnosticComplete && (
                                                <p className="inline-flex items-center rounded-full border border-transparent bg-gray-100 text-gray-700 px-2.5 py-0.5 text-xs font-semibold transition-colors">
                                                    Ready
                                                </p>
                                            )}
                                            {!course.quiz && <Badge variant="outline">Generating...</Badge>}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">
                                            Created: {course.createdAt.toLocaleDateString()}
                                        </p>
                                        {course.diagnosticComplete && (
                                            <div className="space-y-1">
                                                <p className="text-sm">
                                                    Progress: {Math.round(course.masteryStats.averageMastery * 100)}%
                                                </p>
                                                <Progress
                                                    value={((currentQuestion + 1) / course.quiz.length) * 100}
                                                    className="w-full"
                                                />

                                            </div>
                                        )}
                                        <Link to={"/DiagnosticQuiz"}><Button className="w-full mt-4 bg-black text-white" onClick={() => {
                                            localStorage.setItem("selectedCourse", JSON.stringify(course.name));
                                        }}>
                                            {course.diagnosticComplete ? "Continue Learning" : "Start Diagnostic"}
                                        </Button></Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
