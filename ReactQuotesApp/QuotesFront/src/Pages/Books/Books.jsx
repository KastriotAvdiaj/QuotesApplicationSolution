import React, { useState } from "react";
import { CreateBook } from "../../Components/Books/CreateBook";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import "./Books.css";

export const Books = () => {
  const [isBookFormVisible, setBookFormVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="booksMainDiv">
      Books
      <button onClick={handleClickOpen}>Create a new Book</button>
      <FullScreenDialog open={open} handleClose={handleClose} />
    </div>
  );
};
