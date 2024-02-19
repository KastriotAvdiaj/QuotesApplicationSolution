import React from "react";
import { BookForm } from "./BookForm";

export const CreateBook = () => {
  const handleFormSubmit = async (bookData) => {
    try {
      // Call your API to create a new book
      const response = await fetch(
        "https://localhost:7099/api/Books/PostBooks",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: bookData,
        }
      );
      if (response.ok) {
        console.log("Book created successfully");
      } else {
        console.error("Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Book</h2>
      <BookForm onSubmit={handleFormSubmit} />
    </div>
  );
};
