import React, { useState } from "react";
import "./Quote.css";

const Quote2 = ({
  description,
  authorName,
  id,
  onCheckboxChange,
  isSelected,
  theme,
  borderColor,
  editButtonDisplay,
  checkboxDisplay,
  onEditButtonClick,
}) => {
  const themeClass = theme === "light" ? "" : "quote--dark";

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`quote ${themeClass} ${isExpanded ? "expanded" : ""}`}
      style={{
        borderLeft: `8px solid ${borderColor}`,
      }}
      onClick={toggleExpand}
    >
      <button
        className="editQuoteButton"
        style={{ display: editButtonDisplay }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent the quote from expanding
          onEditButtonClick(description, authorName, id); // Call the function passed as a prop
        }}
      >
        Change
      </button>
      <p className="quote-description">"{description}"</p>
      <p className="quote-author">-{authorName}</p>
      <input
        type="checkbox"
        checked={isSelected}
        className="checkBox"
        style={{ display: checkboxDisplay }}
        onChange={(e) => onCheckboxChange(id, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Quote2;
