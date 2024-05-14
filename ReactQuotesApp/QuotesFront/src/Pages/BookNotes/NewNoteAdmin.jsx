import React, { useState } from "react";
import { SelectList } from "../../Components/Mui/SelectList";
import "../../Components/SingleBook/NewNote.css";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { postBookNote } from "../Books/SingleBook/SingleBookService";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export const NewNoteAdmin = ({
  books,
  isOpen,
  handleFormVisibility,
  updateBookNotes,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [page, setPage] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedBook(event.target.value);
  };

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
    const book = books.find((book) => book.title === selectedBook);

    if (!book) {
      console.error("Selected book not found");
      return;
    }

    e.preventDefault();
    try {
      const BookNote = {
        Title: title,
        Note: note,
        Page: page,
        Color: selectedColor,
      };

      const newNote = await postBookNote(book.id, BookNote);

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
      <div
        className="newNoteContainerDiv"
        onClick={handleInsideClick}
        style={{ height: "550px" }}
      >
        <div className="newNoteTopBar" style={{ backgroundColor: "#C8D8F3" }}>
          <p style={{ color: "black" }}>New Note</p>
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
          <div
            className="admin-bookNotes-select"
            style={{ margin: "0 0.5rem 0 0.5rem" }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedBook}
                label="Book"
                onChange={(event) => handleChange(event, note.id)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {books.map((book, index) => (
                  <MenuItem value={book.title} key={index}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a different book</FormHelperText>
            </FormControl>
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
