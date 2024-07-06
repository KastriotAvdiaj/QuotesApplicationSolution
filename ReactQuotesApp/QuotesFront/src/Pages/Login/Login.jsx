import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/quotesAppTransparent.png";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Login.css";

export const Login = () => {
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("kaloti.avdiaj@gmail.com");
  // const [email, setEmail] = useState("emily_jones@example.com");

  const [password, setPassword] = useState("Kastriot!234");
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleUsername = (name) => {
    setUsername(name);
  };

  const { isAuthenticated } = useAuth();

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setShowPasswordInput(true);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setShowPasswordInput(false); // Allows the user to go back and edit the email
    // setPassword("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelLogout = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://localhost:7099/api/Authentication/SignIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        handleUsername(data.username);
        login(data.token, data.username, data.id);
        console.log("Login Successful:", data);
        navigate("/");
      } else {
        setError("Email or password incorrect!");
        console.error("Login Failed:", response.status);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <>
      {!isAuthenticated ? (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <div className="mainLoginDiv">
            <img src={logoImage} style={{ height: "200px" }} />
            <form
              className="loginForm"
              onSubmit={showPasswordInput ? handleLogin : handleContinue}
            >
              <div className="signupTitle">
                <h2 className="page-title">Log In</h2>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
                transition={{ duration: 0.5 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoFocus
                  readOnly={showPasswordInput}
                />
                {!showPasswordInput && (
                  <>
                    <p className="accountPrompt">
                      Don't have an account?{" "}
                      <NavLink to="/signup">Sign up</NavLink>
                    </p>
                    <div className="loginButtonGroup">
                      <button className="continueButton" type="submit">
                        Continue{" "}
                        <TbPlayerTrackNextFilled
                          style={{ marginLeft: "0.4rem", marginTop: "0.2rem" }}
                        />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
              <AnimatePresence>
                {showPasswordInput && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    {error && <p className="error">{error}</p>}
                    <p className="accountPrompt">
                      Don't have an account?{" "}
                      <NavLink to="/signup">Sign up</NavLink>
                    </p>
                    <div className="loginButtonGroup">
                      <button type="button" onClick={handleBack}>
                        Back
                      </button>
                      <button type="submit">Login</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      ) : (
        <div className="mainLoginDiv">
          <div className="loginForm">
            <p className="logoutParagraph">
              You're currently logged in as{" "}
              {localStorage.getItem("username") || username}, with this email{" "}
              {email}. Would you like to logout?
            </p>
            <div className="logoutButtons">
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleCancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
