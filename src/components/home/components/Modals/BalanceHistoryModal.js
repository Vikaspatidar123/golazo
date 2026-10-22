import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function BalanceHistoryModal({ isOpen, onClose }) {
  const [showEmpty, setShowEmpty] = useState(false);

  if (!isOpen) return null;

  const records = [
    {
      id: 1,
      date: "2026-10-21 10:14:02",
      provider: "Pragmatic Play",
      reason: "Live Roulette European",
      amount: "-$25.00",
      isPositive: false,
      before: "$1,275.00",
      after: "$1,250.00",
      claim: "Settled",
    },
    {
      id: 2,
      date: "2026-10-21 09:42:15",
      provider: "Pragmatic Play",
      reason: "Sweet Bonanza (Win)",
      amount: "+$140.00",
      isPositive: true,
      before: "$1,135.00",
      after: "$1,275.00",
      claim: "Settled",
    },
    {
      id: 3,
      date: "2026-10-20 22:18:30",
      provider: "Red Rake Gaming",
      reason: "Super 5 Stars Bet",
      amount: "-$10.00",
      isPositive: false,
      before: "$1,145.00",
      after: "$1,135.00",
      claim: "Settled",
    },
    {
      id: 4,
      date: "2026-10-20 18:05:11",
      provider: "Golazo Cashier",
      reason: "Agent Credit Deposit",
      amount: "+$500.00",
      isPositive: true,
      before: "$645.00",
      after: "$1,145.00",
      claim: "Completed",
    },
    {
      id: 5,
      date: "2026-10-19 14:22:45",
      provider: "Sportsbook",
      reason: "UEFA Champions League Wager",
      amount: "+$85.50",
      isPositive: true,
      before: "$559.50",
      after: "$645.00",
      claim: "Settled",
    },
  ];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalLg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cascading Header matching #ModalHistory */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Game History</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Modal Body matching dataTables_wrapper in #ModalHistory */}
        <div className={styles.modalBody} style={{ padding: "1.5rem 1.5rem 1rem" }}>
          <div className={styles.modalTableContainer}>
            <table className={styles.modalTable} cellSpacing="0">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Provider</th>
                  <th style={{ textAlign: "center" }}>Reason</th>
                  <th style={{ textAlign: "center" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Balance Before</th>
                  <th style={{ textAlign: "center" }}>Balance</th>
                  <th style={{ textAlign: "center" }}>Claim</th>
                </tr>
              </thead>
              <tbody>
                {showEmpty || records.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  records.map((row) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center" }}>{row.date}</td>
                      <td style={{ textAlign: "center" }}>{row.provider}</td>
                      <td style={{ textAlign: "center" }}>{row.reason}</td>
                      <td
                        style={{ textAlign: "center" }}
                        className={
                          row.isPositive
                            ? styles.amountPositive
                            : styles.amountNegative
                        }
                      >
                        {row.amount}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.before}</td>
                      <td style={{ textAlign: "center", fontWeight: "600" }}>{row.after}</td>
                      <td style={{ textAlign: "center" }}>
                        <span className={styles.statusBadge}>{row.claim}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Simple Numbers Pagination matching #HistoryTable_paginate */}
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
            <span>Showing 1 to {records.length} entries</span>
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

        {/* Modal Footer matching #ModalHistory */}
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
