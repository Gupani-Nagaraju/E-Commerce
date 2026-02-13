// src/Components/Navbar/Header.jsx
import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import SearchResults from "../SearchResults/SearchResults";

// product data
import { mobileData } from "../../stores/data/mobiles";
import { menData } from "../../stores/data/men";
import { womanData } from "../../stores/data/woman";
import { tvData } from "../../stores/data/tv";
import { speakerData } from "../../stores/data/speaker";
import { watchData } from "../../stores/data/watch";
import { kitchenData } from "../../stores/data/kitchen";

const allProducts = [
  ...mobileData.map((p) => ({ ...p, _section: "Mobiles" })),
  ...menData.map((p) => ({ ...p, _section: "Men" })),
  ...womanData.map((p) => ({ ...p, _section: "Women" })),
  ...tvData.map((p) => ({ ...p, _section: "TV" })),
  ...speakerData.map((p) => ({ ...p, _section: "Speakers" })),
  ...watchData.map((p) => ({ ...p, _section: "Watches" })),
  ...kitchenData.map((p) => ({ ...p, _section: "Kitchen" })),
];

function Header() {
  const navigate = useNavigate();
  const [categoryPath, setCategoryPath] = useState("");

  const handleCategoryChange = (e) => {
    const path = e.target.value;
    setCategoryPath(path);
    if (path !== "") navigate(path);
  };

  // search submit → go to /search
  const handleSearchSubmit = (term) => {
    navigate(/search?q=${encodeURIComponent(term)});
  };

  // suggestion click → direct product page
  const handleSelectItem = (item) => {
    const section = item._section?.toLowerCase() || "";

    if (section === "mobiles") {
      navigate(/product/mobile/${item.id}, { state: item });
    } else if (section === "men") {
      navigate(/product/men/${item.id}, { state: item });
    } else if (section === "women") {
      navigate(/product/women/${item.id}, { state: item });
    } else if (section === "tv") {
      navigate(/product/tv/${item.id}, { state: item });
    } else if (section === "speakers") {
      navigate(/product/speaker/${item.id}, { state: item });
    } else if (section === "watches") {
      navigate(/product/watch/${item.id}, { state: item });
    } else if (section === "kitchen") {
      navigate(/product/kitchen/${item.id}, { state: item });
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* TOP BAR */}
      <div className="nav-top-bar">
        <div className="nav-top-left">
          <span>dailydealsship.com@gmail.com</span>
          <span className="sep">|</span>
          <span>+91 9032344721 | +91 9705369965</span>
        </div>
        <div className="nav-top-right">
          <a href="#">f</a>
          <a href="#">t</a>
          <a href="#">in</a>
          <a href="#">p</a>
          <a href="/login" className="login-link">
            Login
          </a>
        </div>
      </div>

      {/* MIDDLE BAR */}
      <div className="nav-middle-bar">
        <div className="nav-logo">
          <span>DAILYDEALSSHIP</span>
        </div>

        <div className="nav-search-box">
          <select
            className="nav-category-select"
            value={categoryPath}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="/acpage">AC</option>
            <option value="/bookspage">Books</option>
            <option value="/computerpage">Computers</option>
            <option value="/fridgepage">Fridge</option>
            <option value="/furniturepage">Furniture</option>
            <option value="/kitchenepage">Kitchen</option>
            <option value="/menpage">Men</option>
            <option value="/mobiles">Mobiles</option>
            <option value="/speakerpage">Speaker</option>
            <option value="/tvpage">TV</option>
            <option value="/watchpage">Watch</option>
            <option value="/womenpage">Women</option>
          </select>

          {/* SearchResults used as search bar */}
          <SearchResults
            data={allProducts}
            onSubmit={handleSearchSubmit}
            onSelectItem={handleSelectItem}
            placeholder="What do you need?"
          />
        </div>

        <div className="nav-right-icons">
          <span className="nav-icon">♡</span>

          {/* cart icon navigates to /cart */}
          <span
            className="nav-icon nav-cart-icon"
            onClick={() => navigate("/cart")}
          >
            🛍
          </span>

          <span className="nav-price">Rs.150.00</span>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <nav className="nav-bottom-bar">
        <div className="nav-left-block">
          <button className="nav-menu-btn">☰</button>

          <select
            className="nav-bottom-category-select"
            onChange={handleCategoryChange}
            value={categoryPath}
          >
            <option value="">All Categories</option>
            <option value="/acpage">AC</option>
            <option value="/bookspage">Books</option>
            <option value="/computerpage">Computers</option>
            <option value="/fridgepage">Fridge</option>
            <option value="/furniturepage">Furniture</option>
            <option value="/kitchenepage">Kitchen</option>
            <option value="/menpage">Men</option>
            <option value="/mobiles">Mobiles</option>
            <option value="/speakerpage">Speaker</option>
            <option value="/tvpage">TV</option>
            <option value="/watchpage">Watch</option>
            <option value="/womenpage">Women</option>
          </select>
        </div>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>HOME</li>
          <li onClick={() => navigate("/shop")}>SHOP</li>
          <li onClick={() => navigate("/about")}>ABOUT</li>
          <li onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;