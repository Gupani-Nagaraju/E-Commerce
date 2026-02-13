// src/pages/Computerpage/Computerpage.jsx
import React, { useState } from "react";
import { computerData } from "../../stores/data/computers";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Computerpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Brand options
const BRAND_OPTIONS = ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple"];

// Type options
const TYPE_OPTIONS = [
  "Inspiron 15",
  "Pavilion 27",
  "MacBook Air",
  "IdeaPad Flex",
  "Predator Helios 300",
  "Surface Pro 7",
];

const Computerpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  // single slider: 0 → 200000
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const productsPerPage = 6;

  // ✅ wishlist hook
  const { toggleWishlist, isInWishlist } = useWishlist();

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setMaxPrice(5000);
    setSortType("");
    setCurrentPage(1);
  };

  /* -------- FILTER -------- */
  const filteredProducts = computerData.filter((item) => {
    const price = Number(item.price);

    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(item.company);

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(item.model);

    return matchesPrice && matchesBrand && matchesType;
  });

  /* -------- SORT -------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "low-high":
        return Number(a.price) - Number(b.price);
      case "high-low":
        return Number(b.price) - Number(a.price);
      case "az":
        return (a.model || "").localeCompare(b.model || "");
      case "za":
        return (b.model || "").localeCompare(a.model || "");
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

      <div className="computer-wrapper">
        {/* Mobile filter button */}
        <button
          className="computer-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="computer-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`computer-filter-sidebar ${showFilters ? "open" : ""}`}
        >
          <div className="computer-filter-header">
            <h2>Filters</h2>
            <button
              className="computer-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="computer-filter-section">
            <h3>Price (₹)</h3>
            <div className="computer-single-price-range-wrapper">
              <div className="computer-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>5,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={5000}
                step={200}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="computer-single-price-range-input"
              />
            </div>

            <p className="computer-single-price-display">
              Showing computers up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="computer-filter-section">
            <h3>Brand</h3>
            <div className="computer-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="computer-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Type */}
          <section className="computer-filter-section">
            <h3>Type</h3>
            <div className="computer-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="computer-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </section>

          <button className="computer-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main */}
        <main className="computer-main">
          {/* TOP BAR */}
          <div className="computer-top-bar">
            <div>
              <h1>Computers</h1>
              <p className="computer-results-text">
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
                <option value="az">Name A → Z</option>
                <option value="za">Name Z → A</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="pagesection-computer">
            {currentProducts.map((item) => (
              <div
                className="computer-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/computer/${item.id}`, { state: item })
                }
              >
                {/*  WISHLIST ICON */}
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({ ...item, type: "computer" });
                  }}
                >
                  {isInWishlist(item.id, "computer") ? (
                    <FaHeart color="red" size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </button>

                <div className="pageimg">
                  <img src={item.image} alt={item.model} />
                </div>

                <div className="promodel">
                  {item.company} {item.model}
                </div>

                <div className="price">₹ {item.price}</div>

                <button
                  className="buybtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/computer/${item.id}`, { state: item });
                  }}
                >
                  Buy Now
                </button>
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

export default Computerpage;
