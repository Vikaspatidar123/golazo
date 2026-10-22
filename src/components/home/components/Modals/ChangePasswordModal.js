import React, { useState, useEffect, useRef } from "react";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [format1Error, setFormat1Error] = useState(false);
  const [format2Error, setFormat2Error] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const inputRef1 = useRef(null);

  // Auto-focus input 1 when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef1.current) {
          inputRef1.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
    setPassword1("");
    setPassword2("");
    setShow1(false);
    setShow2(false);
    setFormat1Error(false);
    setFormat2Error(false);
    setFeedback(null);
    onClose();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let hasError = false;

    if (password1.length < 6 || password1.length > 16) {
      setFormat1Error(true);
      hasError = true;
    } else {
      setFormat1Error(false);
    }

    if (password1 !== password2) {
      setFormat2Error(true);
      hasError = true;
    } else {
      setFormat2Error(false);
    }

    if (hasError) return;

    setFeedback({
      type: "success",
      text: "Password changed successfully.",
    });

    setTimeout(() => {
      handleCancel();
    }, 1200);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      className="modal fade show"
      id="ModalChangePassword"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="ChangePassword"
      aria-modal="true"
      style={{ paddingRight: "5px", display: "block" }}
      onClick={handleCancel}
    >
      <div
        className="modal-dialog cascading-modal modal-sm modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header text-center gradient-card-header red-gradient">
            <h6 className="modal-title w-100 font-weight-bold text-left ml-2">
              Change password
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body white-text">
            <div className="md-form pb-2 font-size-custom">
              <i
                className={`fas ${show1 ? "fa-eye-slash" : "fa-eye"} prefix change-password-reveal lightgrey-text`}
                onClick={() => setShow1((prev) => !prev)}
                title={show1 ? "Hide password" : "Show password"}
              ></i>
              <input
                ref={inputRef1}
                type={show1 ? "text" : "password"}
                id="ChangePasswordNew1"
                className="form-control change-password-toggle change-password-input modal-clear-val white-text"
                maxLength={16}
                aria-autocomplete="list"
                autoComplete="new-password"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                  if (format1Error && e.target.value.length >= 6 && e.target.value.length <= 16) {
                    setFormat1Error(false);
                  }
                }}
                onFocus={() => setFocused1(true)}
                onBlur={() => setFocused1(false)}
                onKeyDown={handleInputKeyDown}
              />
              <label
                htmlFor="ChangePasswordNew1"
                className={focused1 || password1.length > 0 ? "active" : ""}
              >
                New password
              </label>
              <small
                id="ChangePasswordFormat1"
                className="form-text modal-clear-hide text-muted"
                style={{ display: format1Error ? "block" : "none" }}
              >
                The password must contain between 6 and 16 characters.
              </small>
            </div>
            <div className="md-form pb-2 font-size-custom">
              <i
                className={`fas ${show2 ? "fa-eye-slash" : "fa-eye"} prefix change-password-reveal lightgrey-text`}
                onClick={() => setShow2((prev) => !prev)}
                title={show2 ? "Hide password" : "Show password"}
              ></i>
              <input
                type={show2 ? "text" : "password"}
                id="ChangePasswordNew2"
                className="form-control change-password-toggle change-password-input modal-clear-val white-text"
                maxLength={16}
                autoComplete="new-password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  if (format2Error && e.target.value === password1) {
                    setFormat2Error(false);
                  }
                }}
                onFocus={() => setFocused2(true)}
                onBlur={() => setFocused2(false)}
                onKeyDown={handleInputKeyDown}
              />
              <label
                htmlFor="ChangePasswordNew2"
                className={focused2 || password2.length > 0 ? "active" : ""}
              >
                Repeat new password
              </label>
              <small
                id="ChangePasswordFormat2"
                className="form-text modal-clear-hide text-muted"
                style={{ display: format2Error ? "block" : "none" }}
              >
                Passwords do not match.
              </small>
            </div>
            <div
              className="modal-clear-hide font-size-custom text-center pb-4"
              id="ChangePasswordError"
              style={{ display: feedback ? "block" : "none" }}
            >
              {feedback && (
                <span
                  style={{
                    color: feedback.type === "error" ? "#ff6b6b" : "#4ade80",
                    fontSize: "0.85rem",
                  }}
                >
                  {feedback.text}
                </span>
              )}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center py-2">
            <button
              type="button"
              className="btn btn-danger px-3 waves-effect waves-light"
              data-dismiss="modal"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger px-3 waves-effect waves-light"
              id="ModalChangePasswordSubmit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
