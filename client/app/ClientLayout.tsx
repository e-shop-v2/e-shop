"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/dashboard" && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {pathname !== "/dashboard" && <Footer />}
    </>
  );
};

export default ClientLayout;
