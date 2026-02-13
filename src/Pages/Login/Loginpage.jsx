import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import usersData from "../../stores/data/users.json";

const Loginpage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = usersData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    login(user);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your account</p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <div className="remember-wrapper">
              <label className="checkbox-row">
            <input type="checkbox"/>
              <span>Remember me</span>
            </label>
            </div>

            <span
              className="forgot-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?
            <span
              className="signup-link"
              onClick={() => navigate("/registrationpage")}
            >
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
