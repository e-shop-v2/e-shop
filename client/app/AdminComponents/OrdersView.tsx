import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationWindow from './ConfirmationWindow';

interface Order {
  id: number;
  username: string;
  nameOfproduct: string;
  category: string;
  total: number;
}

const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchCustomer, setSearchCustomer] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:8080/api/cart/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')!,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/orders/${orderId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')!,
        },
      });
      fetchOrders(); // we refresh orders list after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleDeleteClick = (orderId: number) => {
    setModalTitle('Confirmation Window');
    setModalMessage('Are you sure you want to delete this order?');
    setConfirmAction(() => () => {
      deleteOrder(orderId);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const filteredOrders = orders.filter((order) =>
    order.username.toLowerCase().includes(searchCustomer.toLowerCase())
  );

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
            <th>Action</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Category</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(order.id)}
                >
                  Delete
                </button>
              </td>
              <td>{order.username}</td>
              <td>{order.nameOfproduct}</td>
              <td>{order.category}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationWindow
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={confirmAction}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default OrdersView;
