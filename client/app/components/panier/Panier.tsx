  "use client";
import React, { useEffect, useState } from "react";
import "./Panier.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Panier = () => {
  const [panier, setPanier] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [refre, setRefre] = useState<any>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); 
  const { buyer } = useAuth();
  const router = useRouter();
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null); 
  const [couponInput, setCouponInput] = useState<string>(""); // coupon input name 
  const [discountPercentage, setDiscountPercentage] = useState<number>(0); // store percentage
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false); // track if coupon is applied

  useEffect(() => {
    console.log(buyer.id);
    axios
      .get(`http://localhost:8080/api/panier/usercart/${buyer.id}`)
      .then((res) => {
        console.log(res.data, "panier");

        setPanier(res.data[0].Products);
        const sum = res.data[0].Products.reduce((acc, product) => {
          const productTotal = product.price * (product.quantity || 1);
          return acc + productTotal;
        }, 0);
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [buyer.id, refre]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...panier];
    updatedProducts[index].quantity = newQuantity;

    const newTotal = updatedProducts.reduce((acc, product) => {
      const productTotal = product.price * (product.quantity || 1);
      return acc + productTotal;
    }, 0);

    setPanier(updatedProducts);
    setTotal(newTotal);
  };

  const confirmDelete = () => {
    if (productIdToDelete) {
      axios
        .delete(`http://localhost:8080/api/panier/del/${productIdToDelete}`)
        .then((response) => {
          console.log(response);
          setRefre(!refre);
          closeConfirmationDialog()
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

  const applyCoupon = () => {
    if (couponInput === "fraj") {
      toast.success("Valid coupon");

      // gen a random discount percentage (10%, 20%, or 30%)
      const randomPercentage = [10, 20, 30][Math.floor(Math.random() * 3)];
      setDiscountPercentage(randomPercentage);

      // calculate the discounted total
      const discountFactor = (100 - randomPercentage) / 100;
      let discountedTotal = total * discountFactor;
      discountedTotal = Math.floor(discountedTotal);
      setTotal(discountedTotal);

      // the coupon as applied
      setIsCouponApplied(true);
    } else {
      toast.error("Invalid coupon");
    }
  };

  return (
    <div>
      <div className="panier-container">
        <div className="breadcrumb">
          {/* <span>Home</span> / <span>Cart</span> */}
        </div>
        <h2>Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((el, index) => (
              <tr key={el.id}>
                <td>
                  <img
                    src={el.image}
                    alt={el.name}
                    className="product-image"
                  />
                  {el.name}
                </td>
                <td>${el.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={el.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="quantity-input"
                  />
                </td>
                <td>${el.price * (el.quantity || 1)}</td>
                <td>
                  <button
                    onClick={() => openConfirmationDialog(el.id)}
                    className="delete-button"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="return-button" onClick={() => router.push("/")}>
          Return To Shop
        </button>
        <div className="coupon-container">
          <input
            type="text"
            placeholder="Coupon Code"
            className="coupon-input"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button className="apply-coupon" onClick={applyCoupon} disabled={isCouponApplied}>
            Apply Coupon
          </button>
        </div>
        <div className="cart-total">
          <h3>Cart Total</h3>
          <p>Subtotal: ${total}</p>
          <p>Discount: {discountPercentage}%</p>
          <p>Total: ${total}</p>
          <button className="checkout-button">Proceed to checkout</button>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this product?</p>
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
      <ToastContainer />
    </div>
  );
};

export default Panier;
