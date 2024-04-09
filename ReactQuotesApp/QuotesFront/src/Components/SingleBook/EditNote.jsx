import React, { useState } from "react";
import { SelectList } from "../Mui/SelectList";
import "./NewNote.css";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { editBookNoteById } from "../../Pages/Books/SingleBook/SingleBookService";

export const EditNote = ({
  isOpen,
  handleFormVisibility,
  bookNote,
  updateBookNote,
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
      const editedBookNote = {
        id: bookNote.id,
        title: title,
        note: note,
        page: page,
        color: selectedColor,
      };

      const changesMade =
        editedBookNote.title !== bookNote.title ||
        editedBookNote.note !== bookNote.note ||
        editedBookNote.page !== bookNote.page ||
        editedBookNote.color !== bookNote.color;

      if (changesMade) {
        const success = await editBookNoteById(editedBookNote);

        if (success) {
          updateBookNote(editedBookNote);
          setTitle("");
          setNote("");
          setPage("");
          setSelectedColor("");
          handleFormVisibility();
        } else {
          console.error("Failed to update book note.");
        }
      } else {
        console.log("No changes made, skipping update.");
        handleFormVisibility();
      }
    } catch (error) {
      console.error("Error updating book note:", error);
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
          Save
        </button>
      </div>
    </div>
  );
};
