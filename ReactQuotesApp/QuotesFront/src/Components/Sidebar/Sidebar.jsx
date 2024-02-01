import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/quotesLogo2.png";

export const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logoText">
          <img
            src={Logo}
            alt=""
            style={{ padding: "1rem", height: "50px", width: "50px" }}
          />
          Quotes App
        </div>
        <ul className="sidebarUl">
          <li>First Item</li>
          <li>Second Item</li>
        </ul>
      </div>
    </>
  );
};
