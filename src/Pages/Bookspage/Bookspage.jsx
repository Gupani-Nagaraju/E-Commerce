// src/pages/Bookspage/Bookspage.jsx
import React, { useState } from "react";
import { booksData } from "../../stores/data/books";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Bookspage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// booksData lo unna categories ke match
const CATEGORY_OPTIONS = [
  "Literature",
  "Fantasy",
  "Dystopian Fiction",
  "Romance",
  "Coming-of-age",
  "Philosophical Fiction",
  "Mystery",
];

const Bookspage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
 
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const productsPerPage = 6;

  // wishlist hook
  const { toggleWishlist, isInWishlist } = useWishlist();

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(5000);
    setSearchTerm("");
    setSortType("");
    setCurrentPage(1);
  };

  /* -------- FILTER -------- */
  const filteredProducts = booksData.filter((item) => {
    const price = Number(item.price);

    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query);

    return matchesPrice && matchesCategory && matchesSearch;
  });

  /* -------- SORT -------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "low-high":
        return Number(a.price) - Number(b.price);
      case "high-low":
        return Number(b.price) - Number(a.price);
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  /* -------- PAGINATION -------- */
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <Header />

      <div className="books-wrapper">
        <button
          className="books-mobile-filter-btn"
          onClick={() => setShowFilters((p) => !p)}
        >
          ☰ Filters
        </button>

        {showFilters && (
          <div
            className="books-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`books-filter-sidebar ${showFilters ? "open" : ""}`}
        >
          <div className="books-filter-header">
            <h2>Filters</h2>
            <button
              className="books-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <section className="books-filter-section">
            <h3>Search</h3>
            <input
              type="text"
              className="books-search-input"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </section>

          {/* Price */}
          <section className="books-filter-section">
            <h3>Price (₹)</h3>

            <div className="books-single-price-range-wrapper">
              <div className="books-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>100</span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="books-single-price-range-input"
              />
            </div>

            <p className="books-single-price-display">
              Showing books up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Categories */}
          <section className="books-filter-section">
            <h3>Categories</h3>
            <div className="books-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="books-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </section>

          <button className="books-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main */}
        <main className="books-main">
          <div className="books-top-bar">
            <div>
              <h1>Books</h1>
              <p className="books-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="sort-section">
              <select
                value={sortType}
                onChange={(e) => {
                  setSortType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Sort By</option>
                <option value="low-high">Price Low → High</option>
                <option value="high-low">Price High → Low</option>
                <option value="az">Title A → Z</option>
                <option value="za">Title Z → A</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="pagesection">
            {currentProducts.map((item) => (
              <div
                className="books-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/books/${item.id}`, { state: item })
                }
              >
                {/* WISHLIST ICON */}
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({ ...item, type: "books" });
                  }}
                >
                  {isInWishlist(item.id, "books") ? (
                    <FaHeart color="red" size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </button>

                <div className="pageimg">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="promodel">{item.title}</div>

                <div style={{ fontSize: "14px", color: "#555" }}>
                  by {item.author}
                </div>

                <div className="price">₹ {item.price}</div>

                <button className="buybtn">Buy Now</button>
              </div>
            ))}
          </div>

          <Pagination
            totalProducts={sortedProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </>
  );
};

export default Bookspage;
