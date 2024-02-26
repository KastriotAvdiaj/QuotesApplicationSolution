import React, { useContext, useState } from "react";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import { DataTable } from "../../Components/Mui/Table";
import { RiAdminFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import "./AdminPanel.css";

export const AdminPanel = () => {
  const { books } = useContext(BooksContext);
  const { quotes } = useContext(QuotesContext);

  const [tableContent, setTableContent] = useState("books");

  return (
    <>
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
    </>
  );
};
