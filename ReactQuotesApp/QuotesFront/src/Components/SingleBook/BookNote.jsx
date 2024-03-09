import React, { useState } from "react";
import "./BookNote.css";
import { Divider } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const BookNote = ({ note }) => {
  let backgroundColor;

  switch (note.color) {
    case "Blue":
      backgroundColor = "#C8D8F3";
      break;
    case "Yellow":
      backgroundColor = "#F2F6B8";
      break;
    case "Purple":
      backgroundColor = "#FAC5F8";
      break;
    case "Green":
      backgroundColor = "#CEFAC5";
      break;
    case "Red":
      backgroundColor = "#FAC5C5";
      break;
    default:
      backgroundColor = note.color ? note.color : "#C8D8F3";
  }

  const textColor = "black";

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div
      className="bookNoteMainWrapperDiv"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="noteHeader" onClick={toggleCollapse}>
        <h5>{note.title}</h5>
        {isCollapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}{" "}
      </div>
      <Divider sx={{ backgroundColor: "black" }} variant="middle" />
      {!isCollapsed && ( 
        <>
          <p className="noteParagraph">{note.note}</p>
          <p className="pageParagraph">Page - {note.page}</p>
        </>
      )}
    </div>
  );
};
