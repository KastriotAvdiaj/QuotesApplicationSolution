import React, { useContext } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BooksContext } from "../BooksProvider";

const BookDeletionButton = ({
  selectedBookIds,
  onDeleteSuccess,
  onDeleteError,
}) => {
  const { books, setBooks, deleteSelectedBooks } = useContext(BooksContext);
  const handleDelete = async () => {
    if (!selectedBookIds.length) {
      alert("Please select books to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete the selected books?")) {
      try {
        const response = await fetch(
          "https://localhost:7099/api/Books/DeleteBooks",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedBookIds),
          }
        );

        if (response.ok) {
          deleteSelectedBooks(selectedBookIds);
          onDeleteSuccess(selectedBookIds);
        } else {
          throw new Error("Failed to delete books.");
        }
      } catch (error) {
        onDeleteError(error.message);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="booksButton delete">
      Delete <MdOutlineDeleteForever />
    </button>
  );
};

export default BookDeletionButton;
