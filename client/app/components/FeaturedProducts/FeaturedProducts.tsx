import React from "react";
import "./FeaturedProducts.css";
const FeaturedProducts = () => {
  return (
    <div className="featured-container">
      <div className="featured-header">
        <span className="featured-tag">Featured</span>
      </div>
      <h2>New Arrival</h2>
      <div className="featured-grid">
        <div className="featured-item large">
          <img
            src="https://www.flamingtoast.com/wp-content/uploads/2020/11/ps5_pl-greena.jpg"
            alt="PlayStation 5"
          />
          <div className="featured-text">
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
        <div className="featured-item">
          <img
            src="https://m.media-amazon.com/images/I/4104ys-ac9L._AC_.jpg"
            alt="Women's Collections"
          />
          <div className="featured-text">
            <h3>Women's Collections</h3>
            <p>Featured woman collections that give you another vibe.</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
        <div className="featured-item">
          <img
            src="https://rocknroller.tv/cdn/shop/products/845b48df95edd6855ba376665347ab2b.jpg?v=1697616032&width=1500"
            alt="Speakers"
          />
          <div className="featured-text">
            <h3>Speakers</h3>
            <p>Amazon wireless speakers</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
        <div className="featured-item">
          <img
            src="https://img.freepik.com/premium-psd/new-arrival-earbuds-headphone-product-green-black-social-media-post-banner_265571-140.jpg"
            alt="Perfume"
          />
          <div className="featured-text">
            <h3>Perfume</h3>
            <p>GUCCI INTENSE OUD EDP</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
