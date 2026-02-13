import React from "react";
import "./Categorymenu.css"
import { Link } from "react-router-dom";
import {
  FaSnowflake,
  FaBook,
  FaLaptop,
  FaCouch,
  FaUtensils,
  FaMale,
  FaMobileAlt,
  FaMusic,
  FaTv,
  FaClock,
  FaFemale
} from "react-icons/fa";

const Categorymenu = () => {
  return (
    <>
      <div className="categorymenu">
        <h2>All Categories</h2>

        <ul>
          <li>
            <Link to="/acpage">
              <FaSnowflake /> AC
            </Link>
          </li>

          <li>
            <Link to="/bookspage">
              <FaBook /> Books
            </Link>
          </li>

          <li>
            <Link to="/computerpage">
              <FaLaptop /> Computers
            </Link>
          </li>

          <li>
            <Link to="/fridgepage">
              <FaSnowflake /> Fridge
            </Link>
          </li>

          <li>
            <Link to="/furniturepage">
              <FaCouch /> Furniture
            </Link>
          </li>

          <li>
            <Link to="/kitchenepage">
              <FaUtensils /> Kitchen
            </Link>
          </li>

          <li>
            <Link to="/menpage">
              <FaMale /> Men
            </Link>
          </li>

          <li>
            <Link to="/mobiles">
              <FaMobileAlt /> Mobiles
            </Link>
          </li>

          <li>
            <Link to="/speakerpage">
              <FaMusic /> Speaker
            </Link>
          </li>

          <li>
            <Link to="/tvpage">
              <FaTv /> TV
            </Link>
          </li>

          <li>
            <Link to="/watchpage">
              <FaClock /> Watch
            </Link>
          </li>

          <li>
            <Link to="/womenpage">
              <FaFemale /> Women
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Categorymenu;
