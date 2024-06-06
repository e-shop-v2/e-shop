"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./one.css";
const one = () => {
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const pathname = usePathname();
  console.log("id => ", pathname.slice(pathname.length - 1));
  const id = pathname.slice(pathname.length - 1);
  useEffect(() => {
    if (id) {
      console.log(id, "in the get");

      axios
        .get(`http://localhost:8080/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log("Error fetching the product:", error);
        });
    }
  }, [id]);
  return (
    <div>
      <div className="new-product-page">
        <div className="new-product-container">
          <div className="new-product-images">
            <img src={product.image} alt="" />
            <img src={product.image1} alt="" />
            <img src={product.image2} alt="" />
            <img src={product.image3} alt="" />
          </div>
          <div className="new-product-main-image">
            <img src={product.image} alt=" " />
          </div>
          <div className="new-product-details">
            <h1>{product.name}</h1>
            <div className="new-product-rating">
              {/* <StarRating /> (150 Reviews) <span className="new-in-stock">In Stock</span> */}
            </div>
            <div className="new-product-price">${product.price}</div>
            <div className="new-product-description">{product.description}</div>
            <div className="new-product-options">
              <div className="new-product-colors">
                <label>Colours:</label>
                <button className="new-color-option new-color-red"></button>
                <button className="new-color-option new-color-black"></button>
              </div>
              <div className="new-product-sizes">
                <label>Size:</label>
                <button className="new-size-option">XS</button>
                <button className="new-size-option">S</button>
                <button className="new-size-option">M</button>
                <button className="new-size-option">L</button>
                <button className="new-size-option">XL</button>
              </div>
              <div className="new-product-quantity">
                <label>Quantity:</label>
                <div className="new-quantity-controls">
                  <button
                    className="new-quantity-button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input type="text" value={quantity} readOnly />
                  <button
                    className="new-quantity-button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              className="new-buy-now-button"
              //  onClick={() => butnow(product)}
            >
              Buy Now
            </button>
            <div className="new-delivery-info">
              <div>
                Free Delivery{" "}
                <span>Enter your postal code for Delivery Availability</span>
              </div>
              <div>
                Return Delivery{" "}
                <span>Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{/* <RelatedItems category={product.category} /> */}</div>
    </div>
  );
};

export default one;
