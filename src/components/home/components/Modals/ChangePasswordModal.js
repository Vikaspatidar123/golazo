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
      setMessage({ type: "error", text: "La contraseña debe contener entre 6 y 16 caracteres." });
      return;
    }
    if (password1 !== password2) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }
    setMessage({ type: "success", text: "Contraseña cambiada con éxito." });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h6 className={styles.modalTitle}>Cambiar Contraseña</h6>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.modalFormGroup}>
              <label htmlFor="pwd1">Nueva contraseña</label>
              <div style={{ position: "relative" }}>
                <input
                  id="pwd1"
                  type={show1 ? "text" : "password"}
                  maxLength={16}
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
                <i
                  className={`fas ${show1 ? "fa-eye-slash" : "fa-eye"}`}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                    cursor: "pointer",
                    color: "#aaa",
                  }}
                  onClick={() => setShow1(!show1)}
                />
              </div>
            </div>

            <div className={styles.modalFormGroup}>
              <label htmlFor="pwd2">Ingrese nuevamente</label>
              <div style={{ position: "relative" }}>
                <input
                  id="pwd2"
                  type={show2 ? "text" : "password"}
                  maxLength={16}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <i
                  className={`fas ${show2 ? "fa-eye-slash" : "fa-eye"}`}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                    cursor: "pointer",
                    color: "#aaa",
                  }}
                  onClick={() => setShow2(!show2)}
                />
              </div>
            </div>

            {message && (
              <div
                style={{
                  color: message.type === "error" ? "yellow" : "#22c55e",
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  marginTop: "0.75rem",
                }}
              >
                {message.text}
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
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
