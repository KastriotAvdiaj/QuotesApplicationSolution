import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    setPasswordError("");
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
      console.log(result);
      if (!result.isValid) {
        setPasswordError(result.errors.join(" "));
        return false;
      }
      setConfirmPasswordError("");
      setPasswordError("");
      return true;
    } catch (error) {
      console.error("Error validating password:", error);
      setPasswordError("Failed to validate password.");
      return false;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError.split("\n").map((line, index) => (
              <p key={index} className="error">
                {line}
              </p>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <p className="error">{confirmPasswordError}</p>
            )}
          </div>
          <div className="button-group">
            <button onClick={checkPassword}>Change Password</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
