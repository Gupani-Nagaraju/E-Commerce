import React, { useState } from "react";
import { furnitureData } from "../../stores/data/furniture";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Furniturepage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const BRAND_OPTIONS = [
  "IKEA",
  "Wayfair",
  "Ashley",
  "West Elm",
  "Crate & Barrel",
  "Pottery Barn",
];

const TYPE_OPTIONS = [
  "Sofa",
  "Dining Table",
  "Bed",
  "Coffee Table",
  "Wardrobe",
  "Bookshelf",
];

const CATEGORY_OPTIONS = ["Home", "Office"];

const Furniturepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 1500
  const [maxPrice, setMaxPrice] = useState(1500);
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
    setMaxPrice(1500);
    setSortType("");
    setCurrentPage(1);
  };

  /* -------- FILTER -------- */
  const filteredProducts = furnitureData.filter((item) => {
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

  /* -------- SORT -------- */
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

  /* -------- PAGINATION -------- */
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <Header />

      <div className="furniture-wrapper">
        
        <button
          className="furniture-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="furniture-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`furniture-filter-sidebar ${showFilters ? "open" : ""}`}
        >
          <div className="furniture-filter-header">
            <h2>Filters</h2>
            <button
              className="furniture-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="furniture-filter-section">
            <h3>Price (₹)</h3>

            <div className="furniture-single-price-range-wrapper">
              <div className="furniture-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>1,500</span>
              </div>

              <input
                type="range"
                min={0}
                max={1500}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="furniture-single-price-range-input"
              />
            </div>

            <p className="furniture-single-price-display">
              Showing furniture up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="furniture-filter-section">
            <h3>Brand</h3>
            <div className="furniture-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="furniture-checkbox-row">
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
          <section className="furniture-filter-section">
            <h3>Type</h3>
            <div className="furniture-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="furniture-checkbox-row">
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
          <section className="furniture-filter-section">
            <h3>Category</h3>
            <div className="furniture-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="furniture-checkbox-row">
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

          <button className="furniture-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main */}
        <main className="furniture-main">
          <div className="furniture-top-bar">
            <div>
              <h1>Furniture</h1>
              <p className="furniture-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="furniture-sort-section">
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

          {/* Grid */}
          <div className="pagesection">
            {currentProducts.map((item) => (
              <div
                className="furniture-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/furniture/${item.id}`, { state: item })
                }
              >
                {/* WISHLIST ICON */}
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({ ...item, type: "furniture" });
                  }}
                >
                  {isInWishlist(item.id, "furniture") ? (
                    <FaHeart color="red" size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </button>

                <div className="pageimg">
                  <img src={item.image} alt={item.model || "Furniture"} />
                </div>

                <div className="promodel">
                  {item.brand} {item.model}
                </div>

                <div className="price">₹ {item.price}</div>

                {item.description && (
                  <div className="description">{item.description}</div>
                )}

                <button
                  className="buybtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/furniture/${item.id}`, { state: item });
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

export default Furniturepage;
