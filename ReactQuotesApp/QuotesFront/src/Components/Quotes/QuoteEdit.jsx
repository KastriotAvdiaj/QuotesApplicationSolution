import React, { useState, useContext } from "react";
import { QuotesContext } from "./QuotesProvider";
import "./QuoteEdit.css";

const QuoteEdit = ({ onCancel, quote, author, id, setEditSuccessMessage }) => {
  const [newQuote, setNewQuote] = useState(quote);
  const [newAuthor, setNewAuthor] = useState(author);
  const { updateQuote } = useContext(QuotesContext);

  const quoteEdited = {
    Id: id,
    AuthorName: newAuthor ? newAuthor : author,
    Description: newQuote ? newQuote : quote,
  };

  const handldeQuoteEdit = async (updatedQuote) => {
    if (newQuote === quote && newAuthor === author) {
      onCancel();
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7099/api/Quotes/Update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuote),
        }
      );
      if (response.ok) {
        updateQuote({
          id: id,
          authorName: newAuthor,
          description: newQuote,
        });
        setEditSuccessMessage("The quote has been successfully updated!");
        onCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="quote-edit-overlay">
      <div className="quote-edit-container">
        <div className="input-container textarea">
          <textarea
            className="edit-quote-input"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            placeholder="Quote"
            rows="4"
          />
        </div>

        <div className="input-container">
          <input
            className="edit-author-input"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Author's name"
          />
        </div>

        <div className="quote-edit-actions">
          <button
            className="saveEditButton"
            onClick={() => handldeQuoteEdit(quoteEdited)}
          >
            Save
          </button>
          <button className="cancelEditButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteEdit;
