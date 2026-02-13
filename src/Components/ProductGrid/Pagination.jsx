import React from "react";
import "./Pagination.css";

const Pagination = ({ totalProducts, productsPerPage, currentPage, setCurrentPage }) => {
  
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <div className="pagination">
      <button 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
