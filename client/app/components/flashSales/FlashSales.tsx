"use client";

import React, { useState, useEffect } from "react";
import "./flash.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
const FlashSales = () => {
  const router = useRouter();
    // const [addedToCart, setAddedToCart] = useState({});
    // const [addedToFavorites, setAddedToFavorites] = useState({});
  const { buyer } = useAuth();
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
  console.log(data);

  const addToPanier = (id: number) => {
    const data = {
      BuyerId: buyer.id,
      ProductId: id,
    };
    console.log(data);

    axios
      .post("http://localhost:8080/api/panier/usercart", data)
      .then((res) => {
        console.log("hola", res);
      })
      .catch((err) => {
        console.error("post err", err);
      });
  };
  const addToFavorites = (id: number) => {
    const data = {
      BuyerId: buyer.id,
      ProductId: id,
    };
    console.log(data);
    axios
      .post("http://localhost:8080/api/wishList/userWishList", data)
      .then((res) => {
        console.log("favorites", res);
      })
      .catch((err) => {
        console.error("post err", err);
      });
  };
  const handleImageClick = (id: number) => {
    //The product list folder is inside the Components folder.
    router.push(`/components/productList/${id}`), console.log("hol");
  };
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
        {data.map((el: any) => (
          <div className="products" key={el.id}>
            <div className="product">
              <img
                onClick={() => {
                  handleImageClick(el.id);
                  console.log("hello");
                }}
                src={el.image}
                alt={el.name}
              />
              {/* <span className="discount">{getRandomDiscount()}</span> */}
              <h3>{el.name}</h3>
              <button
                onClick={() => addToPanier(el.id)}
                disabled={addToPanier[el.id]}
              >
                {addToPanier[el.id] ? "Added to Cart" : "Add To Cart"}
              </button>
              <span className="icon-heart2" onClick={() => addToFavorites(el)}>
                ❤️
              </span>
              <p className="price-color">
                <span>${el.price}</span>
              </p>
              {/* <StarRating /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
