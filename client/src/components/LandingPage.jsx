import React from 'react';
import { Brain, Sparkles, ArrowRight, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const handleGetStarted = () => {
    // Example navigation logic or modal trigger
    console.log("User clicked 'Get Started'");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">AI Personal Tutor</span>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex hover:bg-purple-50 hover:text-purple-700 transition"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Learn Smarter,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Not Harder
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience personalized learning with our AI tutor that adapts to your pace, identifies knowledge gaps, and
            creates the perfect study plan just for you.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Link to ="/SelectCourse">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Let's Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Adaptive Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Personalized Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Real-time Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI Personal Tutor?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our advanced AI technology solves the problems of one-size-fits-all education
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Diagnostic Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Our AI builds a comprehensive knowledge profile through intelligent diagnostic quizzes, identifying
                exactly what you know and what you need to learn.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Adaptive Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Get a personalized daily goal stack optimized for spaced repetition and prerequisite ordering. Never
                waste time on material you've already mastered.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Watch your mastery probabilities update in real-time as you learn. Our Bayesian algorithms ensure you're
                always working on the right material.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Faster Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-gray-600">Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50%</div>
              <div className="text-gray-600">Less Study Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">10k+</div>
              <div className="text-gray-600">Happy Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who have already discovered the power of personalized AI tutoring.
          </p>
          <Button
            size="lg"
            className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleGetStarted}
          >
            Start Learning Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6" />
              <span className="text-xl font-bold">AI Personal Tutor</span>
            </div>
            <div className="text-gray-400">© 2024 AI Personal Tutor. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
