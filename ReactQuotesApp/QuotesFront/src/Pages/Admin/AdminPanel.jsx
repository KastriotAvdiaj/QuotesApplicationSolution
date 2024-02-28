import React, { useContext, useState } from "react";
import { BooksContext } from "../../Components/Books/BooksProvider";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import { DataTable } from "../../Components/Mui/Table";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { FaBook } from "react-icons/fa";
import FullScreenDialog from "../../Components/Mui/FullScreenDialog";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import { RiDeleteBin6Fill, RiEditFill, RiAdminFill } from "react-icons/ri";
import AlertDialog from "../../Components/Mui/AlertDialog";
import { IoAddCircle } from "react-icons/io5";
import "./AdminPanel.css";
import { NavLink } from "react-router-dom";
import BookDeletionButton from "../../Components/Books/Delete/BookDeletionButton";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";

export const AdminPanel = () => {
  const { books } = useContext(BooksContext);
  const { quotes } = useContext(QuotesContext);
  const { isAuthenticated } = useAuth();

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (selectedRowsData) => {
    setSelectedRows(selectedRowsData);
    console.log(selectedRowsData);
  };

  //
  //BOOK DELETION PROCESS
  //

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeletionSuccess = (deletedBookIds) => {
    console.log("Deletion successful", deletedBookIds);
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
    setConfirmDelete(true);
    setAlertDialogOpen(false);
  };

  const openDeleteDialog = () => {
    if (selectedRows.length === 0) {
      return;
    }
    setDialogMessage(
      `Are you sure you want to delete the selected book/books? With the Id/Ids: ${selectedRows.join(
        ", "
      )}`
    );
    setAlertDialogOpen(true);
  };

  //
  //BOOK DELETION PROCESS
  //

  //
  //BOOK CREATION PROCESS
  //

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookCreationSuccess = () => {
    setOpen(false);
    setMessage("A New Book Was Successfully Created!");
  };

  //
  //BOOK CREATION PROCESS
  //

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
                  onClick={() => setOpen(true)}
                >
                  Create
                  <IoAddCircle />
                </button>
                <BookDeletionButton
                  onClick={openDeleteDialog}
                  confirmDelete={confirmDelete}
                  selectedBookIds={selectedRows}
                  onDeleteSuccess={handleDeletionSuccess}
                  onDeleteError={handleDeletionError}
                  onDeletionComplete={resetConfirmDelete}
                />
                <button className="editButtonAdminPage">
                  Edit
                  <RiEditFill />
                </button>
              </div>
            </div>
          </div>
          <FullScreenDialog
            open={open}
            handleClose={handleClose}
            onBookCreationSuccess={handleBookCreationSuccess}
          />
          <SuccessMessage message={message} />
          <AlertDialog
            isOpen={isAlertDialogOpen}
            onClose={handleDialogClose}
            onConfirm={handleAlertDialogConfirm}
            dialogMessage={dialogMessage}
          />
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
