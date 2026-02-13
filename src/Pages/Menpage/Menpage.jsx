import React, { useState } from "react";
import { menData } from "../../stores/data/men";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Menpage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Filter options (subset from menData)
const BRAND_OPTIONS = [
  "Nike",
  "Calvin Klein",
  "Levi's",
  "Ralph Lauren",
  "Adidas",
  "Hugo Boss",
];

const TYPE_OPTIONS = [
  "T-Shirt",
  "Dress Shirt",
  "Jeans",
  "Polo Shirt",
  "Jacket",
  "Hoodie",
  "Suit",
];

const Menpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  // single slider: 0 → 600
  const [maxPrice, setMaxPrice] = useState(600);
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

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setMaxPrice(600);
    setCurrentPage(1);
  };

  // FILTER
  const filteredProducts = menData.filter((item) => {
    const price = Number(item.price); // "29.99" → 29.99

    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(item.type);

    return matchesPrice && matchesBrand && matchesType;
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
      <div className="men-wrapper">
        {/* Mobile Filter Button */}
        <button
          className="men-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="men-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`men-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="men-filter-header">
            <h2>Filters</h2>
            <button
              className="men-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="men-filter-section">
            <h3>Price (₹)</h3>

            <div className="men-single-price-range-wrapper">
              <div className="men-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>600</span>
              </div>

              <input
                type="range"
                min={0}
                max={600}
                step={20}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="men-single-price-range-input"
              />
            </div>

            <p className="men-single-price-display">
              Showing menswear up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="men-filter-section">
            <h3>Brand</h3>
            <div className="men-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="men-checkbox-row">
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
          <section className="men-filter-section">
            <h3>Type</h3>
            <div className="men-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="men-checkbox-row">
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

          <button className="men-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="men-main">
          {/* Top bar: title left, sort right */}
          <div className="men-top-bar">
            <div>
              <h1>Menswear</h1>
              <p className="men-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="men-sort-section">
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

          {/* Products Grid */}
          <div className="pagesection">
            {currentProducts.length === 0 ? (
              <div className="men-no-results">
                No menswear items match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="men-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/men/${item.id}`, { state: item })
                  }
                >
                  {/* WISHLIST ICON */}
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "men" });
                    }}
                  >
                    {isInWishlist(item.id, "men") ? (
                      <FaHeart color="red" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>

                  <div className="pageimg">
                    <img
                      src={item.image}
                      alt={item.model || "Men's Product"}
                    />
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

export default Menpage;
