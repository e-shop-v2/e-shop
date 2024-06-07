"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginimg from "../../images/login.png";
import "./login.css";
import { useAuth } from "../context/AuthContext";
interface MyJwtPayload {
  role: string;
}




const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { loginAction } = useAuth();

  const handleLogin = async () => {
    try {
      const payload = { email: emailOrPhone, password };

    } catch (error) {
      console.error("Login error", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div id="login">
      <div className="login-page">
        <div className="login-container">
          <div className="image-section">
            <Image src={loginimg} alt="Login" />
          </div>
          <div className="form-section">
            <h2>Log in to Exclusive</h2>
            <p>Enter your details below</p>
            <input
              style={{ width: "376px" }}
              type="text"
              placeholder="Email or Phone Number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <input
              style={{ width: "376px" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
            <p>
              <a href="#">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
