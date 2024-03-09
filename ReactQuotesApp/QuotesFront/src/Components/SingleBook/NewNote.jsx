import React, { useState } from "react";
import { SelectList } from "../Mui/SelectList";
import "./NewNote.css";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export const NewNote = ({ isOpen, handleFormVisibility, bookTitle }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [page, setPage] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handlePageChange = (event) => {
    const value = event.target.value;
    setPage(value.replace(/[^0-9]/g, ""));
  };

  const handleInsideClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={isOpen ? "newNoteWrapperDiv open" : "newNoteWrapperDiv"}
      onClick={handleFormVisibility}
    >
      <div className="newNoteContainerDiv" onClick={handleInsideClick}>
        <div className="newNoteTopBar">
          <p>
            New Note for "
            <span style={{ fontWeight: "bold" }}>{bookTitle}</span>"
          </p>
          <button
            className="newNoteCloseButton"
            onClick={(e) => {
              e.stopPropagation();
              handleFormVisibility();
            }}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="newNoteForm">
          <div>
            <TextField
              id="outlined-title"
              sx={{ m: 1, width: "30ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Title |</InputAdornment>
                ),
              }}
              value={title}
              onChange={handleTitleChange}
            />
            <SelectList onColorChange={handleColorChange} />
          </div>
          <TextField
            id="outlined-note"
            sx={{ m: 1 }}
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Note* |</InputAdornment>
              ),
            }}
            value={note}
            onChange={handleNoteChange}
          />
          <TextField
            id="outlined-page"
            sx={{ m: 1, width: "15ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Page* |</InputAdornment>
              ),
            }}
            value={page}
            onChange={handlePageChange}
            // Setting type as number
            type="number"
          />
        </div>
        <button className="newNoteAddButton">Add</button>
      </div>
    </div>
  );
};
