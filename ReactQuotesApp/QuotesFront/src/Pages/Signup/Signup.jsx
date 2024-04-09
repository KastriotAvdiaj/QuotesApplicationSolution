import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBackward } from "react-icons/fa";
import { motion } from "framer-motion";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import logoImage from "../../assets/quotesAppTransparent.png";
import "./Signup.css";

export const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [signupError, setSignupError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && currentStep < 4) {
      event.preventDefault(); // Prevent the form submission
      handleNextClick(); // Go to the next step
    }
  };

  const handleInputChange = (setter) => (event) => {
    setEmailError("");
    setConfirmPassword("");
    setPasswordError("");
    setUsernameError("");
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch(
        "https://localhost:7099/api/Authentication/Signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        setSignupError("There was an error signing up.");
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSuccessMessage("You have Successfully Signed Up !");
      setTimeout(() => setSuccessMessage(""), 3000);
      setSignupError("");
      handleNextClick();
    } catch (error) {
      setSignupError("There was an error signing up. " + error);
      console.error("There was an error!", error);
    }
  };

  // .
  //   EMAIL VALIDATION
  // .
  const checkEmail = async () => {
    if (!email.trim()) {
      setEmailError("Please fill in the email!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7099/api/Authentication/IsEmailUsed?email=${email}`
      );
      const isUsed = await response.json();
      if (isUsed) {
        setEmailError("Email is already in use.");
        return false;
      }
      setEmailError("");
      return true;
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailError("Failed to check email.");
      return false;
    }
  };

  // .
  //   USERNAME VALIDATION
  // .
  const checkUsername = async () => {
    if (!username.trim()) {
      setUsernameError("Please fill in the Username!");
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7099/api/Authentication/isUsernameUsed?username=${username}`
      );
      const isUsed = await response.json();
      if (isUsed) {
        setUsernameError("Username already exists! Pick a different one.");
        return false;
      }
      setUsernameError("");
      return true;
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameError("Failed to check sername.");
    }
  };

  // .
  //   PASSWORD VALIDATION
  // .

  const validatePassword = (password) => {
    let errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      errors.push(
        "Password must contain at least one special character (!@#$%^&*())."
      );
    }
    return errors;
  };

  const checkPassword = async () => {
    if (!password.trim()) {
      setPasswordError("Password is required.");
      return false;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join("\n"));
      return false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password.");
      return false;
    }

    if (!(confirmPassword === password)) {
      setConfirmPasswordError("Passwords must be matching.");
      return false;
    }

    try {
      const response = await fetch(
        `https://localhost:7099/api/Authentication/ValidatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(password),
        }
      );
      const result = await response.json();
      if (!result.isValid) {
        setPasswordError(result.errors.join(" "));
        return false;
      }
      setPasswordError("");
      return true;
    } catch (error) {
      console.error("Error validating password:", error);
      setPasswordError("Failed to validate password.");
      return false;
    }
  };

  // .
  //   NEXT BUTTON CLICK
  // .
  const handleNextClick = async () => {
    switch (currentStep) {
      case 1:
        const isEmailValid = await checkEmail();
        if (!isEmailValid) return;
        break;
      case 2:
        const isUserNameValid = await checkUsername();
        if (!isUserNameValid) return;
        break;
      case 3:
        const isPasswordValid = await checkPassword();
        if (!isPasswordValid) return;
        break;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // .
  //   BACK BUTTON CLICK
  // .
  const handleBackClick = () => {
    if (currentStep === 1) {
      handleBackToHome();
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <p className="emailParagraph">Enter your email</p>
              {emailError && <p className="error">{emailError}</p>}
              <input
                type="email"
                value={email}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange(setEmail)}
                placeholder="Enter your email"
              />
            </motion.div>
          </>
        );
      case 2:
        return (
          <>
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <p className="emailParagraph">Choose a Username</p>
              {usernameError && <p className="error">{usernameError}</p>}
              <input
                type="text"
                value={username}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange(setUsername)}
                placeholder="Choose a username"
              />
            </motion.div>
          </>
        );
      case 3:
        return (
          <>
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <p className="emailParagraph">Pick a Password</p>
              {passwordError.split("\n").map((line, index) => (
                <p key={index} className="error">
                  {line}
                </p>
              ))}
              <input
                type="password"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange(setPassword)}
                placeholder="Enter your password"
              />
              {confirmPasswordError && (
                <p className="error">{confirmPasswordError}</p>
              )}
              <input
                type="password"
                value={confirmPassword}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange(setConfirmPassword)}
                placeholder="Confirm your password"
              />
            </motion.div>
          </>
        );
      default:
        return (
          <div>
            Review your information
            <p>Username : {username}</p>
            <p>Email : {email}</p>
            {signupError && <p className="error">{signupError}</p>}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <SuccessMessage message={successMessage} />
      <div className="signupMainDiv">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <img src={logoImage} style={{ height: "200px" }} />
          <form className="signupForm" onSubmit={handleSubmit}>
            <div className="signupTitle">
              <h2 className="page-title">Sign Up</h2>
            </div>

            {renderStep()}
            {currentStep < 4 && (
              <>
                <p className="accountPrompt">
                  Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
                <div className="nextBackButtons">
                  <button
                    type="button"
                    className="backButton"
                    onClick={handleBackClick}
                  >
                    <FaBackward style={{ marginTop: "0.2rem" }} />
                    <p>Back</p>
                  </button>
                  <button
                    type="button"
                    className="nextButton"
                    onClick={handleNextClick}
                  >
                    <p>Next</p>
                    <TbPlayerTrackNextFilled style={{ marginTop: "0.2rem" }} />
                  </button>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <div>
                <button type="submit">Submit</button>
                <button onClick={handleBackClick}>Cancel</button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
