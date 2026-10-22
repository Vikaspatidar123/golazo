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
        className={`${styles.modalDialog} ${styles.modalMd}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>
            {mode === "notifications"
              ? "Notifications"
              : "Help Desk Support"}
          </h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {mode === "notifications" ? (
          <div className={styles.modalBody} style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
            <i
              className="far fa-bell"
              style={{ fontSize: "2.5rem", color: "#ffffff", opacity: 0.85, marginBottom: "1rem" }}
            />
            <p style={{ color: "#e2e8f0", margin: 0, fontSize: "0.9375rem" }}>
              No new notifications at this time.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody} style={{ padding: "1.75rem 1.75rem 1rem" }}>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.25rem",
                  marginBottom: "1.25rem",
                  fontSize: "0.8125rem",
                  color: "#e2e8f0",
                }}
              >
                Our support team is available 24/7. We will respond to your ticket promptly.
              </div>

              <div className={styles.modalFormGroup}>
                <label htmlFor="ticketSubject">Subject</label>
                <input
                  id="ticketSubject"
                  type="text"
                  placeholder="Enter subject..."
                  maxLength={64}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalFormGroup}>
                <label htmlFor="ticketMsg">Message</label>
                <textarea
                  id="ticketMsg"
                  rows={4}
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {submitted && (
                <div
                  style={{
                    color: "#4ade80",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <i className="fas fa-check-circle mr-2" />
                  Message sent successfully.
                </div>
              )}
            </div>

            <div className={styles.modalFooter} style={{ paddingBottom: "1.75rem", gap: "1rem" }}>
              <button
                type="button"
                className={styles.modalBtn}
                onClick={onClose}
              >
                CANCEL
              </button>
              <button type="submit" className={styles.modalBtn}>
                SUBMIT
              </button>
            </div>
          </form>
        )}

        {mode === "notifications" && (
          <div className={styles.modalFooter} style={{ paddingBottom: "1.75rem" }}>
            <button
              type="button"
              className={styles.modalBtn}
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
