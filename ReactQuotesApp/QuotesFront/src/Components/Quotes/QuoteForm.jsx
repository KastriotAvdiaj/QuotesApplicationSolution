import React, { useState } from 'react';

const QuoteForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs here if necessary
    onAdd({ description, authorName });
    // Clear form fields after submission
    setDescription('');
    setAuthorName('');
  };

  return (
    <div className="quote-form-overlay">
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter quote"
          required
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author's name"
          required
        />
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
};

export default QuoteForm;