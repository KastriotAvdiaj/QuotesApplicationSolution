import "./SingleBook.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BooksContext } from "../../../Components/Books/BooksProvider";

export const SingleBook = () => {
  const { books } = useContext(BooksContext);
  const { bookId } = useParams();
  const [book, setBook] = useState(undefined);
  const [loading, setLoading] = useState(true);

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
    // Render loading state
    return <div>Loading...</div>;
  }

  if (!book) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div>
      Book Title : {book.title}
      <img src={`data:image/png;base64,${book.imageBase64}`} alt={book.title} />
    </div>
  );
};
