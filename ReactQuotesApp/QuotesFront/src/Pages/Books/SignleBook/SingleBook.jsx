import "./SingleBook.css";
import React, { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BooksContext } from "../../../Components/Books/BooksProvider";

export const SingleBook = async () => {
  const { books } = useContext(BooksContext);
  const { bookId } = useParams();

  if (!/^\d+$/.test(bookId)) {
    // If bookId is not numeric, redirect to a custom error page or home
    return <Navigate to="/error" replace />;
  }

  const book = await books.find((book) => book.id === Number(bookId));
  console.log(book);

  if (!book) {
    return <Navigate to="/error" replace />;
  }

  return <div>SignleBook</div>;
};
