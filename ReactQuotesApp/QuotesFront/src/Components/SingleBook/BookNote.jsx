import React, { useState, useEffect } from "react";
import "./BookNote.css";
import { Divider } from "@mui/material";

export const BookNote = ({ note }) => {
  console.log(note.color);
  return (
    <div
      className="bookNoteMainWrapperDiv"
      style={{
        backgroundColor: note.color ? note.color : "#C8D8F3",
        color: note.color ? "white" : "black",
      }}
    >
      <h5>{note.title}</h5>
      <Divider sx={{ backgroundColor: "black" }} variant="middle" />
      <p className="noteParagraph">{note.note}</p>
      <p className="pageParagraph">Page - {note.page}</p>
      {/* <p >{note.note}</p> */}
    </div>
  );
};
