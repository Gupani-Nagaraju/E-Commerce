import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cartpage.css";

const Cartpage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty</h2>;
  }

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const goToCheckout = () => {
    navigate("/checkoutpage", { state: { cartItems } });
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.map((item, index) => (
        <div className="cart-card" key={index}>
          {/* image + item badge */}
          <div className="cart-image">
            <span className="cart-item-label">Item {index + 1}</span>
            <img src={item.image} alt={item.model} />
          </div>

          <div className="cart-info">
            <h3>
              {item.company} {item.model}
            </h3>

            <p className="category">
              <strong>Category:</strong> {item.category}
            </p>

            <p className="description">
              <strong>Description:</strong> {item.description}
            </p>

            <p>
              <strong>Variant:</strong> {item.variant}
            </p>

            <p>
              <strong>Price:</strong> ₹{Number(item.price).toFixed(2)}
            </p>

            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>

            <h4 className="total">
              Total: ₹{(item.price * item.quantity).toFixed(2)}
            </h4>
          </div>
        </div>
      ))}

      <div className="cart-footer">
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button className="checkout-btn" onClick={goToCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cartpage;
