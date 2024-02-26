import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import "./IndividualBook.css";

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

  const handleImageDragStart = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    // Check if isAuthenticated and toggleSelect is a function before calling it
    if (isAuthenticated && typeof toggleSelect === "function") {
      toggleSelect(id);
    }
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
