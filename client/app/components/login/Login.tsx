"use client";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginimg from "../../images/login.png";
import logoutimg from '../images/log-out.png'
import "./login.css";
interface MyJwtPayload {
  role: string;
}
const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const payload = { email: emailOrPhone, password };
      const endpoint = "http://localhost:8080/api/auth/login";

      const response = await axios.post(endpoint, payload);
      const token = response.data.token; // Assuming your token is in response.data.token
      localStorage.setItem("token", token); // Store the token in local storage

      // Decode the token to extract user information
      const decodedToken = jwtDecode<MyJwtPayload>(token);
      console.log("Decoded Token:", decodedToken);

     

      // Redirect based on the user's role
      if (decodedToken.role === "seller") {
        router.push("/sellerProfile"); // Redirect to seller profile
      } else if (decodedToken.role === "buyer") {
    
        router.push("/buyerProfile");
      } 
     
    else if  (decodedToken.role === "admin") {
        router.push("/admin"); // Redirect to admin profile
      }
      else {
        // Handle other roles or scenarios if needed
        console.log("Unknown role:", decodedToken.role);
      }
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
