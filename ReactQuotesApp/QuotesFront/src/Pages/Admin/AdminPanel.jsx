import React, { useContext, useState } from "react";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import { DataTable } from "../../Components/Mui/Table";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import QuoteEdit from "../../Components/Quotes/QuoteEdit";
import { FaBook } from "react-icons/fa";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import { MdOutlineDeleteForever } from "react-icons/md";
import QuoteForm from "../../Components/Quotes/QuoteForm";
import {
  deleteQuotes,
  createQuote,
} from "../../Components/Quotes/QuoteService";
import { BookEditForm } from "../../Components/Books/Edit/BookEditForm";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import { RiEditFill, RiAdminFill } from "react-icons/ri";
import AlertDialog from "../../Components/Mui/AlertDialog";
import { IoAddCircle } from "react-icons/io5";
import "./AdminPanel.css";
import { NavLink } from "react-router-dom";
import BookDeletionButton from "../../Components/Books/Delete/BookDeletionButton";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";

export const AdminPanel = () => {
  const { books } = useContext(BooksContext);
  const { quotes, addQuote, setQuotes } = useContext(QuotesContext);
  const { isAuthenticated } = useAuth();

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (selectedRowsData) => {
    setSelectedRows(selectedRowsData);
  };

  //!
  //!BOOK DELETION PROCESS
  //!

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeletionSuccess = (deletedBookIds) => {
    console.log("Deletion successful", deletedBookIds);
    setMessage("Successfully deleted selected book/books!");
    setSelectedRows([]);
  };
  const handleDeletionError = (errorMessage) => {
    console.error(errorMessage);
  };

  const resetConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDialogClose = () => {
    setAlertDialogOpen(false);
  };

  const handleAlertDialogConfirm = () => {
    if (tableContent === "books") {
      setConfirmDelete(true);
      setAlertDialogOpen(false);
      return;
    }

    // £ QUOTE DELETE

    deleteQuotes(selectedRows); // actually deleting the quote
    const updatedQuotes = quotes.filter(
      //filtering the quotes while removing the ones just deleted
      (quote) => !selectedRows.includes(quote.id)
    );
    setQuotes(updatedQuotes); // setting the quotes in the quotes provider
    setSelectedRows([]); // re setting the selected quotes back to empty
    setMessage("Successfully deleted selected quote/quotes.");
    setAlertDialogOpen(false);

    // £ QUOTE DELETE
  };

  const openDeleteDialog = () => {
    if (selectedRows.length === 0) {
      return;
    }
    if (tableContent === "quotes") {
      setDialogMessage(
        `Are you sure you want to delete the selected quote/quotes? With the Id/Ids: ${selectedRows.join(
          ", "
        )}`
      );
      setAlertDialogOpen(true);
      return;
    }
    setDialogMessage(
      `Are you sure you want to delete the selected book/books? With the Id/Ids: ${selectedRows.join(
        ", "
      )}`
    );
    setAlertDialogOpen(true);
  };

  //!
  // !BOOK DELETION PROCESS
  //!

  //!
  // !BOOK UPDATE PROCESS
  //!

  const [isEditFormOpen, setIsEditForOpen] = useState(false);

  const handleSuccessfulUpdate = () => {
    console.log("Coming from admin panel");
    setMessage("Successfully udpated the Book!");
    setTimeout(() => setMessage(""), 3000);
  };

  const closeEditForm = () => {
    setIsEditForOpen(false);
  };
  //!
  // !BOOK UPDATE PROCESS
  //!

  //!
  //!BOOK CREATION PROCESS
  //!

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookCreationSuccess = () => {
    setOpen(false);
    setMessage("A New Book Was Successfully Created!");
  };

  // ! BOOK CREATION PROCESS

  // £ QUOTE CREATE

  const [showCreateQuote, setCreateQuote] = useState(false);

  const handleCreateButtonClick = () => {
    if (tableContent === "books") {
      setOpen(true);
      return;
    }
    setCreateQuote(true);
  };

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseForm = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setCreateQuote(false);
    }, 350);
  };

  const handleAddQuote = async (newQuote) => {
    try {
      const addedQuote = await createQuote(newQuote);
      setCreateQuote(false);
      addQuote(addedQuote);
      setMessage("You have successfully added a new quote!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  // £ QUOTE CREATE

  // £ QUOTE EDIT

  const handleEditButtonClick = () => {
    if (tableContent === "books") {
      if (selectedRows.length < 1) {
        console.log("select a book to edit!");
        return;
      }
      if (selectedRows.length > 1) {
        console.log("You can only edit 1 book at a time!");
        return;
      }
      setQuoteToEdit(books.find((book) => book.id === selectedRows[0]));
      setIsEditForOpen(true);
      return;
    }
    if (selectedRows.length < 1) {
      console.log("select a quote to edit!");
      return;
    }
    if (selectedRows.length > 1) {
      console.log("You can only edit 1 quote at a time!");
      return;
    }
    setQuoteToEdit(quotes.find((quote) => quote.id === selectedRows[0]));
    setQuoteEditForm(true);
  };

  const [quoteToEdit, setQuoteToEdit] = useState(null);

  const handleCancelEdit = () => {
    setQuoteEditForm(false);
  };

  const [showQuoteEditForm, setQuoteEditForm] = useState(false);

  // £ QUOTE EDIT

  const [tableContent, setTableContent] = useState("books");

  const handleQuotesButtonClick = () => {
    setTableContent("quotes");
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="mainAdminContainer">
          <div className="adminMainHeader">
            <h2>
              Admin Panel
              <RiAdminFill style={{ color: "#F1D548" }} />
            </h2>
            <div className="adminPanelButtonsDiv">
              <div className="itemButtonsDiv">
                <button
                  onClick={() => {
                    setTableContent("books");
                  }}
                  className={tableContent === "books" ? "active" : ""}
                >
                  Books <FaBook />
                </button>
                <button
                  onClick={handleQuotesButtonClick}
                  className={tableContent === "quotes" ? "active" : ""}
                >
                  Quotes <BsFillChatLeftQuoteFill />
                </button>
              </div>
              <div className="actionButtonsDiv">
                <button
                  className="createButtonAdminPage"
                  onClick={handleCreateButtonClick}
                  // onClick={() => setOpen(true)}
                >
                  Create
                  <IoAddCircle />
                </button>
                {tableContent === "books" && (
                  <BookDeletionButton
                    onClick={openDeleteDialog}
                    confirmDelete={confirmDelete}
                    selectedBookIds={selectedRows}
                    onDeleteSuccess={handleDeletionSuccess}
                    onDeleteError={handleDeletionError}
                    onDeletionComplete={resetConfirmDelete}
                  />
                )}
                {tableContent === "quotes" && (
                  <button
                    className="deleteButtonAdminPage"
                    onClick={openDeleteDialog}
                  >
                    Delete <MdOutlineDeleteForever />
                  </button>
                )}
                <button
                  className="editButtonAdminPage"
                  onClick={handleEditButtonClick}
                >
                  Edit
                  <RiEditFill />
                </button>
              </div>
            </div>
          </div>
          {/* 



          QUOTES COMPONENTS 


          */}
          {showQuoteEditForm && tableContent === "quotes" && (
            <QuoteEdit
              onCancel={handleCancelEdit}
              author={quoteToEdit.authorName}
              quote={quoteToEdit.description}
              id={quoteToEdit.id}
              setEditSuccessMessage={(message) => {
                setMessage(message);
              }}
            />
          )}
          {showCreateQuote && (
            <QuoteForm
              onClose={handleCloseForm}
              isClosing={isClosing}
              onAdd={handleAddQuote}
            />
          )}

          {/* 



          QUOTES COMPONENTS 


          */}

          {/* 



          BOOKS COMPONENTS 


          */}
          <FullScreenDialog
            open={open}
            handleClose={handleClose}
            onBookCreationSuccess={handleBookCreationSuccess}
          />
          <AlertDialog
            isOpen={isAlertDialogOpen}
            onClose={handleDialogClose}
            onConfirm={handleAlertDialogConfirm}
            dialogMessage={dialogMessage}
          />
          {isEditFormOpen && (
            <BookEditForm
              bookToEdit={quoteToEdit}
              isOpen={isEditFormOpen}
              handleVisibility={closeEditForm}
              handleSuccessUpdate={handleSuccessfulUpdate}
            />
          )}

          {/* 



          BOOKS COMPONENTS 


          */}
          <SuccessMessage message={message} />
          <DataTable
            items={tableContent === "books" ? books : quotes}
            whatItem={tableContent}
            onSelectionChange={handleSelectedRows}
          />
        </div>
      ) : (
        <div className="accessDenied">
          <p>
            Access Denied! <br /> You don't have access to this page.
          </p>
          <NavLink to="/login">
            {" "}
            <button className="loginButtonAdmin">Login</button>
          </NavLink>
        </div>
      )}
    </>
  );
};
