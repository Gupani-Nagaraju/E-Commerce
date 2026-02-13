import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BuyNowPage.css";

const BuyNowPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!state) {
    return <h2 style={{ textAlign: "center" }}>No product selected</h2>;
  }

  const { product, quantity, variant } = state;

  const basePrice = product.price * quantity;

  // ✅ discount cannot exceed price
  const discount = basePrice > 500 ? 500 : 0;
  const gst = Math.round((basePrice - discount) * 0.18);
  const total = basePrice - discount + gst;

  const placeOrder = () => {
    if (!payment) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="buynow-container">
      {/* LEFT */}
      <div className="buynow-left">
        <div className="box">
          <div className="address-header">
            <h3>Delivery Address</h3>
            <button className="link-btn">Change</button>
          </div>
          <p><b>Mahesh</b></p>
          <p>Hyderabad, Telangana - 500001</p>
          <p>Phone: 9876543210</p>
        </div>

        <div className="box product-box">
          <img src={product.image} alt={product.model} />
          <div className="product-details">
            <h4>{product.company} {product.model}</h4>
            <p>Variant: {variant}</p>
            <p>Quantity: {quantity}</p>
            <p className="delivery">Delivery by <b>Friday</b></p>
            <h3>₹ {product.price}</h3>
          </div>
        </div>

        <div className="box">
          <h3>Payment Options</h3>

          <label className="payment-option">
            <input
              type="radio"
              value="COD"
              checked={payment === "COD"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="ONLINE"
              checked={payment === "ONLINE"}
              onChange={(e) => setPayment(e.target.value)}
            />
            UPI / Card / Net Banking
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="buynow-right sticky">
        <h3>Price Details</h3>

        <div className="row">
          <span>Price ({quantity} item)</span>
          <span>₹ {basePrice}</span>
        </div>

        <div className="row">
          <span>Discount</span>
          <span className="green">- ₹ {discount}</span>
        </div>

        <div className="row">
          <span>GST (18%)</span>
          <span>₹ {gst}</span>
        </div>

        <div className="row">
          <span>Delivery</span>
          <span className="green">FREE</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total Amount</span>
          <span>₹ {total}</span>
        </div>

        <button
          className="place-order"
          disabled={loading}
          onClick={placeOrder}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <p className="safe-text">🔒 Safe & Secure Payments</p>
      </div>
    </div>
  );
};

export default BuyNowPage;
