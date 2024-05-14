import React, { useState, useEffect, useContext } from "react";
import "./AdminBookNotes.css";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdOutlineNoteAdd } from "react-icons/md";
import { EditNote } from "../../../Components/SingleBook/EditNote";
import SuccessMessage from "../../../Components/SuccessfullMessage/SuccessMessage";
import { deleteBookNoteById } from "../../Books/SingleBook/SingleBookService";
import { Divider } from "@mui/material";
import AlertDialog from "../../../Components/Mui/AlertDialog";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ResponsiveDialog from "../../../Components/Mui/ResponsiveDialog";
import {
  changeNotesBook,
  getBooksWithBookNotes,
} from "./AdminBookNotesService";
import { NewNoteAdmin } from "../NewNoteAdmin";
import BasicSpeedDial from "../../../Components/Mui/BasicSpeedDial";
import { BooksContext } from "../../../Components/Books/BooksProvider";

export const AdminBookNotes = () => {
  const [booksWithNotes, setBooksWithNotes] = useState([]);
  const { books } = useContext(BooksContext);
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedBook, setSelectedBook] = useState("");
  const [isAlertDialoOpen, setAlertDialogOpen] = useState(false);
  const [BookNoteId, setBookNoteId] = useState(null);
  const [message, setMessage] = useState("");
  const [editBookNote, setEditBookNote] = useState(false);
  const [bookNoteToEdit, setBookNoteToEdit] = useState(null);

  const [deleteBooknote, setDeleteBookNote] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isBookNoteDialogOpen, setBookNoteDialogOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const [isNewNoteOpen, setNewNoteVisibility] = useState(false);

  const updateBookNotes = (newNote) => {
    console.log(newNote);
    console.log(newNote.bookId);
    console.log(booksWithNotes);

    setBooksWithNotes((prevBooksWithNotes) => {
      const bookExists = prevBooksWithNotes.some(
        (book) => book.bookId === newNote.bookId
      );

      //this is checking if the book already has any notes
      if (bookExists) {
        return prevBooksWithNotes.map((book) =>
          book.bookId === newNote.bookId
            ? { ...book, bookNotes: [...book.bookNotes, newNote] }
            : book
        );
        //if it doesn't we create a new object here
      } else {
        return [
          ...prevBooksWithNotes,
          { bookId: newNote.bookId, bookNotes: [newNote] },
        ];
      }
    });

    setMessage("Successfully added new note");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleNewFormVisibility = () => {
    setNewNoteVisibility(!isNewNoteOpen);
  };

  const handleCloseDialog = () => {
    setBookNoteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteBookNote(true);
  };

  const handleEditFormVisibility = () => {
    console.log("Clicked");
    setEditBookNote(!editBookNote);
  };

  const handleActionClick = (actionName, note) => {
    if (actionName === "Delete") {
      setBookNoteId(note.id);
      setDialogMessage(
        "Are you sure you want to delete this book note with the ID : " +
          note.id
      );
      setDialogTitle("Delete selected Book Note");
      setBookNoteDialogOpen(true);
    } else if (actionName === "Edit") {
      setBookNoteToEdit(note);
      setEditBookNote(true);
    }
  };

  const handlBookNoteDelete = async (noteId) => {
    try {
      const response = await deleteBookNoteById(noteId);
      if (response) {
        const updatedBooksWithNotes = await getBooksWithBookNotes();
        setBooksWithNotes(updatedBooksWithNotes);
        setMessage("Successfully Deleted BookNote");
        setDeleteBookNote(false);
        setBookNoteId(null);
        setExpandedAccordion(false);
        return;
      }
      console.error("There was an error deleting note", response);
    } catch (e) {
      console.error("Failed to delete book note:", e);
    }
  };

  // const updateBookNote = (updatedNote) => {
  //   setBooksWithNotes((prevBooksWithNotes) =>
  //     prevBooksWithNotes.map((book) => ({
  //       ...book,
  //       bookNotes: book.bookNotes.map((note) =>
  //         note.id === updatedNote.id ? updatedNote : note
  //       ),
  //     }))
  //   );
  //   setMessage("Successfully updated the note");
  //   setTimeout(() => setMessage(""), 3000);
  // };

  const updateBookNote = (updatedNote) => {
    setBooksWithNotes((prevBooksWithNotes) => {
      const bookIndex = prevBooksWithNotes.findIndex((book) =>
        book.bookNotes.some((note) => note.id === updatedNote.id)
      );

      if (bookIndex === -1) return prevBooksWithNotes;

      const updatedBooks = [...prevBooksWithNotes];
      const bookToUpdate = { ...updatedBooks[bookIndex] };
      bookToUpdate.bookNotes = bookToUpdate.bookNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      updatedBooks[bookIndex] = bookToUpdate;

      return updatedBooks;
    });

    setMessage("Successfully updated the note");
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    if (deleteBooknote && BookNoteId) {
      handlBookNoteDelete(BookNoteId);
      setMessage("Successfully Deleted Book Note!");
      setTimeout(() => setMessage(""), 3000);
    }
  }, [deleteBooknote, BookNoteId]);

  const handleChange = async (event, bookNoteId) => {
    try {
      const newBookTitle = event.target.value;
      setSelectedBook(newBookTitle);
      setBookNoteId(bookNoteId);
      setAlertDialogOpen(true);
    } catch (error) {
      console.error("Error handling book change:", error);
    }
  };

  const handleDialogClose = () => {
    setAlertDialogOpen(false);
    setBookNoteId();
  };

  const handleAgreeDialog = async () => {
    try {
      await changeNotesBook(selectedBook, BookNoteId);
      const updatedData = await getBooksWithBookNotes();
      setBooksWithNotes(updatedData);
      setAlertDialogOpen(false);
      setBookNoteId(null);
    } catch (error) {
      console.error("Failed to change book for note:", error);
    }
  };

  useEffect(() => {
    const fetchBooksWithNotes = async () => {
      try {
        const data = await getBooksWithBookNotes();
        setBooksWithNotes(data);
      } catch (error) {
        console.error("Error fetching books with notes:", error);
      }
    };

    fetchBooksWithNotes();
  }, []);

  const getBackgroundColor = (color) => {
    switch (color) {
      case "Blue":
        return "#C8D8F3";
      case "Yellow":
        return "#F2F6B8";
      case "Purple":
        return "#FAC5F8";
      case "Green":
        return "#CEFAC5";
      case "Red":
        return "#FAC5C5";
      default:
        return "#C8D8F3";
    }
  };
  return (
    <>
      {isAuthenticated && isAdmin ? (
        <div className="mainAdminBookNotesDiv">
          <div className="admin-bookNotes-Title">
            You Can Find All The Book Notes Here!
          </div>
          <div className="new-note-div-wrapper">
            <button
              className="add-new-note-admin"
              onClick={handleNewFormVisibility}
            >
              <MdOutlineNoteAdd /> Add New Note
            </button>
          </div>
          <ResponsiveDialog
            isOpen={isAlertDialoOpen}
            handleClose={handleDialogClose}
            bookTitle={selectedBook}
            onAgree={handleAgreeDialog}
          />
          <AlertDialog
            isOpen={isBookNoteDialogOpen}
            dialogMessage={dialogMessage}
            dialogTitle={dialogTitle}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
          <NewNoteAdmin
            books={books}
            isOpen={isNewNoteOpen}
            updateBookNotes={updateBookNotes}
            handleFormVisibility={handleNewFormVisibility}
          />
          {editBookNote && (
            <EditNote
              isOpen={editBookNote}
              bookNote={bookNoteToEdit}
              handleFormVisibility={handleEditFormVisibility}
              bookTitle={selectedBook}
              updateBookNote={updateBookNote}
            />
          )}
          <SuccessMessage message={message} />
          {booksWithNotes.map((book) => (
            <div key={book.bookId}>
              <h2>{book.title}</h2>
              {book.bookNotes.map((note, index) => (
                <Accordion
                  key={note.id}
                  expanded={expandedAccordion === note.id}
                  onChange={() =>
                    setExpandedAccordion(
                      expandedAccordion === note.id ? null : note.id
                    )
                  }
                  sx={{
                    margin: "0.5rem",
                    backgroundColor: getBackgroundColor(note.color),
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{ fontWeight: "bolder", fontSize: "1.3rem" }}
                  >
                    <div className="title-divider">
                      {note.title}
                      <Divider
                        sx={{
                          color: "gray",
                          border: "1px solid",
                          marginTop: "1rem",
                        }}
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className="admin-bookNotes-note">{note.note}</p>
                    <section className="admin-page-and-id-wrapper">
                      <p className="admin-bookNotes-page">{`Page: ${note.page}`}</p>
                      <p className="admin-bookNotes-id">{`ID: ${note.id}`}</p>
                    </section>
                  </AccordionDetails>
                  <AccordionActions>
                    <div className="admin-bookNotes-select">
                      <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">
                          Book
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={selectedBook}
                          label="Book"
                          onChange={(event) => handleChange(event, note.id)}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {books.map((book, index) => (
                            <MenuItem value={book.title} key={index}>
                              {book.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select a different book</FormHelperText>
                      </FormControl>
                    </div>
                    <BasicSpeedDial
                      onActionClick={handleActionClick}
                      note={note}
                    />
                  </AccordionActions>
                </Accordion>
              ))}
              <Divider
                sx={{ color: "gray", border: "1px solid", marginTop: "1rem" }}
              />
            </div>
          ))}
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
