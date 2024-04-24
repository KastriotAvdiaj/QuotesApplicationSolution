import React, { useState } from "react";
import "./ChangePassword.css";
import { CircularProgress } from "@mui/material";
import { updateUserPassword } from "./UsersService";
import Alert from "@mui/material/Alert";

const ChangePassword = ({ onClose, userId }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

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
    setIsLoading(true);

    if (!password.trim()) {
      setPasswordError("Password is required.");
      setIsLoading(false);
      return false;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors.join("\n"));
      setIsLoading(false);
      return false;
    }
    setPasswordError("");
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password.");
      setIsLoading(false);
      return false;
    }

    if (!(confirmPassword === password)) {
      setConfirmPasswordError("Passwords must be matching.");
      setIsLoading(false);
      return false;
    }

    try {
      setIsLoading(true);
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
      const updatePass = await updateUserPassword(userId, password);
      if (updatePass.ok) {
        setTimeout(() => {
          setAlertOpen(true);
        }, 1000);
        setTimeout(() => {
          setAlertOpen(false);
          setIsLoading(false);
          onClose();
        }, 2000);
        console.log("Successfully updated password");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error validating password:", error);
      setPasswordError("Failed to validate/update password.");
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
            {isAlertOpen && (
              <Alert
                variant="filled"
                severity="success"
                className={`alert-positioned2`}
              >
                Successfully Updated Password!
              </Alert>
            )}

            <button onClick={checkPassword} style={{ width: "180px" }}>
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Change Password"
              )}
            </button>
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
