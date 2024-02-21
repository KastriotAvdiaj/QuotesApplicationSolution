import React from "react";
import { BooksProvider } from "../../Components/Books/BooksProvider";
import { Books } from "./Books";

const BooksPageWrapper = () => {
  return (
    <BooksProvider>
      <Books />
    </BooksProvider>
  );
};

export default BooksPageWrapper;
