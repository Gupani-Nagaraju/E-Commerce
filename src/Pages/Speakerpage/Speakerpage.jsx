import React, { useState } from "react";
import { speakerData } from "../../stores/data/speaker";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Speakerpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Map each speaker to multiple logical categories
const mapCategory = (item) => {
  const base = item.category || "Electronics";
  const tags = [];
  const price = Number(item.price);
  const name = (item.model || "").toLowerCase();

  if (price >= 500) tags.push("Premium");
  else if (price <= 150) tags.push("Budget");

  if (
    name.includes("boom") ||
    name.includes("flip") ||
    name.includes("soundlink")
  ) {
    tags.push("Portable");
  }
  if (
    name.includes("home") ||
    name.includes("musiccast") ||
    name.includes("studio")
  ) {
    tags.push("Home");
  }

  return [base, ...tags];
};

// Filter options
const BRAND_OPTIONS = ["Bose", "Sonos", "JBL", "Sony", "Marshall", "Anker"];
const CATEGORY_OPTIONS = [
  "Electronics",
  "Portable",
  "Home",
  "Premium",
  "Budget",
];

const Speakerpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 3000
  const [maxPrice, setMaxPrice] = useState(3000);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const productsPerPage = 6;

  const { toggleWishlist, isInWishlist } = useWishlist();

  const getModel = (value) => (value ? value.toString() : "");

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
  const filteredProducts = speakerData
    .map((item, index) => ({
      id: (index + 1).toString(),
      ...item,
      _categories: mapCategory(item),
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
        return getModel(a.model).localeCompare(getModel(b.model));
      case "za":
        return getModel(b.model).localeCompare(getModel(a.model));
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
      <div className="speaker-wrapper">
        {/* Mobile Filter Button */}
        <button
          className="speaker-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="speaker-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside
          className={`speaker-filter-sidebar ${showFilters ? "open" : ""}`}
        >
          <div className="speaker-filter-header">
            <h2>Filters</h2>
            <button
              className="speaker-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="speaker-filter-section">
            <h3>Price (₹)</h3>

            <div className="speaker-single-price-range-wrapper">
              <div className="speaker-single-price-labels">
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
                className="speaker-single-price-range-input"
              />
            </div>

            <p className="speaker-single-price-display">
              Showing speakers up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="speaker-filter-section">
            <h3>Brand</h3>
            <div className="speaker-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="speaker-checkbox-row">
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
          <section className="speaker-filter-section">
            <h3>Category</h3>
            <div className="speaker-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="speaker-checkbox-row">
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

          <button className="speaker-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="speaker-main">
          {/* Top bar: title left, sort right */}
          <div className="speaker-top-bar">
            <div>
              <h1>Speakers</h1>
              <p className="speaker-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="speaker-sort-section">
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

          {/* PRODUCT GRID */}
          <div className="pagesection">
            {currentProducts.length === 0 ? (
              <div className="speaker-no-results">
                No speakers match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="speaker-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/speaker/${item.id}`, { state: item })
                  }
                >
                  {/* WISHLIST ICON */}
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "speaker" });
                    }}
                  >
                    {isInWishlist(item.id, "speaker") ? (
                      <FaHeart color="red" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>

                  <div className="pageimg">
                    <img src={item.image} alt={item.model || "Speaker"} />
                  </div>

                  <div className="promodel">
                    {item.brand} {item.model}
                  </div>

                  <div className="price">₹ {item.price}</div>

                  {item.description && (
                    <div className="description">{item.description}</div>
                  )}

                  {/* Buy Now button – match TV button style */}
                  <button
                    type="button"
                    className="speaker-buy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/speaker/${item.id}`, { state: item });
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            )}
          </div>

          {/* PAGINATION */}
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

export default Speakerpage;
