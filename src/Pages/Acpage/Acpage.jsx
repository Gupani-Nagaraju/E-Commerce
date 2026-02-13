// src/pages/Acpage/Acpage.jsx
import React, { useState } from "react";
import { acData } from "../../stores/data/ac";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Acpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// 6 main brands
const BRAND_OPTIONS = [
  "Haier",
  "Samsung",
  "Carrier",
  "Hisense",
  "LLOYD",
  "Nest",
];

// 6 main types from `product` field
const TYPE_OPTIONS = [
  "Air Conditioner",
  "AC Unit",
  "Cooling System",
  "Air Cooler",
  "Window AC",
  "Smart AC",
];

const Acpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Single slider: min fixed to 0, user changes only max
  const [maxPrice, setMaxPrice] = useState(50000);

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
    setMaxPrice(50000);
    setSortType("");
    setCurrentPage(1);
  };

  /* -------- FILTER -------- */
  const filteredProducts = acData.filter((product) => {
    const price = Number(product.price);

    // min is fixed to 0, max comes from slider
    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.company);

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(product.product);

    return matchesPrice && matchesBrand && matchesType;
  });

  /* -------- SORT -------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "low-high") return Number(a.price) - Number(b.price);
    if (sortType === "high-low") return Number(b.price) - Number(a.price);
    return 0;
  });

  /* -------- PAGINATION -------- */
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <Header />

      <div className="acpage-wrapper">
        {/* Mobile filter button */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="filter-header">
            <h2>Filters</h2>
            <button
              className="close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="filter-section">
            <h3>Price (₹)</h3>

            <div className="single-price-range-wrapper">
              <div className="single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>5,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="single-price-range-input"
              />
            </div>

            <p className="single-price-display">
              Showing products up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="filter-section">
            <h3>Brand</h3>
            <div className="checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="checkbox-row">
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
          <section className="filter-section">
            <h3>Type</h3>
            <div className="checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="checkbox-row">
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

          <button className="reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main */}
        <main className="acpage-main">
          <div className="top-bar">
            <div>
              <h1>Air Conditioners</h1>
              <p className="results-text">
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
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="pagesection">
            {currentProducts.map((item) => (
              <div
                className="ac-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/ac/${item.id}`, { state: item })
                }
              >
                {/* WISHLIST ICON */}
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({ ...item, type: "ac" });
                  }}
                >
                  {isInWishlist(item.id, "ac") ? (
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
                    navigate(`/product/ac/${item.id}`, { state: item });
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

export default Acpage;
