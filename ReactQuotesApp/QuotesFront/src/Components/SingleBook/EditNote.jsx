import React, { useState } from "react";
import { SelectList } from "../Mui/SelectList";
import "./NewNote.css";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export const EditNote = ({
  isOpen,
  handleFormVisibility,
  bookNote,
  updateBookNotes,
  bookTitle,
}) => {
  let backgroundColor;

  switch (bookNote.color) {
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
      backgroundColor = bookNote.color ? bookNote.color : "#C8D8F3";
  }

  const [selectedColor, setSelectedColor] = useState(bookNote.color);
  const [title, setTitle] = useState(bookNote.title);
  const [note, setNote] = useState(bookNote.note);
  const [page, setPage] = useState(bookNote.page);

  console.log(bookNote);
  console.log(bookNote.color);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BookNote = {
        Title: title,
        Note: note,
        Page: page,
        Color: selectedColor,
      };

      //   const newNote = await postBookNote(bookId, BookNote);

      updateBookNotes(newNote);
      setTitle("");
      setNote("");
      setPage("");
      setSelectedColor("");

      handleFormVisibility();
    } catch (error) {
      console.error("Error posting book note:", error);
    }
  };

  return (
    <div
      className={isOpen ? "newNoteWrapperDiv open" : "newNoteWrapperDiv"}
      onClick={handleFormVisibility}
    >
      <div className="newNoteContainerDiv" onClick={handleInsideClick}>
        <div
          className="newNoteTopBar"
          style={{ backgroundColor: `${backgroundColor}` }}
        >
          <p style={{ color: "black" }}>
            Update Note for "
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
            <SelectList
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
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
        <button onClick={handleSubmit} className="newNoteAddButton">
          Add
        </button>
      </div>
    </div>
  );
};
