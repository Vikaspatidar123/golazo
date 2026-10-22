import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function LanguageModal({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState("es");

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "23rem" }}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Change Language</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Body matching Image 3: Underline select dropdown */}
        <div className={styles.modalBody} style={{ padding: "2.5rem 2rem 1.5rem" }}>
          <div className={styles.modalUnderlineSelectGroup}>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              aria-label="Select language"
            >
              <option value="" disabled>Select</option>
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
            <span className={styles.selectArrow}>&#9660;</span>
          </div>
        </div>

        {/* Footer matching Image 3: CLOSE button */}
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
