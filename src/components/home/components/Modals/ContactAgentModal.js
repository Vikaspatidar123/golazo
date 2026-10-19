import React from "react";
import styles from "../../style.module.scss";

export default function ContactAgentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Informacion de contacto</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className={styles.modalBody} style={{ textAlign: "center", lineHeight: "1.6" }}>
          <i
            className="fas fa-headset"
            style={{ fontSize: "2.5rem", color: "#f05e15", marginBottom: "1rem" }}
          ></i>
          <p>
            Puede contactar a su Agente por este medio para cualquier consulta de carga o retiro de saldo.
          </p>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "0.25rem",
              marginTop: "1rem",
              fontSize: "0.8125rem",
              color: "#c7cbd4",
            }}
          >
            Agente asignado: <strong>Agente Central</strong>
          </div>
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
