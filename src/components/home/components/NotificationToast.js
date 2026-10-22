import React from "react";

export default function NotificationToast({
  visible = true,
  type = "deposit", // 'deposit' (green) or 'withdrawal' (red)
  title = "Notification",
  time = "9s",
  message = "Successful deposit: 100,00 credits",
  onClose,
}) {
  if (!visible) return null;

  return (
    <div className="golazo-toast-wrapper">
      <div
        className={`toast show ${
          type === "withdrawal" ? "toast-withdrawal" : "toast-deposit"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <i className="fas fa-bell toast-icon"></i>
          <strong className="toast-title">{title}</strong>
          <small className="toast-time">{time}</small>
          <button
            type="button"
            className="toast-close-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
