import React from "react";
import "./IndividualBook.css";

const IndividualBook = ({
  id,
  author,
  title,
  image,
  isRandom,
  description,
}) => {
  const handleImageDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={
        isRandom ? "mainIndividualBookDiv random" : "mainIndividualBookDiv"
      }
    >
      <div className="bookText">
        <span className="bookTitle">{title}</span>
        <br />
        <span className="bookAuthor">-{author}</span>
      </div>
      {image && (
        <img
          className="individualBookImages"
          src={`data:image/jpeg;base64,${image}`}
          alt={title}
          // style={{ maxWidth: "100px", maxHeight: "100px" }}
          onDragStart={handleImageDragStart}
        />
      )}
    </div>
  );
};

export default IndividualBook;
