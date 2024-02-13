import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="homeMainDiv">
        <div className="firstRow">
          <p className="firstParagraph">
            Welcome to Everything, where you can save your story.
          </p>
        </div>
        <div className="secondRow">
          <NavLink to="/quotes">
            <div className="quotesDiv">Quotes Content</div>
          </NavLink>
          <NavLink to="/books">
            <div className="booksDiv">Books Content</div>
          </NavLink>
          {/* Home
          <NavLink to="/signup">
            <button> Signup </button>
          </NavLink>
          <NavLink to="/login">
            <button> Login </button>
          </NavLink> */}
        </div>
      </div>
    </>
  );
};
