// Header.jsx
import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import SearchResults from "../SearchResults/SearchResults";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GiInfo } from "react-icons/gi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { allProducts } from "../../stores/data/allProducts";

const categories = [
  { label: "AC", path: "/acpage" },
  { label: "Books", path: "/bookspage" },
  { label: "Computers", path: "/computerpage" },
  { label: "Fridge", path: "/fridgepage" },
  { label: "Furniture", path: "/furniturepage" },
  { label: "Kitchen", path: "/kitchenepage" },
  { label: "Men", path: "/menpage" },
  { label: "Mobiles", path: "/mobiles" },
  { label: "Speaker", path: "/speakerpage" },
  { label: "TV", path: "/tvpage" },
  { label: "Watch", path: "/watchpage" },
  { label: "Women", path: "/womenpage" },
];

function Header() {
  const navigate = useNavigate();
  const [categoryPath, setCategoryPath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const [showProfile, setShowProfile] = useState(false);

  const handleCategoryChange = (e) => {
    const path = e.target.value;
    setCategoryPath(path);
    if (path !== "") {
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearchSubmit = (term) => {
    const t = term.trim().toLowerCase();
    if (!t) return;

    if (["mobile", "mobiles", "phone", "phones"].includes(t)) {
      navigate("/mobiles");
      return;
    }
    if (["men", "mens", "men clothing", "men clothes"].includes(t)) {
      navigate("/menpage");
      return;
    }
    if (["women", "womens", "women clothing", "women clothes"].includes(t)) {
      navigate("/womenpage");
      return;
    }
    if (["tv", "tvs", "television"].includes(t)) {
      navigate("/tvpage");
      return;
    }
    if (["speaker", "speakers"].includes(t)) {
      navigate("/speakerpage");
      return;
    }
    if (["watch", "watches"].includes(t)) {
      navigate("/watchpage");
      return;
    }
    if (["kitchen", "kitchen appliances", "kitchen items"].includes(t)) {
      navigate("/kitchenepage");
      return;
    }
    if (["ac", "air conditioner", "airconditioner"].includes(t)) {
      navigate("/acpage");
      return;
    }
    if (["book", "books"].includes(t)) {
      navigate("/bookspage");
      return;
    }
    if (["computer", "computers", "laptop", "laptops", "pc"].includes(t)) {
      navigate("/computerpage");
      return;
    }
    if (["fridge", "refrigerator", "fridges", "refrigerators"].includes(t)) {
      navigate("/fridgepage");
      return;
    }
    if (["furniture", "sofa", "chair", "table"].includes(t)) {
      navigate("/furniturepage");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleSelectItem = (item) => {
    const section = (item._section || "").toLowerCase();

    if (section === "mobiles" || section === "mobile") {
      navigate(`/product/mobile/${item.id}`, { state: item });
    } else if (section === "men") {
      navigate(`/product/men/${item.id}`, { state: item });
    } else if (section === "women") {
      navigate(`/product/women/${item.id}`, { state: item });
    } else if (section === "tv") {
      navigate(`/product/tv/${item.id}`, { state: item });
    } else if (section === "speakers" || section === "speaker") {
      navigate(`/product/speaker/${item.id}`, { state: item });
    } else if (section === "watches" || section === "watch") {
      navigate(`/product/watch/${item.id}`, { state: item });
    } else if (section === "kitchen") {
      navigate(`/product/kitchen/${item.id}`, { state: item });
    } else if (section === "ac") {
      navigate(`/product/ac/${item.id}`, { state: item });
    } else if (section === "books" || section === "book") {
      navigate(`/product/books/${item.id}`, { state: item });
    } else if (section === "computer" || section === "computers") {
      navigate(`/product/computer/${item.id}`, { state: item });
    } else if (section === "fridge" || section === "refrigerator") {
      navigate(`/product/fridge/${item.id}`, { state: item });
    } else if (section === "furniture") {
      navigate(`/product/furniture/${item.id}`, { state: item });
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <header className="navbar-wrapper">
      {/* TOP BAR */}
      <div className="nav-top-bar">
        <div className="nav-top-left">
          <span>vcloudnxperts@gmail.com</span>
          <span className="sep">|</span>
          <span>+91 7093541427 | +91 8978541427</span>
        </div>
        <div className="nav-top-right">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Facebook page"
          >
            f
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Twitter profile"
          >
            t
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our LinkedIn profile"
          >
            in
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Pinterest profile"
          >
            p
          </a>
        </div>
      </div>

      {/* MIDDLE BAR */}
      <div className="nav-middle-bar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <img
            src="/img/logo.png"
            alt="DailyDealsShip Logo"
            className="header-img-logo"
          />
          <span className="header-logo-text"></span>
        </div>

        <div className="nav-search-box">
          <SearchResults
            data={allProducts}
            onSubmit={handleSearchSubmit}
            onSelectItem={handleSelectItem}
            placeholder="What do you need?"
          />
        </div>

        <div className="nav-right-icons">
          <button
            type="button"
            className="nav-wishlist-wrapper"
            onClick={handleWishlistClick}
          >
            <FaRegHeart className="nav-wishlist-icon" />
            {wishlistCount > 0 && (
              <span className="nav-cart-badge">{wishlistCount}</span>
            )}
          </button>

          <button
            type="button"
            className="nav-cart-wrapper"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="nav-cart-icon" />
            {cartCount > 0 && (
              <span className="nav-cart-badge">{cartCount}</span>
            )}
          </button>

          <span className="nav-price">Rs.{cartTotal}</span>

          {user ? (
            <div className="nav-profile-wrapper">
              <div
                className="nav-profile-circle"
                onClick={() => setShowProfile(!showProfile)}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {showProfile && (
                <div className="nav-profile-dropdown">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfile(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span
              className="nav-login-link"
              onClick={() => navigate("/Loginpage")}
            >
              Login
            </span>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <nav className="nav-bottom-bar">
        <div className="nav-left-block">
          <button className="nav-menu-btn" onClick={toggleMobileMenu}>
            ☰
          </button>

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
          <li onClick={() => handleNavClick("/")}>
            <IoHomeOutline /> HOME
          </li>
          <li onClick={() => handleNavClick("/shop")}>
            <MdOutlineShoppingBag /> SHOP
          </li>
          <li onClick={() => handleNavClick("/about")}>
            <GiInfo /> ABOUT US
          </li>
          <li onClick={() => handleNavClick("/contact")}>
            <FiPhone /> CONTACT US
          </li>
        </ul>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`mobile-nav-drawer ${
          isMobileMenuOpen ? "mobile-nav-drawer--open" : ""
        }`}
      >
        <button
          className="mobile-nav-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="mobile-nav-section">
          <h4 className="mobile-nav-heading">All Categories</h4>
          <ul className="mobile-nav-categories">
            {categories.map((cat) => (
              <li key={cat.path} onClick={() => handleNavClick(cat.path)}>
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
