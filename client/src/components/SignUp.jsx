import { useState } from "react";
import { Brain, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import styles from "./SignUp.module.css";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    // Handle signup logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = () => {
    if (formData.password.length === 0) return { strength: 0, text: "" };
    if (formData.password.length < 8) return { strength: 1, text: "Too short" };
    return { strength: 4, text: "Strong" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className={styles["signup-page"]}>
      <div className={styles["signup-container"]}>
        {/* Header */}
        <div className={styles["signup-header"]}>
          <div className={styles["brand-section"]}>
            <h1 className={styles["brand-title"]}>AI Personal Tutor</h1>
          </div>
          <p className={styles["signup-subtitle"]}>
            Create your account and start learning today.
          </p>
        </div>

        {/* Signup Form */}
        <div className={styles["signup-card"]}>
          <form onSubmit={handleSubmit} className={styles["signup-form"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="fullName" className={styles["form-label"]}>
                Full Name
              </label>
              <div className={styles["input-wrapper"]}>
                <User className={styles["input-icon"]} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={styles["form-input"]}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="email" className={styles["form-label"]}>
                Email Address
              </label>
              <div className={styles["input-wrapper"]}>
                <Mail className={styles["input-icon"]} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles["form-input"]}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password" className={styles["form-label"]}>
                Password
              </label>
              <div className={styles["input-wrapper"]}>
                <Lock className={styles["input-icon"]} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles["form-input"]}
                  placeholder="Create a password (min 8 characters)"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles["password-toggle"]}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {formData.password && (
                <div className={styles["password-strength"]}>
                  <div className={styles["strength-bars"]}>
                    <div
                      className={`${styles["strength-bar"]} ${
                        passwordStrength.strength >= 1
                          ? passwordStrength.strength === 1
                            ? styles["weak"]
                            : styles["strong"]
                          : ""
                      }`}
                    ></div>
                    <div
                      className={`${styles["strength-bar"]} ${
                        passwordStrength.strength >= 2 ? styles["strong"] : ""
                      }`}
                    ></div>
                    <div
                      className={`${styles["strength-bar"]} ${
                        passwordStrength.strength >= 3 ? styles["strong"] : ""
                      }`}
                    ></div>
                    <div
                      className={`${styles["strength-bar"]} ${
                        passwordStrength.strength >= 4 ? styles["strong"] : ""
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${styles["strength-text"]} ${
                      passwordStrength.strength === 1 ? styles["weak"] : styles["strong"]
                    }`}
                  >
                    {passwordStrength.text}
                  </span>
                </div>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="confirmPassword" className={styles["form-label"]}>
                Confirm Password
              </label>
              <div className={styles["input-wrapper"]}>
                <Lock className={styles["input-icon"]} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={styles["form-input"]}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={styles["password-toggle"]}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className={styles["form-options"]}>
              <label className={styles["checkbox-wrapper"]}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className={styles["checkbox-input"]}
                  required
                />
                <span className={styles["checkbox-label"]}>
                  I agree to the{" "}
                  <a href="#" className={styles["terms-link"]}>
                    Terms & Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button type="submit" className={styles["signup-button"]}>
              Create Account
            </button>
          </form>

          <div className={styles["signup-footer"]}>
            <p className={styles["login-prompt"]}>
              Already have an account?{" "}
              <a href="#" className={styles["login-link"]}>
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Additional Options */}
        <div className={styles["signup-divider"]}>
          <span>or sign up with</span>
        </div>

        <div className={styles["social-signup"]}>
          <button className={`${styles["social-button"]} ${styles["google"]}`}>
            <svg className={styles["social-icon"]} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className={`${styles["social-button"]} ${styles["microsoft"]}`}>
            <svg className={styles["social-icon"]} viewBox="0 0 24 24">
              <path fill="#f25022" d="M1 1h10v10H1z" />
              <path fill="#00a4ef" d="M13 1h10v10H13z" />
              <path fill="#7fba00" d="M1 13h10v10H1z" />
              <path fill="#ffb900" d="M13 13h10v10H13z" />
            </svg>
            Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};
