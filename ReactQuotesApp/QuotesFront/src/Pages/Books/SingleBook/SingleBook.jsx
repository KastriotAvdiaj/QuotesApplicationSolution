import "./SingleBook.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BooksContext } from "../../../Components/Books/BooksProvider";
import Divider from "@mui/material/Divider";
import { RiEdit2Fill } from "react-icons/ri";
import { BookEditForm } from "../../../Components/Books/Edit/BookEditForm";
import SuccessMessage from "../../../Components/SuccessfullMessage/SuccessMessage";
import { MdOutlineNoteAdd } from "react-icons/md";
import { NewNote } from "../../../Components/SingleBook/NewNote";
import { getBookNotesById } from "./SingleBookService";
import { SiCodereview } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { BookNote } from "../../../Components/SingleBook/BookNote";
import AlertDialog from "../../../Components/Mui/AlertDialog";
import { EditNote } from "../../../Components/SingleBook/EditNote";
import { infinity } from "ldrs";

export const SingleBook = () => {
  const { books } = useContext(BooksContext);
  const { bookId } = useParams();
  const [book, setBook] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isNewNoteOpen, setNewNoteVisibility] = useState(false);
  const [bookNotes, setBookNotes] = useState([]);
  const [isBookNoteDialogOpen, setBookNoteDialogOpen] = useState(false);

  const [bookNoteToEdit, setBookNoteToEdit] = useState(null);
  const [editBookNote, setEditBookNote] = useState(false);

  const [bookNotesToShow, setBookNotesToShow] = useState(5);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const remainingNotes = bookNotes.length - displayedNotes.length;

  infinity.register();

  const openEditingBookNote = (note) => {
    setBookNoteToEdit(note);
    setEditBookNote(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedNotes(bookNotes.slice(0, bookNotesToShow));
  }, [bookNotes, bookNotesToShow]);

  useEffect(() => {
    const fetchBookNotes = async () => {
      try {
        const notes = await getBookNotesById(bookId);
        setBookNotes(notes);
      } catch (error) {
        console.error("Error fetching book notes:", error);
      }
    };

    fetchBookNotes();
  }, [bookId]);

  useEffect(() => {
    if (books.length) {
      const foundBook = books.find((b) => b.id === Number(bookId));
      setBook(foundBook);
      setLoading(false);
    }
  }, [bookId, books]);

  const handleFormVisibility = () => {
    setNewNoteVisibility(!isNewNoteOpen);
  };

  const handleEditFormVisibility = () => {
    setEditBookNote(!editBookNote);
  };

  const closeEditForm = () => {
    setEditFormOpen(false);
  };

  const updateBookNotes = (newNote) => {
    setBookNotes((prevNotes) => [...prevNotes, newNote]);
    setMessage("Successfully added a new note");
    setTimeout(() => setMessage(""), 3000);
  };

  const updateBookNote = (updatedNote) => {
    setBookNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id === updatedNote.id) {
          return { ...updatedNote };
        }
        return note;
      });
      return updatedNotes;
    });
    setMessage("Successfully updated the note");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleViewAllButtonClick = () => {
    const cleanedBookTitle = book.title.replace(/\s/g, "");
    console.log(cleanedBookTitle);
    navigate(`/${cleanedBookTitle}/Notes`);
  };

  const handleSuccessfulUpdate = () => {
    setMessage("Successfully udpated the Book!");
    setTimeout(() => setMessage(""), 3000);
  };

  const successDeletion = (deletedNoteId) => {
    const updatedBookNotes = bookNotes.filter(
      (note) => note.id !== deletedNoteId
    );
    setMessage("Successfully Deleted BookNote");
    setBookNotes(updatedBookNotes);
    setDeleteBookNote(false);
  };

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const openAlertDialog = (noteId) => {
    setDialogMessage(
      "Are you sure you want to delete this book note with the ID : " + noteId
    );
    setDialogTitle("Delete selected Book Note");
    setBookNoteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setBookNoteDialogOpen(false);
  };

  const [deleteBooknote, setDeleteBookNote] = useState(false);

  const handleConfirmDelete = () => {
    setDeleteBookNote(true);
  };
  if (!/^\d+$/.test(bookId)) {
    // If bookId is not numeric, redirect to a custom error page or home
    return <Navigate to="/error" replace />;
  }

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: `calc(100vw - 15rem)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <l-infinity
          size="250"
          stroke="15"
          stroke-length="0.2"
          bg-opacity="0.1"
          speed="1.8"
          color="white"
        ></l-infinity>
      </div>
    );
  }

  if (!book) {
    return <Navigate to="/error" replace />;
  }

  return (
    <>
      {editBookNote && (
        <EditNote
          isOpen={editBookNote}
          bookNote={bookNoteToEdit}
          handleFormVisibility={handleEditFormVisibility}
          bookTitle={book.title}
          updateBookNote={updateBookNote}
        />
      )}

      <AlertDialog
        isOpen={isBookNoteDialogOpen}
        dialogMessage={dialogMessage}
        dialogTitle={dialogTitle}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
      <NewNote
        isOpen={isNewNoteOpen}
        handleFormVisibility={handleFormVisibility}
        bookTitle={book.title}
        bookId={book.id}
        updateBookNotes={updateBookNotes}
      />
      {loading && (
        <div
          style={{
            height: "100vh",
            width: `calc(100vw - 15rem)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <l-infinity
            size="250"
            stroke="15"
            stroke-length="0.2"
            bg-opacity="0.1"
            speed="1.8"
            color="white"
          ></l-infinity>
        </div>
      )}
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
            className="singleBookImage"
            src={`data:image/png;base64,${book.imageBase64}`}
            alt={book.title}
          />
          <BookEditForm
            bookToEdit={book}
            isOpen={isEditFormOpen}
            handleVisibility={closeEditForm}
            handleSuccessUpdate={handleSuccessfulUpdate}
          />
          <SuccessMessage message={message} />
        </div>
        <div className="otherBookInformationDiv">
          <p className="topExtraInfParagraph">Book Notes</p>
          {bookNotes && bookNotes.length > 0 ? (
            <>
              {displayedNotes.map((note) => (
                <BookNote
                  key={note.id}
                  note={note}
                  confirmDelete={deleteBooknote}
                  successDeletion={successDeletion}
                  openAlertDialog={openAlertDialog}
                  openEditingBookNote={openEditingBookNote}
                />
              ))}
              {remainingNotes > 0 && (
                <div className="remainingNotes">
                  <p>There are {remainingNotes} more notes for this book.</p>
                  <button
                    className="viewAllButton"
                    onClick={handleViewAllButtonClick}
                  >
                    View all <SiCodereview />
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>There isn't anything on this book yet.</p>
          )}
          <Divider
            variant="fullWidth"
            component="p"
            sx={{ backgroundColor: "gray" }}
          />
          <button
            className="newNoteButton"
            onClick={() => {
              handleFormVisibility();
            }}
          >
            <MdOutlineNoteAdd />
            Add a note
          </button>
        </div>
        <button className="deleteSinlgeBookButton">Delete</button>
      </div>
    </>
  );
};
