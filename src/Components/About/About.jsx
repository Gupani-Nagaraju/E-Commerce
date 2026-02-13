// About.jsx
import React from "react";
import "./About.css";
import Header from "../Navbar/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href="/">
                  <i className="fa fa-home"></i> Home
                </a>
                <span>About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="about-title">
                <h2>About Us</h2>
                <p>Who We Are</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="about-content text-center">
                <p>
                  <b>DailyDealsShip</b> is a trusted destination for customised
                  corporate gifts, paintings, desktops, pens, calculators and
                  accessories.
                </p>

                <p>
                  We specialize in bulk and customised corporate orders for
                  offices, events, promotions and gifting needs. Our goal is to
                  deliver high-quality products with timely service and complete
                  customer satisfaction.
                </p>

                <p>
                  With years of experience and a dedicated team, we proudly
                  serve customers across India, building long-term
                  relationships through trust and quality.
                </p>

                <p>
                  DailyDealsShip offers a wide range of customization options to
                  suit different branding and promotional requirements. From
                  concept to delivery, we ensure a smooth and reliable ordering
                  process for every client.
                </p>

                <p>
                  We focus on maintaining strict quality standards and work
                  closely with trusted suppliers to provide durable and premium
                  products. Each order is carefully checked before dispatch to
                  meet customer expectations.
                </p>

                <p>
                  Our team understands the importance of deadlines and ensures
                  timely delivery for all projects, whether small or large. We
                  also provide flexible solutions based on budget and specific
                  business needs.
                </p>

                <p>
                  Customer satisfaction is our top priority, and we believe in
                  transparent communication and long-term partnerships. Through
                  continuous improvement and innovation, we aim to become a
                  leading name in corporate gifting and promotional solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="row about-highlights">
            <div className="col-lg-4">
              <div className="about-box">
                <h5>Quality Products</h5>
                <p>Premium materials and reliable brands.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-box">
                <h5>Timely Delivery</h5>
                <p>On-time delivery for all bulk &amp; custom orders.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-box">
                <h5>Customer Support</h5>
                <p>Dedicated support for every order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
