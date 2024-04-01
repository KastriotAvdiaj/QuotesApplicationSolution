import React, { useState } from "react";
import "./Quote2.css";
const Quote2 = ({ description, authorName, index }) => {
  return (
    <div className="quote2Container">
      <p className="index">{index}.</p>
      <p className="quote2-description">"{description}"</p>
      <p className="quote2-author">-{authorName}</p>
    </div>
  );
};

export default Quote2;
