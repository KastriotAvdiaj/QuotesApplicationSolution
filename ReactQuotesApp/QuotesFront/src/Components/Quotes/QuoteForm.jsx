import React, { useState } from "react";
import { useTheme } from "../Theme/ThemeContext";
import "./QuoteForm.css";

const QuoteForm = ({ onAdd, onClose }) => {
  const { theme } = useTheme();
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [authorNameError, setAuthorNameError] = useState("");

  const maxDescriptionLength = 200; // Maximum length for the quote
  const maxAuthorNameLength = 30; // Maximum length for the author

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      description.length > maxDescriptionLength ||
      authorName.length > maxAuthorNameLength
    ) {
      // Do not submit if there is an error
      return;
    }
    const finalAuthorName = authorName.trim() ? authorName : "Unknown";
    onAdd({ description, authorName: finalAuthorName });
    setDescription("");
    setAuthorName("");
    setDescriptionError("");
    setAuthorNameError("");
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length > maxDescriptionLength) {
      setDescriptionError(
        `Description cannot exceed ${maxDescriptionLength} characters.`
      );
    } else {
      setDescriptionError("");
    }
    setDescription(value);
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    if (value.length > maxAuthorNameLength) {
      setAuthorNameError(
        `Author name cannot exceed ${maxAuthorNameLength} characters.`
      );
    } else {
      setAuthorNameError("");
    }
    setAuthorName(value);
  };

  return (
    <div className="quote-form-overlay">
      <div className={theme === "dark" ? "quoteForm dark" : "quoteForm"}>
        <h2>Add a new Quote</h2>
        <form onSubmit={handleSubmit} className="quoteForm2">
          <div className="textInputWrapperDiv">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter quote"
              required
              className={
                theme === "dark" ? "quoteDescription dark" : "quoteDescription"
              }
            />
            {descriptionError && (
              <div className="error">{descriptionError}</div>
            )}
            <input
              type="text"
              value={authorName}
              onChange={handleAuthorNameChange}
              placeholder="Author's name"
              className={theme === "dark" ? "quoteAuthor dark" : "quoteAuthor"}
            />
            {authorNameError && <div className="error">{authorNameError}</div>}
          </div>
          <div className="quoteFormButtonsDiv">
            <button
              type="submit"
              className={theme === "dark" ? "addQuote dark" : "addQuote"}
            >
              Add
            </button>
            <button
              type="button"
              className={
                theme === "dark" ? "cancelButton dark" : "cancelButton"
              }
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
