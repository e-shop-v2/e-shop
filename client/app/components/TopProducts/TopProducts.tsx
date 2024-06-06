"use client";

import React, { useEffect, useState } from "react";
import "./TopProducts.css";
import Image from "next/image";
import timeimg from "../../images/jbl.png";
const TopProducts = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-31") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="Top">
      <div className="head"></div>

      <div
        className="top-label2-no"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png"
          alt="IPS LCD Gaming Monitor"
          style={{ width: "20px", height: "auto", marginRight: "10px" }}
        />
        <h2 className="top-subtitle-no">This Month</h2>
      </div>

      <h1 className="top-prod-no">Top Products</h1>

      <section className="music-experience">
        <h2>Enhance Your Music Experience</h2>
        <div className="timer">
          <div>{timeLeft.hours} Hours</div>
          <div>{timeLeft.minutes} Minutes</div>
          <div>{timeLeft.seconds} Seconds</div>
        </div>
        <Image src={timeimg} alt="Music Experience" />
        <button className="buy-now">Buy Now!</button>
      </section>
    </div>
  );
};

const products = [
  {
    img: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
    name: "The north coat",
    currentPrice: "$260",
    originalPrice: "$360",
    reviews: 65,
  },
  {
    img: "https://st4.depositphotos.com/13349494/26799/i/450/depositphotos_267998854-stock-photo-woman-virtual-reality-headset-pointing.jpg",
    name: "Gucci duffle bag",
    currentPrice: "$960",
    originalPrice: "$1160",
    reviews: 65,
  },
  {
    img: "https://cdsassets.apple.com/live/7WUAS350/images/social/apple-tv-4k-pair-bluetooth-beats-keyboard-social-card.jpg",
    name: "RGB liquid CPU Cooler",
    currentPrice: "$160",
    originalPrice: "$170",
    reviews: 65,
  },
  {
    img: "https://fs.npstatic.com/userfiles/7734655/image/Beats-Solod-4-headphones-bluetooth-specs-price-launch-w810h462.png",
    name: "Small BookSelf",
    currentPrice: "$360",
    originalPrice: "",
    reviews: 65,
  },
];

export default TopProducts;
