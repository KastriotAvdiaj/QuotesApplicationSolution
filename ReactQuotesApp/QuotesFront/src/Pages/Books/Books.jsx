import React, { useState, useContext, useEffect } from "react";
import BookList from "../../Components/Farmer/BookList";
import GetRandomBooks from "../../Components/Books/GetRandomBooks";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import IndividualBook from "../../Components/Books/IndividualBook";
import Pagination from "../../Components/Pagination/Pagination";
import BookDeletionButton from "../../Components/Books/Delete/BookDeletionButton";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { BookEditForm } from "../../Components/Books/Edit/BookEditForm";
import { BiBookAdd } from "react-icons/bi";
import AlertDialog from "../../Components/Mui/AlertDialog";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { CiEdit } from "react-icons/ci";
import SearchBar from "../../Components/Searchbar/Searchbar";
import { MdFormatClear } from "react-icons/md";
import "./Books.css";

export const Books = () => {
  const { books, updateTheBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [isBookCreated, setIsBookCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomBooks, setRandomBooks] = useState([]);

  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const openDeleteDialog = () => {
    setDialogMessage(
      "Are you sure you want to delete the selected book/books?"
    );
    setAlertDialogOpen(true);
  };

  const handleAlertDialogClose = () => {
    setAlertDialogOpen(false);
  };

  const resetConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleAlertDialogConfirm = () => {
    setSuccessMessage("Successfully deleted selected book/books.");
    setTimeout(() => setSuccessMessage(""), 3000);
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
    setTimeout(() => setSuccessMessage(""), 3000);
    handleClose();
  };

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [filteredBooksCount, setFilteredBooksCount] = useState(books.length);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    if (!isSearchMode) {
      // Only run this logic if not in search mode
      const indexOfLastItem = currentPage * pageSize;
      const indexOfFirstItem = indexOfLastItem - pageSize;
      setCurrentBooks(books.slice(indexOfFirstItem, indexOfLastItem));
      setFilteredBooksCount(books.length);
    }
  }, [currentPage, books, pageSize, isSearchMode]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    if (isSearchMode) {
      setIsSearchMode(false); // Reset search mode when manually changing pages
    }
  };

  const handleBookSearch = (search) => {
    if (search.trim() !== "") {
      setIsSearchMode(true);
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooksCount(filteredBooks.length);
      setCurrentPage(1);
      setCurrentBooks(filteredBooks.slice(0, 0 + pageSize));
    } else {
      setIsSearchMode(false);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const handleClearSearchBar = () => {
    setSearchValue("");
    setIsSearchMode(false);
  };

  const [isEditFormOpen, setEditForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});

  const handleEditButtonClick = () => {
    if (selectedBookIds.length === 1) {
      setBookToEdit(books.find((book) => book.id === selectedBookIds[0]));
      setEditForm(!isEditFormOpen);
      return;
    }
  };
  const handleSuccessfulUpdate = () => {
    setSuccessMessage("Book was successfully udpated.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="booksMainDiv">
      <BookEditForm
        bookToEdit={bookToEdit}
        isOpen={isEditFormOpen}
        handleVisibility={handleEditButtonClick}
        handleSuccessUpdate={handleSuccessfulUpdate}
      />
      <div className="firstRowDiv">
        {/* {isBookCreated && <SuccessMessage message={successMessage} />} */}
        <SuccessMessage message={successMessage} />
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
          <button className="booksButton edit" onClick={handleEditButtonClick}>
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
            <SearchBar
              placeholder="Search books..."
              onSearch={handleBookSearch}
              inputValue={searchValue}
              onInputChange={setSearchValue}
            />
            <button className="clearButton" onClick={handleClearSearchBar}>
              Clear <MdFormatClear />
            </button>
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
        itemsCount={filteredBooksCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
