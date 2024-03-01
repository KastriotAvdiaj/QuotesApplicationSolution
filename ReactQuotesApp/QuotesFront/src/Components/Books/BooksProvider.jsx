import React, { createContext, useState, useEffect } from "react";

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
    const bookWithConvertedImage = {
      ...updatedBook,
      imageBase64: updatedBook.image,
    };
    // Remove the original `image` attribute if you don't need it anymore
    delete bookWithConvertedImage.image;

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookWithConvertedImage.id ? bookWithConvertedImage : book
      )
    );
  };

  return (
    <BooksContext.Provider
      value={{ books, addBook, deleteSelectedBooks, updateTheBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};
