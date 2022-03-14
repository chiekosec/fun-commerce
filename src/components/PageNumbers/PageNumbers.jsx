import React from "react";
import './PageNumbers.css'

function PageNumbers({
  totalItems,
  itemsPerPage,
  onChange,
  current,
  bottomIndex,
  topIndex,
  handleNext,
  handlePrev,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination-container">
      <button
        className={`pagination-prev`}
        onClick={handlePrev}
        disabled={current === pageNumbers[0] ? true : false}
      >
        Prev
      </button>
      {pageNumbers.map((pageNumber) =>
        pageNumber > bottomIndex && pageNumber <= topIndex ? (
          <li
            key={pageNumber}
            className={`pagination-number${
              current === pageNumber ? " active" : ""
            }`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ) : (
          ""
        )
      )}
      <button
        className={`pagination-next`}
        onClick={handleNext}
        disabled={
          current === pageNumbers[pageNumbers.length - 1] ? true : false
        }
      >
        Next
      </button>
    </ul>
  );
}

export default PageNumbers;
