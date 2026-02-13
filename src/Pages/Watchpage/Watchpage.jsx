import React, { useState } from "react";
import { watchData } from "../../stores/data/watch";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Watchpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// derive extra categories from price / category
const mapCategories = (item) => {
  const base = item.category || "Wearable";
  const tags = [];
  const price = Number(item.price);

  if (item.category === "Luxury" || price >= 2000) {
    tags.push("Luxury");
  } else if (price < 150) {
    tags.push("Budget");
  } else if (price <= 400) {
    tags.push("Midrange");
  } else {
    tags.push("Premium");
  }

  if (["Apple", "Samsung", "Fitbit", "Garmin", "Huawei"].includes(item.brand)) {
    tags.push("Smartwatch");
  } else {
    tags.push("Analog / Hybrid");
  }

  return [base, ...tags];
};

// 8 brand names (all present in watchData)
const BRAND_OPTIONS = [
  "Samsung",
  "Hammer",
  "Fire-Boltt",
  "Hoco",
  "Amazfit",
  "Noise",
  "Timex",
  "Huawei",
];

const CATEGORY_OPTIONS = [
  "Wearable",
  "Luxury",
  "Budget",
  "Midrange",
  "Premium",
  "Smartwatch",
  "Analog / Hybrid",
];

const Watchpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 7000
  const [maxPrice, setMaxPrice] = useState(7000);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const productsPerPage = 6;
  const safe = (v) => (v ? v.toString() : "");

  const { toggleWishlist, isInWishlist } = useWishlist();

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
    setMaxPrice(7000);
    setCurrentPage(1);
  };

  // FILTER
  const filteredProducts = watchData
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
      <div className="watch-wrapper">
        {/* Mobile Filter Button */}
        <button
          className="watch-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {showFilters && (
          <div
            className="watch-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`watch-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="watch-filter-header">
            <h2>Filters</h2>
            <button
              className="watch-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="watch-filter-section">
            <h3>Price (₹)</h3>

            <div className="watch-single-price-range-wrapper">
              <div className="watch-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>7,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={7000}
                step={250}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="watch-single-price-range-input"
              />
            </div>

            <p className="watch-single-price-display">
              Showing watches up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="watch-filter-section">
            <h3>Brand</h3>
            <div className="watch-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="watch-checkbox-row">
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
          <section className="watch-filter-section">
            <h3>Category</h3>
            <div className="watch-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="watch-checkbox-row">
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

          <button className="watch-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="watch-main">
          <div className="watch-top-bar">
            <div>
              <h1>Watches</h1>
              <p className="watch-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="watch-sort-section">
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
              <div className="watch-no-results">
                No watches match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="watch-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/watch/${item.id}`, { state: item })
                  }
                >
                  {/* WISHLIST ICON */}
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "watch" });
                    }}
                  >
                    {isInWishlist(item.id, "watch") ? (
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
                  {item.description && (
                    <div className="description">{item.description}</div>
                  )}
                  <button className="buybtn">Buy Now</button>
                </div>
              ))
            )}
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

export default Watchpage;
