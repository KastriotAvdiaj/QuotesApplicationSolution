import React, { createContext, useState, useEffect } from 'react';


export const QuotesContext = createContext();


export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('URL_TO_FETCH_QUOTES');
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <QuotesContext.Provider value={quotes}>
      {children}
    </QuotesContext.Provider>
  );
};