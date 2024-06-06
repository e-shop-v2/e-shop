"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./prod.css";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/getAll")
      .then((response) => {
        setProducts(response.data.slice(0, 8));
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  const handleImageClick = (id: number) => {
    //The product list folder is inside the Components folder.
    router.push(`/components/productList/${id}`), console.log("hol");
  };
  return (
    <div>
      <div
        className="top-label2"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png"
          alt="IPS LCD Gaming Monitor"
          style={{ width: "20px", height: "auto", marginRight: "10px" }}
        />
        <h2 className="top-subtitle">All Products</h2>
      </div>
      <h2 className="prod-list-title">Explore Our Products</h2>
      <div className="raslen-container">
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                onClick={() => {
                  handleImageClick(product.id);
                  console.log("hello");
                }}
                src={product.image}
                alt={product.name}
              />
              <h3>{product.name}</h3>

              <p>${product.price}</p>

              {/* <StarRating/> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
