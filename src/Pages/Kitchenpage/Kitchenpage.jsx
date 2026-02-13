// src/pages/Kitchenpage/Kitchenpage.jsx
import React, { useState } from "react";
import { kitchenData } from "../../stores/data/kitchen";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Kitchenpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Use subset of brands, types, categories from kitchenData
const BRAND_OPTIONS = [
  "Vitamix",
  "Calphalon",
  "Keurig",
  "Wusthof",
  "KitchenAid",
  "Cuisinart",
];

const TYPE_OPTIONS = [
  "Blender",
  "Cookware Set",
  "Coffee Maker",
  "Knife Set",
  "Stand Mixer",
  "Rice Cooker",
];

const CATEGORY_OPTIONS = [
  "Appliances",
  "Cookware",
  "Cutlery",
  "Bakeware",
  "Utensils",
  "Dining",
];

const Kitchenpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 400
  const [maxPrice, setMaxPrice] = useState(400);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 6;
  const navigate = useNavigate();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const getModel = (value) => (value ? value.toString() : "");

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

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedCategories([]);
    setMaxPrice(400);
    setCurrentPage(1);
  };

  // FILTER
  const filteredProducts = kitchenData.filter((item) => {
    const price = Number(item.price);

    const matchesPrice = price >= 0 && price <= maxPrice;
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchesPrice && matchesBrand && matchesType && matchesCategory;
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

      <div className="kitchen-wrapper">
        <button
          className="kitchen-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {showFilters && (
          <div
            className="kitchen-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        <aside className={`kitchen-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="kitchen-filter-header">
            <h2>Filters</h2>
            <button
              className="kitchen-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="kitchen-filter-section">
            <h3>Price (₹)</h3>

            <div className="kitchen-single-price-range-wrapper">
              <div className="kitchen-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>400</span>
              </div>

              <input
                type="range"
                min={0}
                max={400}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="kitchen-single-price-range-input"
              />
            </div>

            <p className="kitchen-single-price-display">
              Showing kitchen items up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="kitchen-filter-section">
            <h3>Brand</h3>
            <div className="kitchen-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="kitchen-checkbox-row">
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
          <section className="kitchen-filter-section">
            <h3>Type</h3>
            <div className="kitchen-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="kitchen-checkbox-row">
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

          {/* Category */}
          <section className="kitchen-filter-section">
            <h3>Category</h3>
            <div className="kitchen-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="kitchen-checkbox-row">
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

          <button className="kitchen-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        <main className="kitchen-main">
          <div className="kitchen-top-bar">
            <div>
              <h1>Kitchen</h1>
              <p className="kitchen-results-text">
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
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
                <option value="az">Name: A → Z</option>
                <option value="za">Name: Z → A</option>
              </select>
            </div>
          </div>

          <div className="pagesection">
            {currentProducts.map((item) => (
              <div
                className="kitchen-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/kitchen/${item.id}`, { state: item })
                }
              >
                {/* WISHLIST ICON */}
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({ ...item, type: "kitchen" });
                  }}
                >
                  {isInWishlist(item.id, "kitchen") ? (
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

export default Kitchenpage;
