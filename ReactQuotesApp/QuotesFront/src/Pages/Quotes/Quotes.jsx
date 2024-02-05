import React, { useContext, useState } from "react";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import Quote from "../../Components/Quotes/Quote";
import Pagination from "../../Components/Pagination/Pagination";
import { IoIosAddCircle } from "react-icons/io";
import QuoteForm from "../../Components/Quotes/QuoteForm";
import "./Quotes.css";

export const Quotes = () => {
  const { quotes, addQuote } = useContext(QuotesContext);
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;
  const totalPages = Math.ceil(quotes.length / quotesPerPage);
  const lastQuoteIndex = currentPage * quotesPerPage;
  const firstQuoteIndex = lastQuoteIndex - quotesPerPage;
  const currentQuotes = quotes.slice(firstQuoteIndex, lastQuoteIndex);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddQuote = async (newQuote) => {
    try {
      const response = await fetch("https://localhost:7099/api/Quotes/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuote),
      });

      if (!response.ok) {
        throw new Error("Failed to add the quote.");
      }
      const addedQuote = await response.json(); // Assuming the API returns the added quote
      addQuote(addedQuote);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  return (
    <div>
      <h1>Quotes</h1>
      <button onClick={() => setShowForm(true)} className="newQuoteButton">
        <IoIosAddCircle className="addIcon" /> New Quote
      </button>
      {showForm && (
        <QuoteForm onAdd={handleAddQuote} onClose={handleCloseForm} />
      )}
      <ul>
        {currentQuotes.map((quote, index) => (
          <li key={index}>
            <Quote
              description={quote.description}
              authorName={quote.authorName}
            />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalCount={quotes.length}
        pageSize={quotesPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
