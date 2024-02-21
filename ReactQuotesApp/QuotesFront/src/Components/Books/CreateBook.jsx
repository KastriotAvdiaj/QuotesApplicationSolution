import React from "react";
import { BookForm } from "./BookForm";

export const CreateBook = ({ onBookCreationSuccess }) => {
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
        console.log("Book created successfully");
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
