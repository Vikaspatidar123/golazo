import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function SupportModal({ isOpen, mode = "support", onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject("");
      setMessage("");
      onClose();
    }, 1500);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalLg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>
            {mode === "notifications"
              ? "Notificaciones"
              : "Contactar a Mesa de ayuda"}
          </h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {mode === "notifications" ? (
          <div className={styles.modalBody} style={{ textAlign: "center", padding: "2rem" }}>
            <i
              className="far fa-bell"
              style={{ fontSize: "2.5rem", color: "#f05e15", marginBottom: "1rem" }}
            />
            <p style={{ color: "#c7cbd4" }}>No hay nuevas notificaciones en este momento.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              <div
                style={{
                  background: "rgba(220, 53, 69, 0.2)",
                  border: "1px solid rgba(220, 53, 69, 0.4)",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.25rem",
                  marginBottom: "1.25rem",
                  fontSize: "0.8125rem",
                  color: "#ffc9c9",
                }}
              >
                Se encuentra fuera del horario de atencion. Responderemos su mensaje a la brevedad.
              </div>

              <div className={styles.modalFormGroup}>
                <label htmlFor="ticketSubject">Asunto</label>
                <input
                  id="ticketSubject"
                  type="text"
                  placeholder="Ingrese el asunto..."
                  maxLength={64}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label htmlFor="ticketMsg">Mensaje</label>
                <textarea
                  id="ticketMsg"
                  rows={4}
                  placeholder="Ingrese aquí su mensaje para el soporte..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {submitted && (
                <div
                  style={{
                    color: "#22c55e",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <i className="fas fa-check-circle mr-2" />
                  Mensaje enviado correctamente.
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnDanger}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.btnDanger}>
                Enviar
              </button>
            </div>
          </form>
        )}

        {mode === "notifications" && (
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.btnDanger}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
