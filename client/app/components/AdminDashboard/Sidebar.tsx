"use client";
import React from "react";

interface SidebarProps {
  handleViewChange: (view: string) => void;
}

const Sidebar = ({ handleViewChange }: SidebarProps) => {
  return (
    <aside className="admin-sidebar-dashboard">
      <h2>
        <span className="admin-ex">Ex</span>
        <span className="admin-clusive">clusive</span>
      </h2>
      <nav>
        <ul>
          <li onClick={() => handleViewChange("dashboard")}>Dashboard</li>
          <li onClick={() => handleViewChange("customers")}>Customers</li>
          <li onClick={() => handleViewChange("products")}>Products</li>
          <li onClick={() => handleViewChange("orders")}>Orders</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
