import React, { useState } from "react";
import { womanData } from "../../stores/data/woman";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Womenpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// derive extra categories from price
const mapPriceCategory = (item) => {
  const price = Number(item.price);
  if (price < 50) return "Budget";
  if (price <= 100) return "Midrange";
  return "Premium";
};

const BRAND_OPTIONS = [
  "Zara",
  "H&M",
  "Levi's",
  "Forever 21",
  "Topshop",
  "Gap",
  "Mango",
  "Lululemon",
];

const TYPE_OPTIONS = [
  "Dress",
  "Blouse",
  "Jeans",
  "Jumpsuit",
  "Skirt",
  "Sweater",
  "Blazer",
  "Activewear",
  "Swimwear",
  "Pants",
  "Coat",
  "T-Shirt",
];

const CATEGORY_OPTIONS = ["Clothing", "Budget", "Midrange", "Premium"];

const Womenpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // single slider: 0 → 400
  const [maxPrice, setMaxPrice] = useState(400);
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
  const filteredProducts = womanData
    .map((item) => ({
      ...item,
      _priceCategory: mapPriceCategory(item),
    }))
    .filter((item) => {
      const price = Number(item.price);

      const matchesPrice = price >= 0 && price <= maxPrice;

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(item.brand);

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category) ||
        selectedCategories.includes(item._priceCategory);

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
      <div className="women-wrapper">
        {/* Mobile Filter Button */}
        <button
          className="women-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {showFilters && (
          <div
            className="women-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`women-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="women-filter-header">
            <h2>Filters</h2>
            <button
              className="women-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="women-filter-section">
            <h3>Price (₹)</h3>

            <div className="women-single-price-range-wrapper">
              <div className="women-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>400</span>
              </div>

              <input
                type="range"
                min={0}
                max={400}
                step={10}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="women-single-price-range-input"
              />
            </div>

            <p className="women-single-price-display">
              Showing women products up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="women-filter-section">
            <h3>Brand</h3>
            <div className="women-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="women-checkbox-row">
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
          <section className="women-filter-section">
            <h3>Type</h3>
            <div className="women-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="women-checkbox-row">
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
          <section className="women-filter-section">
            <h3>Category</h3>
            <div className="women-checkbox-list">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="women-checkbox-row">
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

          <button className="women-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="women-main">
          <div className="women-top-bar">
            <div>
              <h1>Women</h1>
              <p className="women-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="women-sort-section">
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
              <div className="women-no-results">
                No women products match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="women-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/women/${item.id}`, { state: item })
                  }
                >
                  
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "women" });
                    }}
                  >
                    {isInWishlist(item.id, "women") ? (
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

export default Womenpage;
