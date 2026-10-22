import React from "react";
import styles from "../../style.module.scss";

export default function BetLimitsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "23rem" }}
      >
        {/* Header matching Image 4 */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Maximum Bet Limits</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Body matching Image 4 */}
        <div className={styles.modalBody} style={{ padding: "2rem 1.75rem 1.25rem" }}>
          <div className={styles.betLimitRow}>
            <span className={styles.betLimitLabel}>Live Casino</span>
            <span className={styles.betLimitValue}>300.000</span>
          </div>

          <div className={styles.betLimitRow}>
            <span className={styles.betLimitLabel}>Slots</span>
            <span className={styles.betLimitValue}>15.000</span>
          </div>

          <p className={styles.betLimitNote}>
            • Any bet that exceeds these limits will be automatically rejected.
          </p>
        </div>

        {/* Footer matching #ModalOwnLimits: Close button */}
        <div className={styles.modalFooter} style={{ paddingBottom: "2rem" }}>
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
