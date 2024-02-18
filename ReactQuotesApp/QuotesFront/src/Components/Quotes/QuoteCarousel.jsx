import React, { useState, useEffect } from "react";
import "./QuoteCarousel.css";

const QuoteCarousel = ({ quotes }) => {
  if (!quotes) {
    console.log("QuoteCarousel: No quote to display");
    return <div className="quote-carousel">No quote available</div>;
  }

  return (
    <div className="quote-carousel">
      <blockquote>“{quotes.description}”</blockquote>
      <figcaption>- {quotes.authorName}</figcaption>
    </div>
  );
};

export default QuoteCarousel;
