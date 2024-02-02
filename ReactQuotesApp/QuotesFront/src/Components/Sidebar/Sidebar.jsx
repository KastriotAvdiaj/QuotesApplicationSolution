import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/quotesLogo2.png";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logoText">
          <NavLink to="/">
            <img
              src={Logo}
              alt=""
              style={{
                padding: "1rem",
                height: "50px",
                width: "50px",
              }}
            />
            Quotes App
          </NavLink>
        </div>

        <ul className="sidebarUl">
          <li>
            <NavLink to="/quotes">Quotes</NavLink>
          </li>
          <li>
            <NavLink to="#">Second Item</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
