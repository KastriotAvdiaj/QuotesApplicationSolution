import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/quotesLogo2.png";
import { NavLink } from "react-router-dom";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { BiSolidQuoteSingleRight } from "react-icons/bi";

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
            <NavLink to="/quotes">
              <BiSolidQuoteSingleLeft />
              Quotes
              <BiSolidQuoteSingleRight />
            </NavLink>
          </li>
          <li>
            <NavLink to="/books">Second Item</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
