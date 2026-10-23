import React, { useState, useRef, useEffect } from "react";

export default function SupportModal({ isOpen, mode = "support", onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setSubject("");
    setMessage("");
    setAttachedFile(null);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      handleCancel();
    }, 1200);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type && file.type.startsWith("image/")) {
        setAttachedFile(file);
      } else {
        alert("Por favor seleccione únicamente archivos de imagen (PNG, JPG, etc.).");
      }
    }
  };

  return (
    <div
      className="modal fade in show"
      id="ModalContactSupport"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="supportModalLabel"
      aria-hidden="true"
      style={{ display: "flex" }}
      onClick={handleCancel}
    >
      <div
        className="modal-dialog cascading-modal"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {/* Header matching golazo floating gradient card */}
          <div className="modal-header gradient-card-header blue-gradient darken-2">
            <h4 className="title modal-title" id="supportModalLabel">
              {mode === "notifications" ? "Notificaciones" : "Contact Support"}
            </h4>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {mode === "notifications" ? (
            <>
              <div className="modal-body text-center" style={{ padding: "2.5rem 1.5rem" }}>
                <i
                  className="far fa-bell"
                  style={{
                    fontSize: "2.5rem",
                    color: "#ffffff",
                    opacity: 0.85,
                    marginBottom: "1rem",
                    display: "block",
                  }}
                />
                <p style={{ color: "#ffffff", margin: 0, fontSize: "1rem" }}>
                  No hay nuevas notificaciones en este momento.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                >
                  CLOSE
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Row 1: Subject input (aligned with textarea) */}
                <div className="support-row">
                  <div className="support-row-icon-col"></div>
                  <div className="support-input-field">
                    <input
                      type="text"
                      className="support-text-input"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Paperclip attachment button + Message textarea */}
                <div className="support-row">
                  <div className="support-row-icon-col">
                    <button
                      type="button"
                      className="support-attach-circle"
                      onClick={handleAttachClick}
                      aria-label="Adjuntar imagen"
                    >
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="support-input-field">
                    <textarea
                      className="support-textarea-input"
                      placeholder="Type here your message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Optional attachment preview */}
                {attachedFile && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "#93c5fd",
                      marginTop: "-0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <i className="fas fa-paperclip"></i>
                    <span>{attachedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        padding: "0 0.25rem",
                      }}
                      title="Remove attachment"
                    >
                      &times;
                    </button>
                  </div>
                )}

                {/* Success feedback */}
                {submitted && (
                  <div
                    style={{
                      color: "#4ade80",
                      textAlign: "center",
                      fontSize: "0.9375rem",
                      fontWeight: "600",
                      marginTop: "0.5rem",
                    }}
                  >
                    <i className="fas fa-check-circle mr-2" />
                    Message sent successfully!
                  </div>
                )}
              </div>

              {/* Footer with centered CANCEL and SUBMIT buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn btn-danger">
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
