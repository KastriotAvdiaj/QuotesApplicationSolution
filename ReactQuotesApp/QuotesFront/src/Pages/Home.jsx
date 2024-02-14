import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import frontPageImage from "../assets/frontPageImage.png";
import quotesImage from "../assets/quotesImage.png";
import mainImage from "../assets/mainImage.png";
import secondMainImage from "../assets/secondMainImage.png";
import booksImage from "../assets/booksImage.png";
import atomicHabits from "../assets/atomicHabits.jpg";
import briefAnswers from "../assets/briefAnswers.jpg";
import cantHurtMe from "../assets/cantHurtMe.jpg";
import { PiSignInFill } from "react-icons/pi";
import "./Home.css";

export const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [mainImage, frontPageImage, secondMainImage];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      <div className="homeMainDiv">
        <div className="firstRow slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`mainBackgroundImage ${
                index === currentImageIndex ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
          <p className="firstParagraph">
            Welcome to Everything, where you can save your story.
          </p>
        </div>
        <div className="secondRow">
          <NavLink to="/quotes">
            <div className="quotesSection">
              <p className="topParagraph">Discover life-changing quotes</p>
              <div className="quotesDiv">
                <div
                  className="backgroundImage"
                  style={{ backgroundImage: `url(${quotesImage})` }}
                />
                <p className="quotesParagraph">
                  "The things you think about, determine the quality of your
                  mind."
                </p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/books">
            <div className="booksSection">
              <p className="topParagraph">Explore our book collection</p>
              <div className="booksDiv">
                <div
                  className="backgroundImage"
                  style={{ backgroundImage: `url(${booksImage})` }}
                />
                <div className="bookImages">
                  <img
                    src={atomicHabits}
                    alt="Atomic Habits"
                    className="bookImage"
                  />
                  <img
                    src={briefAnswers}
                    alt="Brief Answers to the Big Questions"
                    className="bookImage"
                  />
                  <img
                    src={cantHurtMe}
                    alt="Can't Hurt Me"
                    className="bookImage"
                  />
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="signupDiv">
          <p className="signUpParagraph">
            Let's Get You Set Up With a Personal Account by{" "}
            <NavLink to="/signup"> Signing Up. </NavLink>
          </p>
          <NavLink to="/signup">
            <button className="signupButton">
              <PiSignInFill /> Sign Up
            </button>
          </NavLink>
        </div>
        <div className="signupDiv">
          <p className="logInParagraph">
            Or If You Are Already Registered{" "}
            <NavLink to="/login">Log In. </NavLink>
          </p>
          <NavLink to="/login">
            <button className="loginButton">
              <PiSignInFill /> Log In
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
