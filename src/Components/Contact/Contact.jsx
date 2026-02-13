
import React from "react";
import "./Contact.css";
import Header from "../Navbar/Header";

const Contact = () => {
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
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-hero">
        <div className="contact-map-wrapper">
          <iframe
            title="map"
            className="contact-map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2649150787993!2d78.38359627494891!3d17.447030083450347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9173f9ed1017%3A0x94e6f7e8ac877dea!2svcloudnxpert!5e0!3m2!1sen!2sin!4v1770100404016!5m2!1sen!2sin"
            height="610"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="contact-card">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-title">
                <h4>Contacts Us</h4>
                <p>Get in Touch with Us</p>
              </div>

              <div className="contact-widget">
                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-location-pin"></i>
                  </div>
                  <div className="ci-text">
                    <span>Address:</span>
                    <p>
                      CAPITAL PARK <br />
                      JAIN SADGURU TOWERS <br />
                      HITECH CITY 500081 <br />
                      BESIDE RAMESHWARAM CAFE
                    </p>
                  </div>
                </div>

                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-mobile"></i>
                  </div>
                  <div className="ci-text">
                    <span>Phone:</span>
                    <p>
                      +91 9032344721 <br /> +91 9705369965
                    </p>
                  </div>
                </div>

                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-email"></i>
                  </div>
                  <div className="ci-text">
                    <span>Email:</span>
                    <p>vcloudnxperts@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 offset-lg-1">
              <div className="contact-form">
                <div className="leave-comment">
                  <h4>Leave A Comment</h4>
                  <p>
                    Our staff will call back later and answer your questions.
                  </p>

                  <form className="comment-form">
                    <div className="column">
                      <div className="col-lg-6">
                        <input type="text" placeholder="Your name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="email" placeholder="Your email" />
                      </div>
                      <div className="col-lg-12">
                        <textarea placeholder="Your message"></textarea>
                        <button type="submit" className="site-btn">
                          Send message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
