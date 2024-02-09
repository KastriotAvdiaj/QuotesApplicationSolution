import React from "react";
import "./Quote.css";

const Quote = ({
  description,
  authorName,
  disabled,
  id,
  onCheckboxChange,
  isSelected,
  theme,
}) => {
  console.log(theme);

  return (
    <div className={theme === "light" ? "quote" : "quoteDark"}>
      <p className="quote-description">"{description}"</p>
      <p className="quote-author">-{authorName}</p>
      <input
        type="checkbox"
        checked={isSelected}
        disabled={disabled}
        className="checkBox"
        onChange={(e) => onCheckboxChange(id, e.target.checked)}
      />
    </div>
  );
};

export default Quote;
