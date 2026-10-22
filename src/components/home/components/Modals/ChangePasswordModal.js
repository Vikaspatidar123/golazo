import React, { useState } from "react";
import styles from "../../style.module.scss";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1.length < 6 || password1.length > 16) {
      setMessage({
        type: "error",
        text: "Password must be between 6 and 16 characters.",
      });
      return;
    }
    if (password1 !== password2) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    setMessage({ type: "success", text: "Password changed successfully." });
    setTimeout(() => {
      setMessage(null);
      setPassword1("");
      setPassword2("");
      onClose();
    }, 1200);
  };

  const handleCancel = () => {
    setMessage(null);
    setPassword1("");
    setPassword2("");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleCancel}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "23rem" }}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Change password</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={handleCancel}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Form Body matching Image 1 */}
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody} style={{ padding: "2.25rem 1.75rem 1rem" }}>
            {/* New Password Row */}
            <div className={styles.modalUnderlineRow}>
              <span
                className={styles.inputEyeIcon}
                onClick={() => setShow1(!show1)}
                title={show1 ? "Hide password" : "Show password"}
              >
                <i className={`far ${show1 ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              <input
                type={show1 ? "text" : "password"}
                placeholder="New password"
                maxLength={16}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className={styles.underlineInput}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Repeat New Password Row */}
            <div className={styles.modalUnderlineRow} style={{ marginBottom: "1rem" }}>
              <span
                className={styles.inputEyeIcon}
                onClick={() => setShow2(!show2)}
                title={show2 ? "Hide password" : "Show password"}
              >
                <i className={`far ${show2 ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              <input
                type={show2 ? "text" : "password"}
                placeholder="Repeat new password"
                maxLength={16}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className={styles.underlineInput}
                autoComplete="new-password"
                required
              />
            </div>

            {message && (
              <div
                style={{
                  color: message.type === "error" ? "#fca5a5" : "#4ade80",
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  marginTop: "0.75rem",
                }}
              >
                {message.text}
              </div>
            )}
          </div>

          {/* Action Buttons matching Image 1: CANCEL and SUBMIT */}
          <div className={styles.modalFooter} style={{ gap: "1.25rem", paddingBottom: "2rem" }}>
            <button
              type="button"
              className={styles.modalBtn}
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button type="submit" className={styles.modalBtn}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
