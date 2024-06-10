"use client";

import React, { useEffect, useState } from "react";
import "./wish.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any>([]);
  const [refre, setRefre] = useState<any>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { buyer } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/wishlist/userWishList/${buyer.id}`)
      .then((res) => {
        console.log(res.data[0].Products, "wishlist");
        setWishlist(res.data[0].Products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refre, buyer.id]);

  const confirmDelete = () => {
    if (productIdToDelete) {
      axios
        .delete(`http://localhost:8080/api/wishlist/del/${productIdToDelete}`)
        .then((response) => {
          console.log(response);
          setRefre(!refre);
          closeConfirmationDialog();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const openConfirmationDialog = (productId: string) => {
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmation(false);
    setProductIdToDelete(null);
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
                  <button onClick={() => openConfirmationDialog(item.id)}>Remove</button>
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

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to remove this product?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Confirm
              </button>
              <button onClick={closeConfirmationDialog} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
