import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      tag: "BIG DAYS",
      title: "We do customised corporate orders",
      desc: "Authentic handmade gifts crafted with care.",
      saleText: "SALE 50%",
      image: "/img/image.png"
    },
    {
      id: 2,
      tag: "SPECIAL OFFER",
      title: "Beautiful handmade gifts",
      desc: "Premium handcrafted decor items for your special occasions.",
      saleText: "SALE 40%",
      image: "/img/image1.png"
    },
    {
      id: 3,
      tag: "HOT DEALS",
      title: "Exclusive home decor items",
      desc: "Unique designer items for your home and office.",
      saleText: "SALE 30%",
      image: "/img/image2.png"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // SHOP NOW click handler
  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <section className="hero-wrapper">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          
          <div className="hero-left">
            <span className="tag">{slide.tag}</span>
            <h1>{slide.title}</h1>
            <p>{slide.desc}</p>

            
            <button className="btn-purple" onClick={handleShopNow}>
              SHOP NOW
            </button>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hero-right">
            <div className="image-bg-circle"></div>
            <div className="sale-badge">{slide.saleText}</div>
            <img src={slide.image} alt="Slide" />
          </div>
        </div>
      ))}

      {/* ARROWS */}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>
    </section>
  );
};

export default HeroBanner;
