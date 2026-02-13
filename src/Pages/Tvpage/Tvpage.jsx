import React, { useState } from "react";
import { tvData } from "../../stores/data/tv";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Tvpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Helper: derive extra categories from price / model
const mapCategories = (item) => {
  const base = item.category || "Electronics";
  const tags = [];
  const price = Number(item.price);
  const name = (item.model || "").toLowerCase();

  if (price < 600) tags.push("Budget");
  else if (price <= 1200) tags.push("Midrange");
  else tags.push("Premium");

  if (name.includes("oled") || name.includes("qled")) tags.push("High-End Panel");
  if (name.includes("frame")) tags.push("Lifestyle");
  if (name.includes("4k")) tags.push("4K");

  return [base, ...tags];
};

// Filter options
const BRAND_OPTIONS = [
  "LG",
  "Sony",
  "Samsung",
  "TCL",
  "Vizio",
  "Hisense",
  "Panasonic",
  "Philips",
];

const CATEGORY_OPTIONS = [
  "Electronics",
  "Budget",
  "Midrange",
  "Premium",
  "High-End Panel",
  "Lifestyle",
  "4K",
];

const Tvpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 3000
  const [maxPrice, setMaxPrice] = useState(3000);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 6;
  const navigate = useNavigate();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const safe = (v) => (v ? v.toString() : "");

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMaxPrice(3000);
    setCurrentPage(1);
  };

  // FILTER
  const filteredProducts = tvData
    .map((item) => ({
      ...item,
      _categories: mapCategories(item),
    }))
    .filter((item) => {
      const price = Number(item.price);

      const matchesPrice = price >= 0 && price <= maxPrice;

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(item.brand);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => item._categories.includes(cat));

      return matchesPrice && matchesBrand && matchesCategory;
    });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "low-high":
        return Number(a.price) - Number(b.price);
      case "high-low":
        return Number(b.price) - Number(a.price);
      case "az":
        return safe(a.model).localeCompare(safe(b.model));
      case "za":
        return safe(b.model).localeCompare(safe(a.model));
      default:
        return 0;
    }
  });

  // PAGINATION
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <Header />
      <div className="tv-wrapper">
        {/* Mobile Filter Button */}
        <button
          className="tv-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="tv-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`tv-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="tv-filter-header">
            <h2>Filters</h2>
            <button
              className="tv-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="tv-filter-section">
            <h3>Price (₹)</h3>

            <div className="tv-single-price-range-wrapper">
              <div className="tv-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>3,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={3000}
                step={100}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="tv-single-price-range-input"
              />
            </div>

            <p className="tv-single-price-display">
              Showing TVs up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="tv-filter-section">
            <h3>Brand</h3>
            <div className="tv-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="tv-checkbox-row">
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

          {/* Category */}
          <section className="tv-filter-section">
            <h3>Category</h3>
            <div className="tv-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="tv-checkbox-row">
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

          <button className="tv-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="tv-main">
          {/* Top bar */}
          <div className="tv-top-bar">
            <div>
              <h1>TVs</h1>
              <p className="tv-results-text">{sortedProducts.length} results</p>
            </div>

            <div className="tv-sort-section">
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
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="pagesection">
            {currentProducts.length === 0 ? (
              <div className="tv-no-results">
                No TVs match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="tv-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/tv/${item.id}`, { state: item })
                  }
                >
                  {/* WISHLIST ICON */}
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "tv" });
                    }}
                  >
                    {isInWishlist(item.id, "tv") ? (
                      <FaHeart color="red" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>

                  <div className="pageimg">
                    <img src={item.image} alt={item.model} />
                  </div>

                  <div className="promodel">
                    {item.brand} {item.model}
                  </div>

                  <div className="price">₹ {item.price}</div>
                  <div className="description">{item.description}</div>

                  <button className="buybtn">Buy Now</button>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
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

export default Tvpage;
