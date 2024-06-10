"use client";

import React, { useEffect, useState } from "react";
import "./wish.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any>([]);
  const [refre, setRefre] = useState<any>(false);
  const router = useRouter();
  const { buyer } = useAuth();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/wishlist/userWishList/${buyer.id}`)
      .then((res) => {
        console.log(res.data[0].Products,"wishlist");
        setWishlist(res.data[0].Products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refre, buyer.id]);
  const remove = (productId) => {
    axios
      .delete(`http://localhost:8080/api/wishlist/del/${productId}`)
      .then((response) => {
        console.log(response);
        setRefre(!refre);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div className="favorites-container">
        <table className="favorites-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, index) => (
              <tr key={index}>
                <td className="product-details">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <span className="product-name">
                    <b>{item.name}</b>
                  </span>
                </td>
                <td>
                  <b>{item.price} $</b>
                </td>
                <td>
                  <button onClick={() => remove(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="favorites-actions">
          <button className="return-shop" onClick={() => router.push("/")}>
            Return to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
