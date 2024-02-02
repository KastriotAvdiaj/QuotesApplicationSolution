import React from "react";
import "./Quote.css";

const Quote = ({ description, authorName }) => {
  return (
    <div className="quote">
      <p className="quote-description">"{description}"</p>
      <p className="quote-author">-{authorName}</p>
    </div>
  );
};

export default Quote;
