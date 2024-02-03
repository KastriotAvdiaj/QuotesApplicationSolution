import React from "react";
import "./Pagination.css";
import { IoArrowBackCircleSharp, IoArrowForwardCircle } from "react-icons/io5";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="PreviousNextButtons"
      >
        <IoArrowBackCircleSharp
          className={`pagination-icon ${
            currentPage === 1 ? "pagination-icon-disabled" : ""
          }`}
        />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="PreviousNextButtons"
      >
        <IoArrowForwardCircle
          className={`pagination-icon ${
            currentPage === totalPages ? "pagination-icon-disabled" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
