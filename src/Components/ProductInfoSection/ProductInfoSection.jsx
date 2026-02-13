import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductInfoSection.css";
 
const ProductInfoSection = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
 
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(
    product?.variants?.[0] || "Default"
  );
 
  
  const basePrice = Math.round(Number(product.price));
  const totalPrice = Math.round(basePrice * quantity);
 
  // ADD TO CART HANDLER
  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      price: basePrice,
      quantity,
      variant,
      totalPrice,
    };
 
    addToCart(cartItem);
    navigate("/cart");
  };
 
  
  const handleBuyNow = () => {
    navigate("/buy-now", {
      state: {
        product: {
          ...product,
          price: basePrice,
        },
        quantity,
        variant,
        totalPrice,
      },
    });
  };
 
  
  const brandName = product.company || product.brand;
 
  return (
    <div className="product-info">
      
      <h2 className="product-title">
        {product.title ||
          [brandName, product.model].filter(Boolean).join(" ")}
      </h2>
 
      
      {product.author && (
        <p className="product-author">by {product.author}</p>
      )}
 
      
      {brandName && (
        <p className="product-company">
          Brand: {brandName}
        </p>
      )}
 
      
      {product.model && (
        <p className="product-model">
          Model: {product.model}
        </p>
      )}
 
      
      <p className="desc">{product.description}</p>
 
      {/* Price */}
      <h3 className="price">₹ {totalPrice}</h3>
 
      
      {product.variants?.length > 0 && (
        <div className="variant">
          <label>Variant:</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            {product.variants.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      )}
 
      {/* Quantity */}
      <div className="quantity">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>
          +
        </button>
      </div>
 
      {/* Actions */}
      <div className="actions">
        <button
          className="add-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
 
        <button
          className="buy-now"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
 
export default ProductInfoSection;