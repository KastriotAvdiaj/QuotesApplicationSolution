import React, { useState } from "react";
import "./Quote.css";

const Quote = ({
  description,
  authorName,
  disabled,
  id,
  onCheckboxChange,
  isSelected,
  theme,
  borderColor,
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
      <p className="quote-description">"{description}"</p>
      <p className="quote-author">-{authorName}</p>
      <input
        type="checkbox"
        checked={isSelected}
        disabled={disabled}
        className="checkBox"
        onChange={(e) => onCheckboxChange(id, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Quote;
