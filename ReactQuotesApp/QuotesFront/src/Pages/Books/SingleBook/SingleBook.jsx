import "./SingleBook.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BooksContext } from "../../../Components/Books/BooksProvider";
import Divider from "@mui/material/Divider";
import { RiEdit2Fill } from "react-icons/ri";
import { BookEditForm } from "../../../Components/Books/Edit/BookEditForm";
import SuccessMessage from "../../../Components/SuccessfullMessage/SuccessMessage";
import { MdOutlineNoteAdd } from "react-icons/md";

export const SingleBook = () => {
  const { books } = useContext(BooksContext);
  const { bookId } = useParams();
  const [book, setBook] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const closeEditForm = () => {
    setEditFormOpen(false);
  };

  const handleSuccessfulUpdate = () => {
    setMessage("Successfully udpated the Book!");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!/^\d+$/.test(bookId)) {
    // If bookId is not numeric, redirect to a custom error page or home
    return <Navigate to="/error" replace />;
  }

  useEffect(() => {
    if (books.length) {
      const foundBook = books.find((b) => b.id === Number(bookId));
      setBook(foundBook);
      setLoading(false);
    }
  }, [bookId, books]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="singleBookMainDiv">
      <div className="bookDisplayDiv">
        <div className="bookDetails">
          <div>
            <p className="singleBookTitle">"{book.title}"</p>
            <p className="singleBookAuthor">by {book.author}</p>
            <Divider
              variant="middle"
              component="p"
              sx={{ backgroundColor: "gray" }}
            />
            <p className="summarizationText">Summarization</p>
            <p className="singleBookDescription">{book.description}</p>
          </div>
          <button
            className="singleBookEditButton"
            onClick={() => {
              setEditFormOpen(true);
            }}
          >
            {" "}
            <RiEdit2Fill />
            Edit
          </button>
        </div>
        <img
          src={`data:image/png;base64,${book.imageBase64}`}
          alt={book.title}
        />
        <div className="otherBookInformationDiv">
          <p className="topExtraInfParagraph">More book related information</p>
          <p>There isn't anything on this book yet.</p>
          <Divider
            variant="fullWidth"
            component="p"
            sx={{ backgroundColor: "gray" }}
          />
          <button className="newNoteButton">
            <MdOutlineNoteAdd />
            Add a note
          </button>
        </div>
        <BookEditForm
          bookToEdit={book}
          isOpen={isEditFormOpen}
          handleVisibility={closeEditForm}
          handleSuccessUpdate={handleSuccessfulUpdate}
        />
        <SuccessMessage message={message} />
      </div>
      <button className="deleteSinlgeBookButton">Delete</button>
    </div>
  );
};
