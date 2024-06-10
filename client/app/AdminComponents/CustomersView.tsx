import React, { useState, ChangeEvent } from "react";
import ConfirmationWindow from "./ConfirmationWindow";


interface Customer {
  name: string;
  email: string;
  address: string;
}

interface Customers {
  buyers: Customer[];
  sellers: Customer[];
}

interface CustomersViewProps {
  customers: Customers;
  filter: string;
  setFilter: (filter: string) => void;
  searchEmail: string;
  setSearchEmail: (email: string) => void;
  deleteCustomer: (email: string) => void;
  switchUserRole: (email: string, newRole: string) => void;
}

const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  filter,
  setFilter,
  searchEmail,
  setSearchEmail,
  deleteCustomer,
  switchUserRole,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(event.target.value);
  };

  const filteredCustomers = () => {
    const filteredSellers = customers.sellers?.filter((seller) =>
      seller.email?.toLowerCase().includes(searchEmail.toLowerCase())
    ) ?? [];

    const filteredBuyers = customers.buyers?.filter((buyer) =>
      buyer.email?.toLowerCase().includes(searchEmail.toLowerCase())
    ) ?? [];

    switch (filter) {
      case "sellers":
        return { buyers: [], sellers: filteredSellers };
      case "buyers":
        return { buyers: filteredBuyers, sellers: [] };
      default:
        return { buyers: filteredBuyers, sellers: filteredSellers };
    }
  };

  const displayedCustomers = filteredCustomers();

  const handleDeleteClick = (email: string) => {
    setModalTitle("Confirmation Window");
    setModalMessage("Are you sure you want to delete this customer?");
    setConfirmAction(() => () => {
      deleteCustomer(email);
      setModalShow(false);
    });
    setModalShow(true);
  };

  const handleSwitchClick = (email: string, newRole: string) => {
    setModalTitle("Confirmation Window");
    setModalMessage(`Are you sure you want to switch this customer to ${newRole}?`);
    setConfirmAction(() => () => {
      switchUserRole(email, newRole);
      setModalShow(false);
    });
    setModalShow(true);
  };

  return (
    <section className="admin-customers-section">
      <h2>Customers</h2>
      <div className="admin-filters">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="sellers">Sellers</option>
          <option value="buyers">Buyers</option>
        </select>
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Action</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers.sellers.map((seller) => (
            <tr key={seller.email}>
              <td className="action-buttons">
                <div className="checkbox-wrapper-51">
                  <input
                    id={`cbx-${seller.email}`}
                    type="checkbox"
                    onChange={() => handleSwitchClick(seller.email, "buyer")}
                    checked={filter === "sellers"}
                  />
                  <label className="toggle" htmlFor={`cbx-${seller.email}`}>
                    <span>
                      <svg viewBox="0 0 10 10" height="10px" width="10px">
                        <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </td>
              <td>Seller</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.address}</td>
            </tr>
          ))}
          {displayedCustomers.buyers.map((buyer) => (
            <tr key={buyer.email}>
              <td className="action-buttons">
                {/* Replace button with your custom toggle switch */}
                <div className="checkbox-wrapper-51">
                  <input
                    id={`cbx-${buyer.email}`}
                    type="checkbox"
                    onChange={() => handleSwitchClick(buyer.email, "seller")}
                    checked={filter === "buyers"}
                  />
                  <label className="toggle" htmlFor={`cbx-${buyer.email}`}>
                    <span>
                      <svg viewBox="0 0 10 10" height="10px" width="10px">
                        <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </td>
              <td>Buyer</td>
              <td>{buyer.name}</td>
              <td>{buyer.email}</td>
              <td>{buyer.address}</td>
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
    </section>
  );
};

export default CustomersView;
