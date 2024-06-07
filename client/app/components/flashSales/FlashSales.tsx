"use client"
import React, { useState, useEffect } from "react";
import "./flash.css";

const FlashSales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8080/api/products/getAll");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

 
  }, []);

  return (
    <div>
      <h1 className="top-prod">Top Products</h1>
      <div
        className="top-label2"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png"
          alt="IPS LCD Gaming Monitor"
          style={{ width: "20px", height: "auto", marginRight: "10px" }}
        />
        <h2 className="top-subtitle">This Month</h2>
      </div>
      <div className="flash-sales">
        {data.map((el) => (
          <div className="products" key={el.id}>
            <div className="product">
              <img src={el.image} alt={el.name} />
              <h3>{el.name}</h3>
              <p className="price-color">
                <span>${el.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
