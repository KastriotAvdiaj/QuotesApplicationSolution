import React from "react";
import "./Quote.css";

const Quote = ({ description, authorName, disabled, id, onCheckboxChange }) => {
  return (
    <div className="quote">
      <p className="quote-description">"{description}"</p>
      <p className="quote-author">-{authorName}</p>
      <input
        type="checkbox"
        disabled={disabled}
        className="checkBox"
        onChange={(e) => onCheckboxChange(id, e.target.checked)}
      />
    </div>
  );
};

export default Quote;
