import React, { useContext, useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BooksContext } from "../BooksProvider";

const BookDeletionButton = ({
  onClick,
  selectedBookIds,
  onDeleteSuccess,
  onDeleteError,
  confirmDelete,
  onDeletionComplete,
}) => {
  const { deleteSelectedBooks } = useContext(BooksContext);

  useEffect(() => {
    // This effect runs when `confirmDelete` changes.
    // It will now properly react to the `confirmDelete` being true.
    const handleDelete = async () => {
      if (confirmDelete) {
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

          if (!response.ok) {
            throw new Error("Failed to delete books.");
          }
          deleteSelectedBooks(selectedBookIds);
          onDeleteSuccess(selectedBookIds);
          onDeletionComplete();
        } catch (error) {
          onDeleteError(error.message);
          onDeletionComplete();
        }
      }
    };

    handleDelete();
  }, [
    confirmDelete,
    deleteSelectedBooks,
    onDeleteError,
    onDeleteSuccess,
    selectedBookIds,
  ]);

  return (
    <button onClick={onClick} className="booksButton delete">
      Delete <MdOutlineDeleteForever />
    </button>
  );
};

export default BookDeletionButton;
