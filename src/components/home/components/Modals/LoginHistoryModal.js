import React from "react";
import styles from "../../style.module.scss";

export default function LoginHistoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const logins = [
    {
      id: 1,
      date: "2026-10-21 10:45:12",
      action: "Sign-in Success",
      ip: "181.44.210.15",
      device: "Chrome 120 / MacOS",
    },
    {
      id: 2,
      date: "2026-10-20 18:22:04",
      action: "Sign-in Success",
      ip: "181.44.210.15",
      device: "Chrome 120 / MacOS",
    },
    {
      id: 3,
      date: "2026-10-19 21:05:39",
      action: "Sign-in Success",
      ip: "190.19.124.88",
      device: "Mobile Safari / iOS",
    },
    {
      id: 4,
      date: "2026-10-18 14:11:50",
      action: "Sign-in Success",
      ip: "181.44.210.15",
      device: "Chrome 120 / MacOS",
    },
    {
      id: 5,
      date: "2026-10-17 09:30:21",
      action: "Sign-in Success",
      ip: "181.44.210.15",
      device: "Chrome 119 / MacOS",
    },
  ];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalMd}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cascading Header matching #ModalLoginHistory */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Login History</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Modal Body matching #LoginHistoryTable */}
        <div className={styles.modalBody} style={{ padding: "1.5rem 1.5rem 1rem" }}>
          <div className={styles.modalTableContainer}>
            <table className={styles.modalTable} cellSpacing="0">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                  <th style={{ textAlign: "center" }}>IP Address</th>
                  <th style={{ textAlign: "center" }}>Device</th>
                </tr>
              </thead>
              <tbody>
                {logins.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>{item.date}</td>
                    <td style={{ textAlign: "center" }}>
                      <span className={styles.statusBadge}>{item.action}</span>
                    </td>
                    <td style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.8125rem" }}>
                      {item.ip}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.75rem",
              padding: "0 0.25rem",
              fontSize: "0.8125rem",
              color: "#94a3b8",
            }}
          >
            <span>Showing 1 to {logins.length} entries</span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button
                type="button"
                style={{
                  background: "#2b3245",
                  border: "none",
                  color: "#ffffff",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                «
              </button>
              <button
                type="button"
                style={{
                  background: "#2b3245",
                  border: "none",
                  color: "#ffffff",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                1
              </button>
              <button
                type="button"
                style={{
                  background: "#2b3245",
                  border: "none",
                  color: "#ffffff",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                »
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter} style={{ paddingBottom: "1.75rem" }}>
          <button
            type="button"
            className={styles.modalBtn}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
