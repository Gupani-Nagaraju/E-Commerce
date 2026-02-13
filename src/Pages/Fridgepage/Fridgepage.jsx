
import React, { useState } from "react";
import { fridgeData } from "../../stores/data/fridge";
import Pagination from "../../Components/ProductGrid/Pagination";
import { useNavigate } from "react-router-dom";
import "./Fridgepage.css";
import Header from "../../Components/Navbar/Header";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const BRAND_OPTIONS = ["LG", "Samsung", "Whirlpool", "Bosch", "Haier", "GE"];


const TYPE_OPTIONS = [
  "CoolFrost 5000",
  "FridgeMaster Pro",
  "ChillZone 300",
  "CoolMist XL",
  "FreezeGuard 800",
  "SmartCool+",
];

const Fridgepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
 
  const [maxPrice, setMaxPrice] = useState(4000);
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

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setMaxPrice(4000);
    setCurrentPage(1);
  };

  // FILTER
  const filteredProducts = fridgeData.filter((item) => {
    const price = Number(item.price); 

    const matchesPrice = price >= 0 && price <= maxPrice;

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);

    
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(item.model);

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
      <div className="fridge-wrapper">
        {/* Mobile filter button */}
        <button
          className="fridge-mobile-filter-btn"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          ☰ Filters
        </button>

        {/* Overlay */}
        {showFilters && (
          <div
            className="fridge-filters-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`fridge-filter-sidebar ${showFilters ? "open" : ""}`}>
          <div className="fridge-filter-header">
            <h2>Filters</h2>
            <button
              className="fridge-close-filter"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <section className="fridge-filter-section">
            <h3>Price (₹)</h3>

            <div className="fridge-single-price-range-wrapper">
              <div className="fridge-single-price-labels">
                <span>0</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                <span>4,000</span>
              </div>

              <input
                type="range"
                min={0}
                max={4000}
                step={100}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="fridge-single-price-range-input"
              />
            </div>

            <p className="fridge-single-price-display">
              Showing fridges up to ₹{maxPrice.toLocaleString("en-IN")}
            </p>
          </section>

          {/* Brand */}
          <section className="fridge-filter-section">
            <h3>Brand</h3>
            <div className="fridge-checkbox-list">
              {BRAND_OPTIONS.map((brand) => (
                <label key={brand} className="fridge-checkbox-row">
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

          {/* Type (using selected models) */}
          <section className="fridge-filter-section">
            <h3>Type</h3>
            <div className="fridge-checkbox-list">
              {TYPE_OPTIONS.map((type) => (
                <label key={type} className="fridge-checkbox-row">
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

          <button className="fridge-reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="fridge-main">
          
          <div className="fridge-top-bar">
            <div>
              <h1>Refrigerators</h1>
              <p className="fridge-results-text">
                {sortedProducts.length} results
              </p>
            </div>

            <div className="fridge-sort-section">
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
              <div className="fridge-no-results">
                No fridges match the selected filters.
              </div>
            ) : (
              currentProducts.map((item) => (
                <div
                  className="fridge-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/product/fridge/${item.id}`, { state: item })
                  }
                >
                  {/*  WISHLIST ICON */}
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({ ...item, type: "fridge" });
                    }}
                  >
                    {isInWishlist(item.id, "fridge") ? (
                      <FaHeart color="red" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>

                  <div className="pageimg">
                    <img src={item.image} alt={item.model || "Fridge"} />
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

export default Fridgepage;
