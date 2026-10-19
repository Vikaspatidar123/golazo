import React from "react";
import styles from "../../style.module.scss";

export default function BetLimitsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Limites de apuestas</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span>Casino Vivo</span>
            <strong>300.000</strong>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span>Slots</span>
            <strong>15.000</strong>
          </div>
          <p
            style={{
              color: "#aaa",
              fontSize: "0.8125rem",
              marginTop: "1.25rem",
              marginBottom: 0,
            }}
          >
            • Las apuestas que excedan estos límites serán rechazadas.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.btnDanger}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
