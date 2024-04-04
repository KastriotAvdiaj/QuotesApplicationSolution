import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookNotesByTitle } from "../Books/SingleBook/SingleBookService";
import { BookNote } from "../../Components/SingleBook/BookNote";
import "./BookNotesSinglePage.css";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";

export const BookNotesSinglePage = () => {
  const { bookName } = useParams();
  const normalTitle = bookName.replace(/([a-z])([A-Z])/g, "$1 $2");
  const [bookNotes, setBookNotes] = useState([]);
  const [message, setMessage] = useState("");

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
  };

  return (
    <div className="mainBookNotesSinglePageDiv">
      <p className="singleBookTitleParagrapgh"> "{normalTitle}" </p>
      <p className="notesParagraph">Notes : </p>
      <SuccessMessage message={message} />
      {bookNotes.map((note, index) => (
        <div className="bookNoteAndIndexDiv" key={index}>
          <p className="bookNoteIndex">{index + 1}.</p>{" "}
          <BookNote
            key={note.id}
            note={note}
            successDeletion={successDeletion}
          />
        </div>
      ))}
    </div>
  );
};
