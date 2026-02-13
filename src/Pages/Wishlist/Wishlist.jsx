import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Navbar/Header";
import "../Acpage/Acpage.css"; // reuse same card styles
 
const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
 
  return (
    <>
      <Header />
 
      <div className="acpage-main">
        <div className="top-bar">
          <h1>My Wishlist ❤️</h1>
          <p className="results-text">{wishlist.length} items</p>
        </div>
 
        {wishlist.length === 0 ? (
          <p style={{ padding: "20px" }}>Your wishlist is empty 😔</p>
        ) : (
          <div className="pagesection">
            {wishlist.map((item) => (
              <div
                className="ac-card"
                key={item.id}
                onClick={() =>
                  navigate(`/product/${item.type}/${item.id}`, { state: item })
                }
 
              >
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item); // remove/add instantly
                  }}
                >
                  ❤️
                </button>
 
                <div className="pageimg">
                  <img src={item.image} alt={item.model} />
                </div>
 
                <div className="promodel">
                  {item.company} {item.model}
                </div>
 
                <div className="price">₹ {item.price}</div>
 
                <button
                  className="buybtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${item.category}/${item.id}`, { state: item });
                  }}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
 
export default Wishlist;