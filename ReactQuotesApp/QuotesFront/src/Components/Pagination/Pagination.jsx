import React from "react";
import "./Pagination.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(itemsCount / pageSize);

  const pageNumbers = () => {
    const pages = [];
    const visiblePages = 1;

    let startPage = Math.max(currentPage - visiblePages, 1);
    let endPage = Math.min(currentPage + visiblePages, totalPages);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="PreviousNextButtons"
      >
        <IoArrowBackCircleSharp
          className={`pagination-icon ${
            currentPage === 1 ? "pagination-icon-disabled" : ""
          }`}
        />
      </button>
      {pageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === currentPage || page === "..."}
          className={page === "..." ? "pagination-ellipsis" : ""}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="PreviousNextButtons"
      >
        <IoArrowForwardCircleSharp
          className={`pagination-icon ${
            currentPage === totalPages ? "pagination-icon-disabled" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
