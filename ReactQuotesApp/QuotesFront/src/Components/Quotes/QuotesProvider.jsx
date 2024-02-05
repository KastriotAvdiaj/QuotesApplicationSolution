import React, { createContext, useState, useEffect } from "react";

export const QuotesContext = createContext({
  quotes: [],
  addQuote: () => {},
});

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          "https://localhost:7099/api/Quotes/GetQuotes"
        );
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };

    fetchQuotes();
  }, []);

  const addQuote = (newQuote) => {
    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  };

  const deleteSelectedQuotes = (idsToDelete) => {
    setQuotes((currentQuotes) =>
      currentQuotes.filter((quote) => !idsToDelete.includes(quote.id))
    );
  };

  return (
    <QuotesContext.Provider
      value={{ quotes, addQuote, setQuotes, deleteSelectedQuotes }}
    >
      {children}
    </QuotesContext.Provider>
  );
};
