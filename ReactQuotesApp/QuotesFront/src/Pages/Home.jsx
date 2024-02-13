import React from "react";
import { NavLink } from "react-router-dom";
import frontPageImage from "../assets/frontPageImage.png";
import quotesImage from "../assets/quotesImage.png";
import booksImage from "../assets/booksImage.png";
import atomicHabits from "../assets/atomicHabits.jpg";
import briefAnswers from "../assets/briefAnswers.jpg";
import cantHurtMe from "../assets/cantHurtMe.jpg";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="homeMainDiv">
        <div className="firstRow">
          <div
            className="backgroundImage"
            style={{ backgroundImage: `url(${frontPageImage})` }}
          />
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
                  {/* Add more images here if needed */}
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
