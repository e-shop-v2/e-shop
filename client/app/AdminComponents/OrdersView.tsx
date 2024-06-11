import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationWindow from './ConfirmationWindow';

interface Order {
  id: number;
  customer: string;
  product: string;
  category: string;
  price: number;
}

interface OrdersViewProps {
  orders: Order[];
}

const OrdersView: React.FC<OrdersViewProps> = ({ orders }) => {
  const [searchCustomer, setSearchCustomer] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  return (
    <div className="admin-orders-section">
      <h1>Orders</h1>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchCustomer}
        onChange={(e) => setSearchCustomer(e.target.value)}
        className="admin-orders-search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Category</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.category}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersView;