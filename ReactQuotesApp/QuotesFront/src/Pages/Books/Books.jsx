import React, { useState, useContext, useEffect } from "react";
import BookList from "../../Components/Farmer/BookList";
import GetRandomBooks from "../../Components/Books/GetRandomBooks";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import IndividualBook from "../../Components/Books/IndividualBook";
import Pagination from "../../Components/Pagination/Pagination";
import BookDeletionButton from "../../Components/Books/Delete/BookDeletionButton";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { BiBookAdd } from "react-icons/bi";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { CiEdit } from "react-icons/ci";
import "./Books.css";

export const Books = () => {
  const { books, addBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomBooks, setRandomBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const lastBookIndex = currentPage * booksPerPage;
  const firstBookIndex = lastBookIndex - booksPerPage;
  const currentBooks = books.slice(firstBookIndex, lastBookIndex);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const loadBooks = () => {
    setRandomBooks(GetRandomBooks(books));
  };

  const [selectedBookIds, setSelectedBookIds] = useState([]);

  const toggleBookSelection = (id) => {
    setSelectedBookIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((bookId) => bookId !== id); // Removing the id
      } else {
        return [...prevSelected, id]; // Adding the id
      }
    });
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

  const handleDeletionSuccess = (deletedBookIds) => {
    
    console.log("Deletion successful", deletedBookIds);
  };

  const handleDeletionError = (errorMessage) => {
    console.error(errorMessage);
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
      <div className="booksButtonsDiv">
        <button className="booksButton create" onClick={handleClickOpen}>
          Add New <BiBookAdd />
        </button>

        <BookDeletionButton
          selectedBookIds={selectedBookIds}
          onDeleteSuccess={handleDeletionSuccess}
          onDeleteError={handleDeletionError}
        />
        <button className="booksButton edit">
          Edit <CiEdit />
        </button>
      </div>

      <div className="subsequent-rows">
        {currentBooks.map((book) => (
          <li key={book.id}>
            <IndividualBook
              id={book.id}
              author={book.author}
              title={book.title}
              description={book.description}
              image={book.imageBase64}
              isSelected={selectedBookIds.includes(book.id)}
              toggleSelect={() => toggleBookSelection(book.id)}
            />
          </li>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
