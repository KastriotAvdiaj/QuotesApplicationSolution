import React from "react";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <NavLink to="/signup">
        <button> Signup </button>
      </NavLink>
    </>
  );
};
