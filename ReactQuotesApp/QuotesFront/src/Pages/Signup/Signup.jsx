import React, { useState } from "react";
import "./Signup.css";

export const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const checkEmail = async () => {
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

  const handleNextClick = async () => {
    if (currentStep === 1) {
      const isEmailValid = await checkEmail();
      if (!isEmailValid) return;
    }
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="Enter your email"
            />
            {emailError && <p className="error">{emailError}</p>}
          </>
        );
      case 2:
        return (
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            placeholder="Choose a username"
          />
        );
      case 3:
        return (
          <>
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
        return <div>Review your information</div>;
    }
  };

  return (
    <div className="signupMainDiv">
      <form className="signupForm">
        {renderStep()}
        {currentStep < 4 && (
          <button type="button" onClick={handleNextClick}>
            Next
          </button>
        )}
        {currentStep === 4 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};
