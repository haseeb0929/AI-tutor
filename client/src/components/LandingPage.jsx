import { Brain, Sparkles, ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const handleGetStarted = () => {
    console.log("User clicked 'Get Started'");
  };

  return (
    <div className={styles["landing-page"]}>
      {/* Header */}
      <header className={styles["landing-header"]}>
        <div className={styles["logo-section"]}>
          <span className={styles["logo-text"]}>AI Personal Tutor</span>
        </div>
        <button className={styles["signin-btn"]}>Sign In</button>
      </header>

      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-container"]}>
          <div className={styles["powered-badge"]}>
            <Sparkles className={styles["badge-icon"]} />
            Powered by Advanced AI
          </div>
          <h1 className={styles["hero-title"]}>
            Learn Smarter,
            <br />
            <span className={styles["gradient-text"]}>Not Harder</span>
          </h1>
          <p className={styles["hero-subtitle"]}>
            Experience personalized learning with our AI tutor that adapts to your pace, identifies knowledge gaps, and
            creates the perfect study plan just for you.
          </p>
          <div className={styles["cta-wrapper"]}>
            <Link to="/SelectCourse">
              <button className={styles["cta-btn"] + " " + styles["primary"]} onClick={handleGetStarted}>
                Let's Get Started <ArrowRight className={styles["btn-icon"]} />
              </button>
            </Link>
          </div>
          <div className={styles["features-inline"]}>
            <div className={styles["feature-item"]}>
              <CheckCircle className={styles["tick-icon"]} />
              <span>Adaptive Learning</span>
            </div>
            <div className={styles["feature-item"]}>
              <CheckCircle className={styles["tick-icon"]} />
              <span>Personalized Curriculum</span>
            </div>
            <div className={styles["feature-item"]}>
              <CheckCircle className={styles["tick-icon"]} />
              <span>Real-time Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles["features-section"]}>
        <div className={styles["container"]}>
          <div className={styles["section-header"]}>
            <h2 className={styles["section-title"]}>Why Choose AI Personal Tutor?</h2>
            <p className={styles["section-description"]}>
              Our advanced AI technology solves the problems of one-size-fits-all education
            </p>
          </div>
          <div className={styles["features-grid"]}>
            <div className={styles["feature-card"]}>
              <div className={`${styles["icon-circle"]} ${styles["blue"]}`}>
                <Brain />
              </div>
              <h3 className={styles["card-title"]}>Diagnostic Assessment</h3>
              <p className={styles["card-desc"]}>
                Our AI builds a comprehensive knowledge profile through intelligent diagnostic quizzes, identifying
                exactly what you know and what you need to learn.
              </p>
            </div>
            <div className={styles["feature-card"]}>
              <div className={`${styles["icon-circle"]} ${styles["purple"]}`}>
                <Target />
              </div>
              <h3 className={styles["card-title"]}>Adaptive Curriculum</h3>
              <p className={styles["card-desc"]}>
                Get a personalized daily goal stack optimized for spaced repetition and prerequisite ordering. Never
                waste time on material you've already mastered.
              </p>
            </div>
            <div className={styles["feature-card"]}>
              <div className={`${styles["icon-circle"]} ${styles["green"]}`}>
                <TrendingUp />
              </div>
              <h3 className={styles["card-title"]}>Real-time Updates</h3>
              <p className={styles["card-desc"]}>
                Watch your mastery probabilities update in real-time as you learn. Our Bayesian algorithms ensure you're
                always working on the right material.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles["stats-section"]}>
        <div className={styles["container"]}>
          <div className={styles["stats-grid"]}>
            <div className={styles["stat"]}>
              <div className={`${styles["stat-value"]} ${styles["blue"]}`}>85%</div>
              <div className={styles["stat-label"]}>Faster Learning</div>
            </div>
            <div className={styles["stat"]}>
              <div className={`${styles["stat-value"]} ${styles["purple"]}`}>92%</div>
              <div className={styles["stat-label"]}>Retention Rate</div>
            </div>
            <div className={styles["stat"]}>
              <div className={`${styles["stat-value"]} ${styles["green"]}`}>50%</div>
              <div className={styles["stat-label"]}>Less Study Time</div>
            </div>
            <div className={styles["stat"]}>
              <div className={`${styles["stat-value"]} ${styles["orange"]}`}>10k+</div>
              <div className={styles["stat-label"]}>Happy Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles["final-cta-section"]}>
        <div className={styles["container"]}>
          <div className={styles["cta-content"]}>
            <h2 className={styles["section-title"]}>Ready to Transform Your Learning?</h2>
            <p className={styles["section-description"]}>
              Join thousands of learners who have already discovered the power of personalized AI tutoring.
            </p>
            <button
              className={`${styles["cta-btn"]} ${styles["primary"]} ${styles["large"]}`}
              onClick={handleGetStarted}
            >
              Start Learning Now <ArrowRight className={styles["btn-icon"]} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles["footer"]}>
        <div className={styles["container"]}>
          <div className={styles["footer-content"]}>
            <div className={styles["logo-section"]}>
              <span className={styles["logo-text"]}>AI Personal Tutor</span>
            </div>
            <div className={styles["footer-text"]}>© 2024 AI Personal Tutor. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
