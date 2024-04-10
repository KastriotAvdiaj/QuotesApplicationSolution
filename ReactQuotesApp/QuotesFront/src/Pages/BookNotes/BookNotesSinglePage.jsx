import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookNotesByTitle } from "../Books/SingleBook/SingleBookService";
import { BookNote } from "../../Components/SingleBook/BookNote";
import "./BookNotesSinglePage.css";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import AlertDialog from "../../Components/Mui/AlertDialog";
import { EditNote } from "../../Components/SingleBook/EditNote";

export const BookNotesSinglePage = () => {
  const { bookName } = useParams();
  const normalTitle = bookName.replace(/([a-z])([A-Z])/g, "$1 $2");
  const [bookNotes, setBookNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [editBookNote, setEditBookNote] = useState(false);
  const [bookNoteToEdit, setBookNoteToEdit] = useState(null);
  const [deleteBooknote, setDeleteBookNote] = useState(false);
  const [isBookNoteDialogOpen, setBookNoteDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    setDeleteBookNote(true);
  };

  useEffect(() => {
    const fetchBookNotes = async () => {
      const notes = await getBookNotesByTitle(normalTitle);
      setBookNotes(notes);
    };

    fetchBookNotes();
  }, [normalTitle]);

  const successDeletion = (deletedNoteId) => {
    const updatedBookNotes = bookNotes.filter(
      (note) => note.id !== deletedNoteId
    );
    setMessage("Successfully Deleted BookNote");
    setBookNotes(updatedBookNotes);
    setDeleteBookNote(false);
  };

  const openEditingBookNote = (note) => {
    setBookNoteToEdit(note);
    setEditBookNote(true);
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

  const handleEditFormVisibility = () => {
    setEditBookNote(!editBookNote);
  };

  // const updateBookNotes = (newNote) => {
  //   setBookNotes((prevNotes) => [...prevNotes, newNote]);
  //   setMessage("Successfully added a new note");
  //   setTimeout(() => setMessage(""), 3000);
  // };

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

  return (
    <div className="mainBookNotesSinglePageDiv">
      <p className="singleBookTitleParagrapgh"> "{normalTitle}" </p>
      <p className="notesParagraph">Notes : </p>
      <SuccessMessage message={message} />
      <AlertDialog
        isOpen={isBookNoteDialogOpen}
        dialogMessage={dialogMessage}
        dialogTitle={dialogTitle}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
      {editBookNote && (
        <EditNote
          isOpen={editBookNote}
          bookNote={bookNoteToEdit}
          handleFormVisibility={handleEditFormVisibility}
          bookTitle={bookName}
          updateBookNote={updateBookNote}
        />
      )}
      {bookNotes.map((note, index) => (
        <div className="bookNoteAndIndexDiv" key={index}>
          <p className="bookNoteIndex">{index + 1}.</p>{" "}
          <BookNote
            key={note.id}
            note={note}
            confirmDelete={deleteBooknote}
            successDeletion={successDeletion}
            openEditingBookNote={openEditingBookNote}
            openAlertDialog={openAlertDialog}
          />
        </div>
      ))}
    </div>
  );
};
