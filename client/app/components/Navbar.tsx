"use client";
import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [role, setRole] = useState("");

  return (
    <div>
      <header className="header">
        <div className="top-banner">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a href="/home">Shop Now</a>
        </div>
        <nav className="main-nav">
          <div className="logo">Exclusive</div>
          <div className="nav-links">
            <a href="/home">Home</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
            <a href="/singUp">Sign Up</a>
            <input
              className="nav-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <div className="icons">
              {<span>❤️</span>}
              {<span>🛒</span>}
              {<span>👤</span>}
              {<span>👤</span>}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
