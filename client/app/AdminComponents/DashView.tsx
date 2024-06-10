import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import PieChartComponent from './PieChart'; // Import the PieChart component

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CustomerGroup {
  length: number;
}

interface Customers {
  buyers: CustomerGroup;
  sellers: CustomerGroup;
}

interface Order {
  id: number;
}

interface DashboardViewProps {
  customers: Customers;
  products: Product[];
  numberOfProducts: number;
  orders: Order[];
  handleViewChange: (view: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  customers,
  products = [],
  numberOfProducts,
  orders = [],
  handleViewChange,
}) => {
  const totalCustomers = (customers?.buyers?.length || 0) + (customers?.sellers?.length || 0);
  const totalOrders = orders.length;

  const pieData = [
    { name: 'Buyers', value: customers?.buyers?.length || 0 },
    { name: 'Sellers', value: customers?.sellers?.length || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  const topProductsByStock = products.sort((a, b) => b.stock - a.stock).slice(0, 5);

  return (
    <>
      <header className="admin-header-dashboard">
        <h1 className="admin-main-title">Dashboard</h1>
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
      <section className="admin-main-section">
        <div className="admin-top-stock">
          <div className="admin-top-stock-header">
            <h2 className="admin-red-title">Stock Leaders</h2>
            <button
              className="admin-see-more-button"
              onClick={() => handleViewChange('products')}
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
        <section className="admin-role-stats-chart">
          <div className="admin-role-stats-header">
            <h3 className="admin-red-title">Role Stats</h3>
            <button
              className="admin-see-more-button admin-edge"
              onClick={() => handleViewChange('customers')}
            >
              See More
            </button>
          </div>
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
        <section className="admin-highcharts-3d-chart">
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          </div>
        </section>
      </section>
    </>
  );
};

export default DashboardView;
