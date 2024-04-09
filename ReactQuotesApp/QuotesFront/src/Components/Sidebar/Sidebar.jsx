import React from "react";
import "./Sidebar.css";
import { FaBook } from "react-icons/fa";
import Logo2 from "../../assets/quotesAppTransparent.png";
import { NavLink } from "react-router-dom";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { BiSolidQuoteSingleRight } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";

export const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="sidebar">
        <div className="logoText">
          <NavLink to="/">
            <img
              src={Logo2}
              alt=""
              style={{
                padding: "1rem",
                height: "50px",
                width: "50px",
              }}
            />
            Everything App
          </NavLink>
        </div>

        <ul className="sidebarUl">
          <li>
            <NavLink to="/quotes">
              Quotes
              <div>
                <BiSolidQuoteSingleLeft />
                <BiSolidQuoteSingleRight />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotes2">
              Quotes2
              <div>
                <BiSolidQuoteSingleLeft />
                <BiSolidQuoteSingleRight />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/books">
              Books <FaBook />
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users">
              Users <FaCircleUser />
            </NavLink>
          </li>
        </ul>
        {!isAuthenticated ? (
          <div className="bottomButtons">
            <NavLink to="/login">
              {" "}
              <IoMdLogIn /> Login
            </NavLink>
            <NavLink to="/signup">
              <MdPerson /> Signup
            </NavLink>
          </div>
        ) : (
          <div className="bottomButtons2">
            <NavLink to="/admin" className="adminButton">
              <RiAdminFill /> Admin
            </NavLink>
            <NavLink onClick={handleLogout}>
              <RiLogoutCircleLine />
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};
