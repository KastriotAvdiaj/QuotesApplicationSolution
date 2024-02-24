import React, { useState, useContext, useEffect } from "react";
import BookList from "../../Components/Farmer/BookList";
import GetRandomBooks from "../../Components/Books/GetRandomBooks";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import IndividualBook from "../../Components/Books/IndividualBook";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { BiBookAdd } from "react-icons/bi";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Books.css";

export const Books = () => {
  const { books, addBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomBooks, setRandomBooks] = useState([]);

  const loadBooks = () => {
    setRandomBooks(GetRandomBooks(books));
  };

  useEffect(() => {
    loadBooks();
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
      <div className="firstRowDiv">
        {isBookCreated && <SuccessMessage message={successMessage} />}
        <FullScreenDialog
          open={open}
          handleClose={handleClose}
          onBookCreationSuccess={handleBookCreationSuccess}
        />
        <div className="sideDiv right">
          <h2>
            Shuffle through <br />
            <span>
              hundreds <br />
            </span>{" "}
            of amazing <br />
            <span className="booksText">BOOKS</span>
          </h2>
        </div>
        <BookList books={randomBooks} onReorderBooks={handleReorderBooks} />
        <div className="sideDiv left">
          <h2>
            Or you can <br />
            <span>
              share
              <br />
            </span>{" "}
            your own <br />
          </h2>
        </div>
      </div>
      <div className="booksButtons">
        <button className="createBookButton" onClick={handleClickOpen}>
          Add New
        </button>
      </div>

      <div className="subsequent-rows">
        {books.map((book, index) => (
          <li key={book.id}>
            <IndividualBook
              id={book.id}
              author={book.author}
              title={book.title}
              description={book.description}
              image={book.imageBase64}
            />
          </li>
        ))}
      </div>
    </div>
  );
};
