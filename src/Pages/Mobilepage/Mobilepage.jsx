import React, { useState } from "react";
import { mobileData } from "../../stores/data/mobiles";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Mobilepage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BRAND_OPTIONS = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Realme",
];

const TYPE_OPTIONS = [
  "A78",
  "Nord",
  "M 13 5G",
  "Y 16 5G",
  "Note 11S",
  "Spark 10 5G",
  "Keypad",
];

const Mobilepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
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

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setMaxPrice(2000);
    setCurrentPage(1);
  };

  const filteredProducts = mobileData.filter((item) => {
    const price = Number(item.price);

    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.company);

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes((item.model || "").trim());

    return matchesPrice && matchesBrand && matchesType;
  });

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

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <Header />
      <div className="mobile-wrapper">
        <button
          className="mobile-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {showFilters && (
          <div
            className="mobile-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        <aside className={`mobile-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="mobile-filter-header">
            <h2>Filters</h2>
            <button
              className="mobile-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          <section className="mobile-filter-section">
            <h3>Price (₹)</h3>

            <div className="mobile-single-price-range-wrapper">
              <div className="mobile-single-price-labels">
                <span>0</span>
                <span> ₹{maxPrice.toLocaleString("en-US")}</span>
                <span>2,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="mobile-single-price-range-input"
              />
            </div>

            <p className="mobile-single-price-display">
              Showing mobiles up to ${maxPrice.toLocaleString("en-US")}
            </p>
          </section>

          <section className="mobile-filter-section">
            <h3>Brand</h3>
            <div className="mobile-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="mobile-checkbox-row">
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

          <section className="mobile-filter-section">
            <h3>Model</h3>
            <div className="mobile-checkbox-list">
              {TYPE_OPTIONS.map((model) => (
                <label key={model} className="mobile-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(model)}
                    onChange={() => toggleType(model)}
                  />
                  <span>{model}</span>
                </label>
              ))}
            </div>
          </section>

          <button className="mobile-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        <main className="mobile-main">
          <div className="mobile-top-bar">
            <div>
              <h1>Mobiles</h1>
              <p className="mobile-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="mobile-sort-section">
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
            {currentProducts.length === 0 ? (
              <div className="mobile-no-results">
                No mobiles match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="mobile-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/mobile/${item.id}`, { state: item })
                  }
                >
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "mobile" });
                    }}
                  >
                    {isInWishlist(item.id, "mobile") ? (
                      <FaHeart color="red" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>

                  <div className="pageimg">
                    <img
                      src={item.image}
                      alt={item.model || "Mobile Product"}
                    />
                  </div>

                  <div className="promodel">
                    {item.company} {item.model}
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

export default Mobilepage;
