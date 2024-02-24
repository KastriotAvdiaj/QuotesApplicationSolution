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

  return (
    <div
      className={`mainIndividualBookDiv ${isRandom ? "random" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={isAuthenticated ? () => toggleSelect(id) : () => {}}
    >
      <div className="bookText">
        <span className="bookTitle">
          {title} -{id}
        </span>
        <br />
        <span className="bookAuthor">-{author}</span>
      </div>
      {image && (
        <img
          className="individualBookImages"
          src={`data:image/png;base64,${image}`}
          alt={title}
          // style={{ maxWidth: "100px", maxHeight: "100px" }}
          onDragStart={handleImageDragStart}
        />
      )}
    </div>
  );
};

export default IndividualBook;
