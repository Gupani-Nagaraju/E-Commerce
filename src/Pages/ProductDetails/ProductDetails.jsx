import React from "react";
import { useLocation, useParams } from "react-router-dom";

import ProductInfoSection from "../../Components/ProductInfoSection/ProductInfoSection";
import ProductImageGallery from "../../Components/ProductImageGallery/ProductImageGallery";

import { acData } from "../../stores/data/ac";
import { speakerData } from "../../stores/data/speaker";
import { tvData } from "../../stores/data/tv";
import { menData } from "../../stores/data/men";
import { womanData } from "../../stores/data/woman";
import { watchData } from "../../stores/data/watch";
import { furnitureData } from "../../stores/data/furniture";
import { booksData } from "../../stores/data/books";

import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  let product = location.state;

  if (!product) {
    product =
      acData.find((p) => p.id === id) ||
      speakerData.find((p) => p.id === id) ||
      tvData.find((p) => p.id === id) ||
      menData.find((p) => p.id === id) ||
      womanData.find((p) => p.id === id) ||
      watchData.find((p) => p.id === id) ||
      furnitureData.find((p) => p.id === id) ||
      booksData.find((p) => p.id === id);
  }

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="details-page">
      <div className="product-big-card">
        
        <div className="bigcard-image">
          <ProductImageGallery
            images={product.images || [product.image]}
          />
        </div>

        {/* RIGHT : INFO */}
        <div className="bigcard-info">
          <ProductInfoSection product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
