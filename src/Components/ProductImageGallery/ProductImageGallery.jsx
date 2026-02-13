import React, { useState } from "react";

const ProductImageGallery = ({ images }) => {
  const imgs = images && images.length ? images : ["/placeholder.png"];
  const [mainImg, setMainImg] = useState(imgs[0]);

  return (
    <div>
      {/* BIG IMAGE */}
      <img
        src={mainImg}
        alt="product"
        style={{
          width: "100%",
          height: "350px",
          objectFit: "contain",
          border: "1px solid #ddd",
        }}
      />

      {/* THUMBNAILS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {imgs.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="thumb"
            onClick={() => setMainImg(img)}
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              border: mainImg === img ? "2px solid blue" : "1px solid gray",
              padding: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
