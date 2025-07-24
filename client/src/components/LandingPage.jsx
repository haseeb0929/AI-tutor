import { Brain, Sparkles, ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react"
import "./LandingPage.css"
import { Link } from "react-router-dom"

const LandingPage = () => {
  const handleGetStarted = () => {
    console.log("User clicked 'Get Started'")
  }

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo-section">
          <span className="logo-text">AI Personal Tutor</span>
        </div>
        <button className="signin-btn">Sign In</button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="powered-badge">
            <Sparkles className="badge-icon" />
            Powered by Advanced AI
          </div>
          <h1 className="hero-title">
            Learn Smarter,
            <br />
            <span className="gradient-text">Not Harder</span>
          </h1>
          <p className="hero-subtitle">
            Experience personalized learning with our AI tutor that adapts to your pace, identifies knowledge gaps, and
            creates the perfect study plan just for you.
          </p>
          <div className="cta-wrapper">
            <Link to="/SelectCourse">
              <button className="cta-btn primary" onClick={handleGetStarted}>
                Let's Get Started <ArrowRight className="btn-icon" />
              </button>
            </Link>
          </div>
          <div className="features-inline">
            <div className="feature-item">
              <CheckCircle className="tick-icon" />
              <span>Adaptive Learning</span>
            </div>
            <div className="feature-item">
              <CheckCircle className="tick-icon" />
              <span>Personalized Curriculum</span>
            </div>
            <div className="feature-item">
              <CheckCircle className="tick-icon" />
              <span>Real-time Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose AI Personal Tutor?</h2>
            <p className="section-description">
              Our advanced AI technology solves the problems of one-size-fits-all education
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-circle blue">
                <Brain />
              </div>
              <h3 className="card-title">Diagnostic Assessment</h3>
              <p className="card-desc">
                Our AI builds a comprehensive knowledge profile through intelligent diagnostic quizzes, identifying
                exactly what you know and what you need to learn.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-circle purple">
                <Target />
              </div>
              <h3 className="card-title">Adaptive Curriculum</h3>
              <p className="card-desc">
                Get a personalized daily goal stack optimized for spaced repetition and prerequisite ordering. Never
                waste time on material you've already mastered.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-circle green">
                <TrendingUp />
              </div>
              <h3 className="card-title">Real-time Updates</h3>
              <p className="card-desc">
                Watch your mastery probabilities update in real-time as you learn. Our Bayesian algorithms ensure you're
                always working on the right material.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-value blue">85%</div>
              <div className="stat-label">Faster Learning</div>
            </div>
            <div className="stat">
              <div className="stat-value purple">92%</div>
              <div className="stat-label">Retention Rate</div>
            </div>
            <div className="stat">
              <div className="stat-value green">50%</div>
              <div className="stat-label">Less Study Time</div>
            </div>
            <div className="stat">
              <div className="stat-value orange">10k+</div>
              <div className="stat-label">Happy Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="section-title">Ready to Transform Your Learning?</h2>
            <p className="section-description">
              Join thousands of learners who have already discovered the power of personalized AI tutoring.
            </p>
            <button className="cta-btn primary large" onClick={handleGetStarted}>
              Start Learning Now <ArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo-section">
              <span className="logo-text">AI Personal Tutor</span>
            </div>
            <div className="footer-text">© 2024 AI Personal Tutor. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
