import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
 
import { mobileData } from "../../stores/data/mobiles";
import { computerData } from "../../stores/data/computers";
import { menData } from "../../stores/data/men";
import { womanData } from "../../stores/data/woman";
import { watchData } from "../../stores/data/watch";
 
import { FaHeart, FaRegHeart } from "react-icons/fa";
 
import "./Categorygrid.css";
 
const Categorygrid = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
 
  const [showToast, setShowToast] = useState(false);
 
  const handleNavigate = (category, item) => {
    navigate(`/${category}/${item.id}`, { state: { product: item } });
  };
 
  const handleViewAll = (category) => {
    navigate(`/${category}`);
  };
 
  const renderCard = (item, category, brandKey, type) => (
    <div
      className="product-card"
      key={item.id}
      onClick={() => handleNavigate(category, item)}
    >
      {/* WISHLIST ICON */}
      <button
        className="wishlist-icon"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist({ ...item, type });
        }}
      >
        {isInWishlist(item.id, type) ? (
          <FaHeart color="red" size={18} />
        ) : (
          <FaRegHeart size={18} />
        )}
      </button>
 
      <div className="imgbox">
        <img src={item.image} alt={item.name} className="pro-image" />
      </div>
 
      <h4 className="product-brand">{item[brandKey]}</h4>
      <p className="product-price">₹{item.price}</p>
 
      <button
        className="add-to-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(item);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
 
  return (
    <div className="Main-sectioncategory">
 
      {/* Mobiles */}
      <div className="category">
        <h2 className="category-title">Mobiles</h2>
        <div className="mobiles-grid">
          {mobileData.slice(0, 5).map((item) =>
            renderCard(item, "mobiles", "company", "mobile")
          )}
        </div>
        <button className="view-all-btn" onClick={() => handleViewAll("mobiles")}>
          View All →
        </button>
      </div>
 
      {/* Computers */}
      <div className="category">
        <h2 className="category-title">Computers</h2>
        <div className="mobiles-grid">
          {computerData.slice(0, 5).map((item) =>
            renderCard(item, "computers", "company", "computer")
          )}
        </div>
        <button className="view-all-btn" onClick={() => handleViewAll("computerpage")}>
          View All →
        </button>
      </div>
 
      {/* Men */}
      <div className="category">
        <h2 className="category-title">Men Collection</h2>
        <div className="mobiles-grid">
          {menData.slice(0, 5).map((item) =>
            renderCard(item, "men", "brand", "men")
          )}
        </div>
        <button className="view-all-btn" onClick={() => handleViewAll("menpage")}>
          View All →
        </button>
      </div>
 
      {/* Women */}
      <div className="category">
        <h2 className="category-title">Women Collection</h2>
        <div className="mobiles-grid">
          {womanData.slice(0, 5).map((item) =>
            renderCard(item, "women", "brand", "women")
          )}
        </div>
        <button className="view-all-btn" onClick={() => handleViewAll("womenpage")}>
          View All →
        </button>
      </div>
 
      {/* Watches */}
      <div className="category">
        <h2 className="category-title">Watches</h2>
        <div className="mobiles-grid">
          {watchData.slice(0, 5).map((item) =>
            renderCard(item, "watches", "brand", "watch")
          )}
        </div>
        <button className="view-all-btn" onClick={() => handleViewAll("watchpage")}>
          View All →
        </button>
      </div>
 
      {/* TOAST */}
      {showToast && (
        <div className="cart-toast">
          ✅ Item added to cart successfully
        </div>
      )}
    </div>
  );
};
 
export default Categorygrid;
 
 