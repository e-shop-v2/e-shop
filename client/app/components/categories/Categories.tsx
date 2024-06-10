"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLaptop,
  faClock,
  faCamera,
  faHeadphones,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./cats.css";
import { useRouter } from "next/navigation";
// import StarRating from '.././rating';
const Categories = () => {
  const router =useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductsByCategory = (category: any) => {
    setSelectedCategory(category);
    setProducts([]);
    axios
      .get(`http://localhost:8080/api/products/category/${category}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products", error);
      });
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

    const handleImageClick = (id:number) => {
      router.push(`/components/productList/${id}`);
    };

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);
  return (
    <div className="bouallug-categories">
      <div className="bouallug-category-heading">
        <img
          src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png"
          alt="IPS LCD Gaming Monitor"
        />
        <h2>Categories</h2>
      </div>
      <h1 className="bouallug-title-category">Browse By Category</h1>
      <div className="bouallug-category-list">
        {[
          "Phones",
          "Computers",
          "SmartWatch",
          "Camera",
          "HeadPhones",
          "Gaming",
        ].map((category) => (
          <div
            key={category}
            className={`bouallug-category ${
              selectedCategory === category ? "selected" : ""
            }`}
            onClick={() => fetchProductsByCategory(category)}
          >
            <FontAwesomeIcon
              icon={
                category === "Phones"
                  ? faMobileAlt
                  : category === "Computers"
                  ? faLaptop
                  : category === "SmartWatch"
                  ? faClock
                  : category === "Camera"
                  ? faCamera
                  : category === "HeadPhones"
                  ? faHeadphones
                  : faGamepad
              }
            />
            <span>{category}</span>
          </div>
        ))}
      </div>
      <div className="bouallug-product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bouallug-product"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleImageClick(product.id)}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              {/* <StarRating /> */}
            </div>
          ))
        ) : (
          <p onClick={() => fetchProductsByCategory(selectedCategory)}>
            No products available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
