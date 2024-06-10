"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./one.css";
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const One = () => {
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const { buyer } = useAuth();
  const [mainImage, setMainImage] = useState<string>("");
  const pathname = usePathname();
  const id = pathname.slice(pathname.length - 1);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setMainImage(response.data.image);
        })
        .catch((error) => {
          console.log("Error fetching the product:", error);
        });
    }
  }, [id]);

  const addToPanier = (id: number) => {
    const data = {
      BuyerId: buyer.id,
      ProductId: id,
    };

    return axios.post("http://localhost:8080/api/panier/usercart", data);
  };

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const handleBuyNow = (id: number) => {
    addToPanier(id)
      .then((res) => {
        console.log("Added to cart", res);
        toast.success("Added to Cart Successfully!");

        setTimeout(() => {
          router.push("/panier");
        }, 1500);
      })
      .catch((err) => {
        console.error("Post error", err);
        toast.error("Failed to add to cart.");
      });
  };

  return (
    <div>
      <div className="new-product-page">
        <div className="new-product-container">
          <div className="new-product-images">
            {product.image && (
              <>
                <img
                  src={product.image}
                  alt=""
                  onClick={() => handleImageClick(product.image)}
                />
                <img
                  src={product.image1}
                  alt=""
                  onClick={() => handleImageClick(product.image1)}
                />
                <img
                  src={product.image2}
                  alt=""
                  onClick={() => handleImageClick(product.image2)}
                />
                <img
                  src={product.image3}
                  alt=""
                  onClick={() => handleImageClick(product.image3)}
                />
              </>
            )}
          </div>
          <div className="new-product-main-image">
            <img src={mainImage} alt="Main Product" />
          </div>
          <div className="new-product-details">
            <h1>{product.name}</h1>
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
              onClick={() => handleBuyNow(product.id)}
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
      <ToastContainer />
    </div>
  );
};

export default One;
