"use client"
import React from "react";



// this component takes only one prop:
// handleViewChange (function to change the current view)
const Sidebar = ({ handleViewChange }) => {
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
