// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <Link to="/" className="footer-logo-link">
              <img
                src="/img/logo.png"
                alt="DailyDealsShip"
                className="footer-logo-img"
              />
              <span className="footer-logo-text">DAILYDEALSSHIP</span>
            </Link>
          </div>

          <p className="footer-address">
            <strong>Address:</strong> C 1 DIAMOND TOWERS <br />
            S D ROAD SECUNDERABAD <br />
            500003 BESIDE BELSON <br />
            TAJ HOTEL
          </p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Facebook page"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Instagram profile"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Twitter profile"
            >
              <FaTwitter />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Pinterest profile"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Information</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/checkoutpage">Checkout</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>My Account</h3>
          <ul>
            <li>
              <Link to="/loginpage">My Account</Link>
            </li>
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">wishlist</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Join Our Newsletter Now</h3>
          <p>Get E-mail updates about our latest shop and special offers.</p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter Your Mail" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©2025 All rights reserved</p>
      </div>
    </footer>
  );
}
