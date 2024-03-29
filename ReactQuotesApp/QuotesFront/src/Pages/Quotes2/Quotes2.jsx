import React, { useContext, useState, useEffect } from "react";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import Quote2 from "../../Components/Quotes/Quote2";
import "./Quotes2.css";
import Divider from "@mui/material/Divider";

export const Quotes2 = () => {
  const { quotes, addQuote, setQuotes } = useContext(QuotesContext);

  return (
    <>
      <ul className="quotes2Ul">
        {quotes.map((quote, index) => (
          <li
            key={quote.id}
            className={index % 2 === 0 ? "quotes2Li even" : "quotes2Li odd"}
          >
            <Quote2
              description={quote.description}
              authorName={quote.authorName}
            ></Quote2>
            <Divider sx={{ backgroundColor: "gray" }} />
          </li>
        ))}
      </ul>
    </>
  );
};
