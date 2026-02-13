import React, { useState } from "react";
import { booksData } from "../../stores/data/books";
import Pagination from "./Pagination";
import "./ProductGrid.css";

const ProductGrid = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");

  
  const productsPerPage = 6;

 
  const sortedProducts = [...booksData].sort((a, b) => {
    switch (sortType) {
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      case "az":
        return a.model.localeCompare(b.model);
      case "za":
        return b.model.localeCompare(a.model);
      default:
        return 0;
    }
  });

  
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container">

      {/* SORT DROPDOWN */}
      <div className="sort-section">
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="pagesection">
        {currentProducts.map((item) => (
          <div className="books" key={item.id}>
            <div className="pageimg">
              <img src={item.image} alt={item.model} />
            </div>

            <div className="promodel">{item.company} {item.model}</div>

            <div className="price">${item.price}</div>

            <div className="description">{item.description}</div>

            <button className="buybtn">Buy Now</button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        totalProducts={sortedProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
};

export default ProductGrid;
