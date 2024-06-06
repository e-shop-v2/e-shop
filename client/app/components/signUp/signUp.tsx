"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";
import "./sign.css";
import signimg from "../../images/login.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
const signUp = () => {
  const [name, setName] = useState<string>("");
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("buyer");
  const router = useRouter();
  const handleSignUp = async () => {
    try {
      const payload = { name, email: emailOrPhone, password };
      let endpoint;

      if (role === "buyer") {
        endpoint = "http://localhost:8080/api/auth/register/buyer";
      } else {
        endpoint = "http://localhost:8080/api/auth/register/seller";
      }

      const response = await axios.post(endpoint, payload);
      console.log("Signup successful", response.data);
      //   navigate("/login");
      router.push("/login");
    } catch (error) {
      console.error("Signup error", error);
    }
  };
  return (
    <div id="sign">
      <div className="signup-page">
        <div className="signup-container">
          <div className="image-section">
            <Image src={signimg} alt="signup" />
          </div>
          <div className="form-section">
            <h2>Create an account</h2>
            <p>Enter your details below</p>
            <input
              type="text"
              placeholder="Name"
              // value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              // value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            <select
              style={{ width: "360px" }}
              // value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <button
              onClick={() => {
                handleSignUp();
              }}
              className="signup-button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;
