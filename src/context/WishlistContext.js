import React, { createContext, useContext, useEffect, useState } from "react";
 
const WishlistContext = createContext();
 
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);
 
  
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
 
  // Toggle wishlist (id + type)
  const toggleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id && item.type === product.type
    );
 
    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => !(item.id === product.id && item.type === product.type)
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };
 
  
  const isInWishlist = (id, type) => {
    return wishlist.some((item) => item.id === id && item.type === type);
  };
 
  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
 
export const useWishlist = () => useContext(WishlistContext);
 