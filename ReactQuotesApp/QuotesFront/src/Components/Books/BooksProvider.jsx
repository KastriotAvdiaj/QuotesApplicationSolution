import React, { createContext, useState, useEffect } from "react";
import { updateBook } from "./BookService/BookService";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://localhost:7099/api/Books/GetBooks"
        );
        const data = await response.json();
        setBooks(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchBooks();
  }, []);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const deleteSelectedBooks = (idsToDelete) => {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => !idsToDelete.includes(book.id))
    );
  };

  const updateTheBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        addBook,
        deleteSelectedBooks,
        updateTheBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
