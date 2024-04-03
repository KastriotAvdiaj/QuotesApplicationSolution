import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookNotesByTitle } from "../Books/SingleBook/SingleBookService";
import { BookNote } from "../../Components/SingleBook/BookNote";
import "./BookNotesSinglePage.css";

export const BookNotesSinglePage = () => {
  const { bookName } = useParams();
  const normalTitle = bookName.replace(/([a-z])([A-Z])/g, "$1 $2");
  const [bookNotes, setBookNotes] = useState([]);

  useEffect(() => {
    const fetchBookNotes = async () => {
      const notes = await getBookNotesByTitle(normalTitle);
      setBookNotes(notes);
    };

    fetchBookNotes();
  }, [normalTitle]);

  return (
    <div className="mainBookNotesSinglePageDiv">
      <p className="singleBookTitleParagrapgh"> "{normalTitle}" </p>
      <p className="notesParagraph">Notes : </p>
      {bookNotes.map((note) => (
        <BookNote key={note.id} note={note} />
      ))}
    </div>
  );
};
