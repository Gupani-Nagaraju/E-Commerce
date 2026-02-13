import React from "react";
import "./Registrationpage.css";

const Registrationpage = () => {
  return (
    <div className="registrationpage">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and get started</p>

        <form className="register-form">
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Confirm Password" required />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="signin-text">
          Already have an account?
          <a href="/loginPage"> Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Registrationpage;
