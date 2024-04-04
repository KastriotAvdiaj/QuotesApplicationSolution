import React, { useState } from "react";
import "./BookNote.css";
import { Divider } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { deleteBookNoteById } from "../../Pages/Books/SingleBook/SingleBookService";

export const BookNote = ({ note, successDeletion, openAlertDialog }) => {
  const { isAuthenticated } = useAuth();

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

  const handleDelete = () => {
    openAlertDialog();
  };

  const handleDeleteButtonClick = async (noteId) => {
    try {
      const response = await deleteBookNoteById(noteId);
      if (response) {
        successDeletion(noteId);
      }
    } catch (e) {
      console.error("Failed to delete book note:", e);
    }
  };
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
          <div className="pageAndDeleteButtonDiv">
            {isAuthenticated && (
              <button
                className="deleteNoteButton"
                // onClick={() => handleDeleteButtonClick(note.id)}
                onClick={() => handleDelete()}
              >
                {" "}
                <RiDeleteBin6Fill />
              </button>
            )}

            <p className="pageParagraph">Page - {note.page}</p>
          </div>
        </>
      )}
    </div>
  );
};
