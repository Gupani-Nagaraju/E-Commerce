import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const getTotalQuantity = (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  /* Add to cart (max 100 items total) */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const currentTotal = getTotalQuantity(prev);

      if (currentTotal + 1 > 100) {
        alert("You can add up to 100 items in the cart only.");
        return prev;
      }

      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* Increase quantity (max 100 total) */
  const increaseQty = (id) => {
    setCartItems((prev) => {
      const currentTotal = getTotalQuantity(prev);
      if (currentTotal + 1 > 100) {
        alert("You can add up to 100 items in the cart only.");
        return prev;
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
