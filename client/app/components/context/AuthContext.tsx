"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar";
const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const [buyer, setBuyer] = useState<any>({});
  const [seller, setSeller] = useState<any>({});
  const [admin, setAdmin] = useState<any>({});
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedBuyer = localStorage.getItem("buyer");
    const storedSeller = localStorage.getItem("seller");
    const storedAdmin = localStorage.getItem("admin");
    const storedToken = localStorage.getItem("token");

    if (storedBuyer) setBuyer(JSON.parse(storedBuyer));
    if (storedSeller) setSeller(JSON.parse(storedSeller));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    if (storedToken) setToken(storedToken);
  }, []);

  const loginAction = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        if (response.data.seller) {
          setSeller(response.data.seller);
          localStorage.setItem("seller", JSON.stringify(response.data.seller));
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          router.push("/sellerProfile");
        } else if (response.data.admin) {
          setAdmin(response.data.admin);
          localStorage.setItem("admin", JSON.stringify(response.data.admin));
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          router.push("/admin");
        } else if (response.data.buyer) {
          setBuyer(response.data.buyer);
          localStorage.setItem("buyer", JSON.stringify(response.data.buyer));
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          router.push("/buyerProfile");
        } else {
          console.log("unknown role");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  const logOut = () => {
    setBuyer({});
    setSeller({});
    setAdmin({});
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("buyer");
    localStorage.removeItem("seller");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, buyer, admin, seller, loginAction, logOut }}
    >
      <Navbar />
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
