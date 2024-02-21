import React from "react";

const IndividualBook = ({ id, author, title }) => {
  return (
    <div>
      {id}-{author}-{title}
    </div>
  );
};

export default IndividualBook;
