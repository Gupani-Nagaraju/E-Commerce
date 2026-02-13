// src/Pages/CheckoutPage/CheckoutPage.jsx
import React, { useState, useMemo } from "react";
import "./CheckoutPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // array of items sent from Cartpage
  const cartItemsFromLocation = location.state?.cartItems || [];

  const cartItems = useMemo(() => cartItemsFromLocation, [cartItemsFromLocation]);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street1: "",
    street2: "",
    zip: "",
    city: "",
    email: "",
    phone: "",
    createAccount: false,
  });

  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBilling((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    // simulate placing order, then go to success page
    setTimeout(() => {
      navigate("/order-success");
    }, 2000);
  };

  // subtotal & total from cart with 2 decimals
  const { subtotal, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const fixed = Number(sub.toFixed(2));
    return { subtotal: fixed, total: fixed }; // add shipping/tax to total if needed
  }, [cartItems]);

  return (
    <section className="checkout-page">
      <form className="checkout-layout" onSubmit={handleSubmit}>
        {/* BILLING CARD */}
        <div className="card billing-card">
          <div className="checkout-login">
            <a href="/Loginpage">Click Here To Login</a>
          </div>

          <h3>Billing Details</h3>

          {/* FIRST & LAST NAME */}
          <div className="row-2">
            <div>
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={billing.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={billing.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Company</label>
          <input
            type="text"
            name="company"
            value={billing.company}
            onChange={handleChange}
          />

          <label>Country *</label>
          <input
            type="text"
            name="country"
            value={billing.country}
            onChange={handleChange}
            required
          />

          <label>Street Address *</label>
          <input
            type="text"
            name="street1"
            placeholder="Street address"
            value={billing.street1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street2"
            placeholder="Apartment, suite, unit (optional)"
            value={billing.street2}
            onChange={handleChange}
          />

          {/* ZIP & CITY */}
          <div className="row-2">
            <div>
              <label>ZIP</label>
              <input
                type="text"
                name="zip"
                value={billing.zip}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={billing.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* EMAIL & PHONE */}
          <div className="row-2">
            <div>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={billing.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={billing.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* CREATE ACCOUNT */}
          <label className="create-account">
            <input
              type="checkbox"
              name="createAccount"
              checked={billing.createAccount}
              onChange={handleChange}
            />
            Create an account?
          </label>
        </div>

        {/* ORDER SUMMARY CARD */}
        <div className="card order-card">
          <h3>Your Order</h3>

          <input
            className="coupon-input"
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          <ul className="order-list">
            <li className="order-list-header">
              <span>Product</span>
              <span>Total</span>
            </li>

            {cartItems.map((item, index) => (
              <li key={index}>
                <span>
                  {item.company} {item.model} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}

            <li>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </li>

            <li className="total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </li>
          </ul>

          <div className="payment">
            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              Paypal
            </label>
          </div>

          <button className="place-btn" type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <p className="checkout-safe-text">🔒 Safe & Secure Payments</p>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
