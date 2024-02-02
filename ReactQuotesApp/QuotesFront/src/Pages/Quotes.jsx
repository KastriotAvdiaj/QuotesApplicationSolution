import React, { useContext, useState } from "react";
import { QuotesContext } from "../Components/Quotes/QuotesProvider";
import Quote from "../Components/Quotes/Quote";
import Pagination from "../Components/Pagination/Pagination";

export const Quotes = () => {
  const quotes = useContext(QuotesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  // Calculate the indices of the first and last quote on the current page
  const lastQuoteIndex = currentPage * quotesPerPage;
  const firstQuoteIndex = lastQuoteIndex - quotesPerPage;

  // Slice the quotes array to get only the quotes for the current page
  const currentQuotes = quotes.slice(firstQuoteIndex, lastQuoteIndex);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Quotes</h1>
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
