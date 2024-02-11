import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBackward } from "react-icons/fa";
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

  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNextClick();
  };

  const checkEmail = async () => {
    if (!email.trim()) {
      setEmailError("Please fill in the email!");
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

  const handleNextClick = async () => {
    if (currentStep === 1) {
      const isEmailValid = await checkEmail();
      if (!isEmailValid) return;
    }
    if (currentStep === 2) {
      const isUserNameValid = await checkUsername();
      if (!isUserNameValid) return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

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
            <p className="emailParagraph">Enter your email</p>
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="Enter your email"
            />
          </>
        );
      case 2:
        return (
          <>
            <p className="emailParagraph">Choose a Username</p>
            {usernameError && <p className="error">{usernameError}</p>}
            <input
              type="text"
              value={username}
              onChange={handleInputChange(setUsername)}
              placeholder="Choose a username"
            />
          </>
        );
      case 3:
        return (
          <>
            <p className="emailParagraph">Pick a Password</p>
            <input
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Enter your password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              placeholder="Confirm your password"
            />
          </>
        );
      default:
        return (
          <div>
            Review your information
            <p>Username : {username}</p>
            <p>Email : {email}</p>
          </div>
        );
    }
  };

  return (
    <div className="signupMainDiv">
      <form className="signupForm" onSubmit={handleSubmit}>
        {renderStep()}
        {currentStep < 4 && (
          <>
            <div className="nextBackButtons">
              <button
                type="button"
                className="backButton"
                onClick={handleBackClick}
              >
                <FaBackward />
                <p>Back</p>
              </button>
              <button
                type="button"
                className="nextButton"
                onClick={handleNextClick}
              >
                <p>Next</p>
                <TbPlayerTrackNextFilled />
              </button>
            </div>
          </>
        )}
        {currentStep === 4 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};
