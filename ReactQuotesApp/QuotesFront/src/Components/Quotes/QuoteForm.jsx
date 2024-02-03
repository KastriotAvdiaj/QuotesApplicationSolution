import React, { useState } from "react";
import "./QuotesForm.css";

const QuoteForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs here if necessary
    onAdd({ description, authorName });
    // Clear form fields after submission
    setDescription("");
    setAuthorName("");
  };

  return (
    <div className="quote-form-overlay">
      <div className="quoteForm">
        <form onSubmit={handleSubmit}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quote"
            required
            className="quote-description"
          />
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author's name"
            required
            className="quote-author"
          />
          <button type="submit">Add Quote</button>
          <button>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
