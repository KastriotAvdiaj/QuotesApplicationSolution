import React from "react";
import "./Error.css";
import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <div className="mainErrorDiv">
      <div className="errorContent">
        <h1>This page does not exist.</h1>
        <NavLink to="/">
          <h3>Go back to Home page.</h3>
        </NavLink>
      </div>
    </div>
  );
};
