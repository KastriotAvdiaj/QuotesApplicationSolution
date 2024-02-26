import React, { useContext, useState } from "react";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import { DataTable } from "../../Components/Mui/Table";
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { FaBook } from "react-icons/fa";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import "./AdminPanel.css";
import { NavLink } from "react-router-dom";

export const AdminPanel = () => {
  const { books } = useContext(BooksContext);
  const { quotes } = useContext(QuotesContext);
  const { isAuthenticated } = useAuth();

  const [tableContent, setTableContent] = useState("books");

  return (
    <>
      {isAuthenticated ? (
        <div className="mainAdminContainer">
          <div className="adminMainHeader">
            <h2>
              Admin Panel
              <RiAdminFill style={{ color: "#F1D548" }} />
            </h2>
            <div className="adminPanelButtonsDiv">
              <button
                onClick={() => {
                  setTableContent("books");
                }}
                className={tableContent === "books" ? "active" : ""}
              >
                Books <FaBook />
              </button>
              <button
                onClick={() => {
                  setTableContent("quotes");
                }}
                className={tableContent === "quotes" ? "active" : ""}
              >
                Quotes <BsFillChatLeftQuoteFill />
              </button>
            </div>
          </div>

          <DataTable
            items={tableContent === "books" ? books : quotes}
            whatItem={tableContent}
          />
        </div>
      ) : (
        <div className="accessDenied">
          <p>
            Access Denied! <br /> You don't have access to this page.
          </p>
          <NavLink to="/login">
            {" "}
            <button className="loginButtonAdmin">Login</button>
          </NavLink>
        </div>
      )}
    </>
  );
};
