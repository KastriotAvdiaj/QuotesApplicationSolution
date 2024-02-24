import { Reorder, AnimatePresence } from "framer-motion";
import IndividualBook from "../Books/IndividualBook";
import React from "react";

const BookList = ({ books, onReorderBooks }) => {
  const random = true;
  return (
    <Reorder.Group
      axis="y"
      values={books.map((book) => book.id)}
      onReorder={onReorderBooks}
      className="booksList"
    >
      <AnimatePresence>
        {books.map((book, index) => (
          <Reorder.Item
            key={book.id}
            value={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileDrag={{ scale: 1.1 }}
          >
            <IndividualBook
              id={book.id}
              author={book.author}
              title={book.title}
              description={book.description}
              image={book.imageBase64}
              isRandom={random}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default BookList;
