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
import AlertDialog from "../../Components/Mui/AlertDialog";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { CiEdit } from "react-icons/ci";
import usePagination from "@mui/material/usePagination/usePagination";
import SearchBar from "../../Components/Searchbar/Searchbar";
import { IoSearchOutline } from "react-icons/io5";
import "./Books.css";

export const Books = () => {
  const { books, addBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomBooks, setRandomBooks] = useState([]);

  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const openDeleteDialog = () => {
    setDialogMessage("Are you sure you want to delete the selected book/books");
    setAlertDialogOpen(true);
  };

  const handleAlertDialogClose = () => {
    setAlertDialogOpen(false);
  };

  const resetConfirmDelete = () => {
    setConfirmDelete(false);
  };
  const handleAlertDialogConfirm = () => {
    setConfirmDelete(true);
    setAlertDialogOpen(false);
  };

  const handleDeletionSuccess = (deletedBookIds) => {
    console.log("Deletion successful", deletedBookIds);
    setSelectedBookIds([]);
  };

  const handleDeletionError = (errorMessage) => {
    console.error(errorMessage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedBookIds, setSelectedBookIds] = useState([]);
  //
  // ADDING THE SELECTED BOOKS IN AN ARRAY
  //
  const toggleBookSelection = (id) => {
    setSelectedBookIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((bookId) => bookId !== id); // Removing the id
      } else {
        return [...prevSelected, id]; // Adding the id
      }
    });
  };

  const loadBooks = () => {
    setRandomBooks(GetRandomBooks(books));
  };
  //
  // LOADING THE RANDOM BOOKS
  //
  useEffect(() => {
    loadBooks();
  }, [books]);

  //
  // REORDERING THE RANDOM BOOKS WITH FRAMERUI
  //
  const handleReorderBooks = (newOrderIds) => {
    const newOrderBooks = newOrderIds.map((id) =>
      randomBooks.find((book) => book.id === id)
    );
    setRandomBooks(newOrderBooks);
  };

  //
  // AFTER THE BOOK IS CREATED SUCCESSFULLY
  //
  const handleBookCreationSuccess = () => {
    setIsBookCreated(true);
    setSuccessMessage("Successfully added a new book");
    handleClose();
  };

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooks, setCurrentBooks] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    setCurrentBooks(books.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, books, pageSize]);

  const onPageChange = (page) => {
    setCurrentPage(page);
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
        <AlertDialog
          isOpen={isAlertDialogOpen}
          onClose={handleAlertDialogClose}
          onConfirm={handleAlertDialogConfirm}
          dialogMessage={dialogMessage}
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
        <div className="actionButtonsBooks">
          <button className="booksButton create" onClick={handleClickOpen}>
            Add New <BiBookAdd />
          </button>
          <button className="booksButton edit">
            Edit <CiEdit />
          </button>
          {selectedBookIds.length > 0 && isAuthenticated ? (
            <BookDeletionButton
              onClick={openDeleteDialog}
              confirmDelete={confirmDelete}
              selectedBookIds={selectedBookIds}
              onDeleteSuccess={handleDeletionSuccess}
              onDeleteError={handleDeletionError}
              onDeletionComplete={resetConfirmDelete}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="searchBarHolder">
            <IoSearchOutline />
            {/* <SearchBar
              placeholder="Search books..."
              onSearch={handleBookSearch}
            /> */}
          </div>
        </div>
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
        itemsCount={books.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
