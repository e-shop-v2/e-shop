"use client"
import React from 'react';
import '../../CSS/adminDashboard.css';

interface ConfirmationWindowProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationWindow = ({
  show,
  handleClose,
  handleConfirm,
  title,
  message,
}: ConfirmationWindowProps) => {
  if (!show) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirmation-actions">
          <button className="confirmation-button" onClick={handleClose}>
            Cancel
          </button>
          <button className="confirmation-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;

