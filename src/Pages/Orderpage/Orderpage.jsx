import React from "react";
import "./Orderpage.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Orderpage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    alert("✅ Order Placed Successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="order-page">
      <h2 className="order-title">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="empty">No items to order</p>
      ) : (
        <>
          <div className="order-list">
            {cartItems.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.model} />

                <div className="order-info">
                  <h4>{item.company} {item.model}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total: ${totalAmount}</h3>
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orderpage;
