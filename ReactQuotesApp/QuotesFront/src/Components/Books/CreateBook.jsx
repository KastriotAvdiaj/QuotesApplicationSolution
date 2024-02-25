import React, { useContext } from "react";
import { BookForm } from "./BookForm";
import { BooksContext } from "../../Components/Books/BooksProvider";

export const CreateBook = ({ onBookCreationSuccess }) => {
  const { addBook } = useContext(BooksContext);

  const handleFormSubmit = async (bookData) => {
    try {
      const response = await fetch(
        "https://localhost:7099/api/Books/PostBooks",
        {
          method: "POST",
          body: bookData,
        }
      );
      if (response.ok) {
        const book = await response.json();
        addBook(book);
        onBookCreationSuccess();
      } else {
        console.error("Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div className="creatBookMainDiv">
      <BookForm onSubmit={handleFormSubmit} />
    </div>
  );
};
