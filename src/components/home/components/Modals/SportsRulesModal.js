import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function SportsRulesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("sports");

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalLg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching #ModalRules */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Sports Rules</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Tab selection */}
        <div className={styles.modalBody} style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <button
              type="button"
              onClick={() => setActiveTab("sports")}
              style={{
                background: activeTab === "sports" ? "#2b3245" : "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                padding: "0.375rem 1rem",
                fontSize: "0.8125rem",
                borderRadius: "0.25rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Sports Rules
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("limits")}
              style={{
                background: activeTab === "limits" ? "#2b3245" : "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                padding: "0.375rem 1rem",
                fontSize: "0.8125rem",
                borderRadius: "0.25rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Payout & Wagering Limits
            </button>
          </div>

          {activeTab === "sports" ? (
            <div style={{ color: "#e2e8f0", fontSize: "0.875rem", lineHeight: "1.6" }}>
              <h6 style={{ color: "#ffffff", fontWeight: "700", marginBottom: "0.5rem" }}>
                1. General Betting Provisions
              </h6>
              <p style={{ margin: "0 0 1rem" }}>
                All match bets are settled based on the official score at the end of regular time (90 minutes including injury time), unless specified otherwise. Extra time and penalty shootouts do not count toward regular match outcome markets.
              </p>

              <h6 style={{ color: "#ffffff", fontWeight: "700", marginBottom: "0.5rem" }}>
                2. Postponed & Abandoned Matches
              </h6>
              <p style={{ margin: "0 0 1rem" }}>
                If a match is postponed and not resumed within 48 hours of original kickoff, all related wagers will be void and stakes returned to player balance.
              </p>

              <h6 style={{ color: "#ffffff", fontWeight: "700", marginBottom: "0.5rem" }}>
                3. Basketball & American Sports
              </h6>
              <p style={{ margin: 0 }}>
                Unless specifically stated, all basketball and American football bets include overtime for settlement purposes.
              </p>
            </div>
          ) : (
            <div className={styles.modalTableContainer}>
              <table className={styles.modalTable}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th style={{ textAlign: "right" }}>Maximum Single Bet</th>
                    <th style={{ textAlign: "right" }}>Maximum Payout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Live Casino (Roulette / Baccarat)</td>
                    <td style={{ textAlign: "right", fontWeight: "600" }}>300.000</td>
                    <td style={{ textAlign: "right", fontWeight: "600", color: "#4ade80" }}>1.500.000</td>
                  </tr>
                  <tr>
                    <td>Slots (Pragmatic / Red Rake)</td>
                    <td style={{ textAlign: "right", fontWeight: "600" }}>15.000</td>
                    <td style={{ textAlign: "right", fontWeight: "600", color: "#4ade80" }}>250.000</td>
                  </tr>
                  <tr>
                    <td>Pre-Match Soccer (Top European Leagues)</td>
                    <td style={{ textAlign: "right", fontWeight: "600" }}>100.000</td>
                    <td style={{ textAlign: "right", fontWeight: "600", color: "#4ade80" }}>1.000.000</td>
                  </tr>
                  <tr>
                    <td>Live Sports In-Play</td>
                    <td style={{ textAlign: "right", fontWeight: "600" }}>50.000</td>
                    <td style={{ textAlign: "right", fontWeight: "600", color: "#4ade80" }}>500.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
