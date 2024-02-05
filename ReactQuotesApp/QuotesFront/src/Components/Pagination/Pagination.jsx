import React from "react";
import "./Pagination.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  const pageNumbers = () => {
    const pages = [];
    const visiblePages = 1; // Number of pages to show around the current page

    let startPage = Math.max(currentPage - visiblePages, 1);
    let endPage = Math.min(currentPage + visiblePages, totalPages);

    // Always include the first page
    if (startPage > 1) pages.push(1);
    // Add ellipses if there's a gap between the first page and the current range
    if (startPage > 2) pages.push("...");

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    // Add ellipses if there's a gap between the current range and the last page
    if (endPage < totalPages - 1) pages.push("...");
    // Always include the last page
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
