import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function LanguageModal({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState("es");

  if (!isOpen) return null;

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setTimeout(onClose, 300);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "22rem" }}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Cambiar Idioma</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={() => handleSelect("es")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                background: selectedLang === "es" ? "#292d3d" : "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0.375rem",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "0.9375rem",
              }}
            >
              <img
                src="https://cdn.golazo.club/images/flags/es.png"
                alt="Español"
                width="24"
                height="16"
              />
              <span>Español</span>
              {selectedLang === "es" && (
                <i className="fas fa-check" style={{ marginLeft: "auto", color: "#22c55e" }} />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSelect("en")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                background: selectedLang === "en" ? "#292d3d" : "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0.375rem",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "0.9375rem",
              }}
            >
              <img
                src="https://cdn.golazo.club/images/flags/us.png"
                alt="English"
                width="24"
                height="16"
              />
              <span>English</span>
              {selectedLang === "en" && (
                <i className="fas fa-check" style={{ marginLeft: "auto", color: "#22c55e" }} />
              )}
            </button>
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
