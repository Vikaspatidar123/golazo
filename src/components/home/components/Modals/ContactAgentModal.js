import React from "react";
import styles from "../../style.module.scss";

export default function ContactAgentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalMd}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cascading Header matching #ModalContactParent */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Contact information</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Modal Body matching #ModalContactParentContent */}
        <div
          className={styles.modalBody}
          style={{ textAlign: "center", lineHeight: "1.6", padding: "1.75rem 1.75rem 1.25rem" }}
        >
          <p style={{ fontSize: "0.9375rem", color: "#f8fafc", margin: "0 0 1rem", fontWeight: "500" }}>
            You can contact your Agent by:
          </p>

          <div
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "1rem 1.25rem",
              borderRadius: "0.25rem",
              marginBottom: "1rem",
              fontSize: "0.875rem",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              textAlign: "left",
            }}
          >
            <div>
              <span style={{ color: "#94a3b8" }}>Agent Name:</span>{" "}
              <strong>Master Agent Central</strong>
            </div>
            <div>
              <span style={{ color: "#94a3b8" }}>Contact Channel:</span>{" "}
              <strong>WhatsApp / Telegram Support</strong>
            </div>
            <div>
              <span style={{ color: "#94a3b8" }}>Hours of Operation:</span>{" "}
              <span>24/7 Available</span>
            </div>
          </div>

          <p style={{ fontSize: "0.8125rem", color: "#94a3b8", margin: 0 }}>
            This information will be useful if you lose contact with your Agent, or if they change their number and you cannot get in touch.
          </p>
        </div>

        {/* Modal Footer */}
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
