import React from "react";
import "./Features.css";
import Image from "next/image";
import logo1 from "../../images/homelogo1.png";
import logo2 from "../../images/homelogo2.png";
import logo3 from "../../images/homelogo3.png";
const Features = () => {
  return (
    <div className="features-container">
      <div className="feature-box">
        <div className="feature-icon">
          <Image src={logo1} alt="Free and Fast Delivery" />
        </div>
        <h3>FREE AND FAST DELIVERY</h3>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div className="feature-box">
        <div className="feature-icon">
          <Image src={logo2} alt="24/7 Customer Service" />
        </div>
        <h3>24/7 CUSTOMER SERVICE</h3>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div className="feature-box">
        <div className="feature-icon">
          <Image src={logo3} alt="Money Back Guarantee" />
        </div>
        <h3>MONEY BACK GUARANTEE</h3>
        <p>We return money within 30 days</p>
      </div>
    </div>
  );
};

export default Features;
