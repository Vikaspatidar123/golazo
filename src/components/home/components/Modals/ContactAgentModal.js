import React, { useEffect } from "react";

export default function ContactAgentModal({ isOpen, onClose }) {
  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      id="ModalContactParent"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="ContactParent"
      aria-modal="true"
      style={{ paddingRight: "5px", display: "block" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog cascading-modal modal-lg modal-dialog-centered modal-dialog-custom"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header text-center gradient-card-header red-gradient">
            <h6 className="modal-title w-100 font-weight-bold text-left ml-2">
              Contact information
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            id="ModalContactParentContent"
            className="modal-body modal-body-custom white-text"
          >
            <p className="contact-info-p">
              This will display your Agent contact information.
            </p>
            <p className="contact-info-p">
              This information will be useful if you lose contact with your
              Agent, or if they change their number and you cannot get in
              touch.
            </p>
            <p className="contact-info-p">
              Because this is a new feature on the site, your Agent has not
              set this information up yet. Please ask them to do so.
            </p>
          </div>

          <div className="modal-footer justify-content-center py-2">
            <button
              type="button"
              className="btn btn-danger px-3 waves-effect waves-light"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
