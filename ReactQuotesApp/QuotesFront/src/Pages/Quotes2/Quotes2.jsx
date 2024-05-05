import React, { useContext, useState, useEffect, useRef } from "react";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import Quote2 from "../../Components/Quotes/Quote2";
import "./Quotes2.css";
import Divider from "@mui/material/Divider";
import { TfiReload } from "react-icons/tfi";
import { TfiUpload } from "react-icons/tfi";

export const Quotes2 = () => {
  const { quotes, addQuote, setQuotes } = useContext(QuotesContext);
  const [displayedQuotes, setDisplayedQuotes] = useState([]);
  const [numberOfQuotesToShow, setNumberOfQuotesToShow] = useState(7);
  const [incrementBy, setIncrementBy] = useState(5);
  const [buttonClicked, setButtonClicked] = useState(0);
  const totalQuotes = quotes.length;

  useEffect(() => {
    setDisplayedQuotes(quotes.slice(0, numberOfQuotesToShow));
  }, [quotes, numberOfQuotesToShow]);

  const loadMoreQuotes = () => {
    const newNumberOfQuotesToShow = numberOfQuotesToShow + incrementBy;
    setDisplayedQuotes(quotes.slice(0, newNumberOfQuotesToShow));
    setNumberOfQuotesToShow(newNumberOfQuotesToShow);
    setButtonClicked(buttonClicked + 1);
  };

  const showLessQuotes = () => {
    const newNumberOfQuotesToShow = numberOfQuotesToShow - incrementBy;
    setDisplayedQuotes(quotes.slice(0, newNumberOfQuotesToShow));
    setNumberOfQuotesToShow(newNumberOfQuotesToShow);
    setButtonClicked(buttonClicked - 1);
  };

  return (
    <>
      <p className="totalQuotes">Total Quotes : {totalQuotes}</p>

      <div className="mainQuotes2Div">
        <ul className="quotes2Ul">
          {displayedQuotes.map((quote, index) => (
            <FadeInListItem
              key={quote.id}
              index={index}
              quote={quote}
              totalQuotes={totalQuotes}
            />
          ))}
        </ul>

        <div className="quotes2ButtonDiv">
          {numberOfQuotesToShow < quotes.length && (
            <button className="loadMoreButton" onClick={loadMoreQuotes}>
              Load More
              <TfiReload />
            </button>
          )}
          {buttonClicked > 0 && (
            <button className="loadMoreButton" onClick={showLessQuotes}>
              Show Less
              <TfiUpload />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const FadeInListItem = ({ index, quote }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.classList.add("fade-in");
        } else if (ref.current) {
          ref.current.classList.remove("fade-in");
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <>
      <li
        ref={ref}
        className={index % 2 === 0 ? "quotes2Li even" : "quotes2Li odd"}
      >
        <Quote2
          index={index}
          description={quote.description}
          authorName={quote.authorName}
        ></Quote2>
        <Divider sx={{ backgroundColor: "gray", height: "1px" }} />
      </li>
    </>
  );
};
