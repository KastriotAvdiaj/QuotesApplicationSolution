import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/quotesAppTransparent.png";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

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
    setPassword(""); // Clear the password if you want the user to re-enter it
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here with email and password
    console.log(email, password);
  };

  return (
    <>
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
    </>
  );
};
