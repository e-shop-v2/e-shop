// Import React and other necessary components
import React from "react";
import BarChart from "./BarChart"; // Import the new BarChart component
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Define types for Customer, Customers, Product, and Order
type Customer = {
  email: string;
  name: string;
  address: string;
  stock?: number;
};

type Customers = {
  buyers: Customer[];
  sellers: Customer[];
};

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type Order = {
  id: string;
  product: string;
  customer: string;
  quantity: number;
  total: number;
};

// Define props interface for DashboardView component
interface DashboardViewProps {
  customers: Customers;
  products: Product[];
  numberOfProducts: number;
  orders: Order[];
  handleViewChange: (view: string) => void;
}

// Define DashboardView component
const DashboardView = ({
  customers,
  products,
  numberOfProducts,
  orders,
  handleViewChange,
}: DashboardViewProps) => {
  // Calculate total number of customers and orders
  const totalCustomers = customers.buyers.length + customers.sellers.length;
  const totalOrders = orders.length;

  // Sort products by stock and get top 5 products
  const topProductsByStock = products.sort((a, b) => b.stock - a.stock).slice(0, 5);

  // Define data for the BarChart component
  const barChartData = {
    labels: ["2022", "2023", "2024", "2024"],
    datasets: [
      {
        label: "Users Gained",
        data: [50, 100, 150, 200, 250], 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define data for the PieChart component
  const pieData = [
    { name: "Buyers", value: customers.buyers.length },
    { name: "Sellers", value: customers.sellers.length },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <>
      {/* Dashboard header */}
      <header className="admin-header-dashboard">
        <h1 className="admin-main-title">Dashboard</h1>
        {/* Statistics */}
        <div className="admin-stats">
          <div className="admin-stat-container">
            <h3>{totalCustomers}</h3>
            <p>Customers</p>
          </div>
          <div className="admin-stat-container">
            <h3>{numberOfProducts}</h3>
            <p>Products</p>
          </div>
          <div className="admin-stat-container">
            <h3>{totalOrders}</h3>
            <p>Orders</p>
          </div>
        </div>
      </header>
      {/* Main content section */}
      <section className="admin-main-section">
        {/* Top stock */}
        <div className="admin-top-stock">
          <div className="admin-top-stock-header">
            <h2 className="admin-red-title">Stock Leaders</h2>
            <button
              className="admin-see-more-button"
              onClick={() => handleViewChange("products")}
              style={{ marginLeft: 'auto' }}
            >
              See More
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>ID</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {topProductsByStock.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.id}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        {/* Role stats chart */}
        <section className="admin-role-stats-chart">
          <div className="admin-role-stats-header">
            <h3 className="admin-red-title">Role Stats</h3>
            <button
              className="admin-see-more-button admin-edge"
              onClick={() => handleViewChange("customers")}
            >
              See More
            </button>
          </div>
          {/* Pie chart */}
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx={100}
              cy={100}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </section>
        {/* User growth chart */}
        <section className="admin-role-stats-chart">
          <div className="admin-role-stats-header">
            <h3 className="admin-red-title">User Growth</h3>
          </div>
          {/* Bar chart */}
          <BarChart chartData={barChartData} />
        </section>
      </section>
    </>
  );
};

export default DashboardView;