import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import "./IndividualBook.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const IndividualBook = ({
  id,
  author,
  title,
  image,
  isRandom,
  description,
  isSelected,
  toggleSelect,
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleImageDragStart = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (isRandom) {
      return;
    }
    navigate(`/books/singleBook/${id}`);

    // if (isAuthenticated && typeof toggleSelect === "function") {
    //   toggleSelect(id); //! UNCOMMENT THIS TO ALLOW SELECTING INDIVUDUAL BOOKS
    // }
  };

  return (
    <div
      className={`mainIndividualBookDiv ${isRandom ? "random" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      <div className="bookText">
        <span className="bookTitle">{title}</span>
        <br />
        <span className="bookAuthor">-{author}</span>
      </div>
      {image && (
        <img
          className="individualBookImages"
          src={`data:image/png;base64,${image}`}
          alt={title}
          onDragStart={handleImageDragStart}
        />
      )}
    </div>
  );
};

export default IndividualBook;
