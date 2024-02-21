import React, { useState, useContext, useEffect } from "react";
import BookList from "../../Components/Farmer/BookList";
import GetRandomBooks from "../../Components/Books/GetRandomBooks";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import IndividualBook from "../../Components/Books/IndividualBook";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { BiBookAdd } from "react-icons/bi";
import "./Books.css";

export const Books = () => {
  const { books, addBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);

  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    setRandomBooks(GetRandomBooks(books));
  }, [books]);

  const handleReorderBooks = (newOrderIds) => {
    const newOrderBooks = newOrderIds.map((id) =>
      randomBooks.find((book) => book.id === id)
    );
    setRandomBooks(newOrderBooks);
  };

  const handleBookCreationSuccess = () => {
    setIsBookCreated(true);
    setSuccessMessage("Successfully added a new book");
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="booksMainDiv">
      {isBookCreated && <SuccessMessage message={successMessage} />}
      <button className="createBookButton" onClick={handleClickOpen}>
        <BiBookAdd /> Add New
      </button>
      <FullScreenDialog
        open={open}
        handleClose={handleClose}
        onBookCreationSuccess={handleBookCreationSuccess}
      />
      <BookList books={randomBooks} onReorderBooks={handleReorderBooks} />
      {books.map((book, index) => (
        <li key={book.id}>
          <IndividualBook
            id={book.id}
            author={book.author}
            title={book.title}
            description={book.description}
            image={book.imageBytes}
          />
        </li>
      ))}
    </div>
  );
};
