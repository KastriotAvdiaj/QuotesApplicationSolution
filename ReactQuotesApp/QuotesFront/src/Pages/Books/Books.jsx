import React, { useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { CreateBook } from "../../Components/Books/CreateBook";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import { BiBookAdd } from "react-icons/bi";
import "./Books.css";

export const Books = () => {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState(["Book 1", "Book 2", "Book 3"]); // Example list of books
  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleBookCreationSuccess = () => {
    setSuccessMessage("Successfully added a new book");
    setIsBookCreated(true);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onReorderBooks = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  return (
    <div className="booksMainDiv">
      {successMessage && <SuccessMessage message={successMessage} />}
      <button className="createBookButton" onClick={handleClickOpen}>
        <BiBookAdd /> Add New
      </button>
      <FullScreenDialog
        open={open}
        handleClose={handleClose}
        onBookCreationSuccess={handleBookCreationSuccess}
      />

      <Reorder.Group
        axis="y"
        values={books}
        onReorder={onReorderBooks}
        className="booksList"
      >
        <AnimatePresence>
          {books.map((book) => (
            <Reorder.Item
              key={book}
              value={book}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileDrag={{ scale: 1.1 }}
            >
              {book}
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};
