import React, { useState } from "react";
import "./QuotesForm.css";

const QuoteForm = ({ onAdd, onClose }) => {
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAuthorName = authorName.trim() ? authorName : "Unknown";
    console.log(finalAuthorName);
    onAdd({ description, authorName: finalAuthorName });
    setDescription("");
    setAuthorName("");
  };

  return (
    <div className="quote-form-overlay">
      <div className="quoteForm">
        <form onSubmit={handleSubmit} className="quoteForm2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quote"
            required
            className="quoteDescription"
          />
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author's name"
            className="quoteAuthor"
          />
          <button type="submit" className="addQuote">
            Add
          </button>
          <button type="button" className="cancelButton" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
