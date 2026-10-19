import React, { useState, useEffect, useRef } from "react";
import styles from "../style.module.scss";

export default function LoginForm({
  formData,
  errors,
  loading,
  errorMessage,
  onChange,
  onSubmit,
}) {
  const userInputRef = useRef(null);
  const [userFocused, setUserFocused] = useState(false);
  const [passwdFocused, setPasswdFocused] = useState(false);

  // Focus user input on mount, matching original $(document).ready: $("#user").focus()
  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
  }, []);

  const isUserActive = userFocused || (formData.username && formData.username.length > 0);
  const isPasswdActive = passwdFocused || (formData.password && formData.password.length > 0);

  return (
    <div className={styles.view}>
      <div className={styles.mask}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={`${styles.colResponsive} mx-auto`}>
              <div className={`${styles.card} ${styles.fadeIn}`}>
                <div className={styles.cardBody}>
                  {/* Form Header with dark red-gradient */}
                  <div className={`${styles.formHeader} ${styles.redGradient}`}>
                    <h3 className={styles.headerTitle}>
                      <i className="fas fa-user"></i>Ingreso
                    </h3>
                  </div>

                  <form onSubmit={onSubmit} noValidate>
                    {/* Username Input Group */}
                    <div className={styles.mdForm}>
                      <i className={`fas fa-user ${styles.prefix}`}></i>
                      <input
                        ref={userInputRef}
                        type="text"
                        id="user"
                        name="username"
                        className={`${styles.formControl} ${
                          errors.username ? styles.invalid : ""
                        }`}
                        autoComplete="off"
                        required
                        disabled={loading}
                        value={formData.username}
                        onChange={onChange}
                        onFocus={() => setUserFocused(true)}
                        onBlur={() => setUserFocused(false)}
                      />
                      <label
                        htmlFor="user"
                        className={`${styles.formLabel} ${
                          isUserActive ? styles.active : ""
                        }`}
                      >
                        Nombre de usuario
                      </label>
                      <small
                        id="user_format"
                        className={`${styles.formText} ${
                          errors.username ? styles.visible : ""
                        }`}
                      >
                        Su nombre de usuario debe contener entre 4 y 16 caracteres.
                      </small>
                    </div>

                    {/* Password Input Group */}
                    <div className={styles.mdForm}>
                      <i className={`fas fa-lock ${styles.prefix}`}></i>
                      <input
                        type="password"
                        id="passwd"
                        name="password"
                        className={`${styles.formControl} ${
                          errors.password ? styles.invalid : ""
                        }`}
                        autoComplete="off"
                        required
                        disabled={loading}
                        value={formData.password}
                        onChange={onChange}
                        onFocus={() => setPasswdFocused(true)}
                        onBlur={() => setPasswdFocused(false)}
                      />
                      <label
                        htmlFor="passwd"
                        className={`${styles.formLabel} ${
                          isPasswdActive ? styles.active : ""
                        }`}
                      >
                        Contraseña
                      </label>
                      <small
                        id="passwd_format"
                        className={`${styles.formText} ${
                          errors.password ? styles.visible : ""
                        }`}
                      >
                        Su contraseña debe contener entre 6 y 16 caracteres.
                      </small>
                    </div>

                    {/* Error Message Box */}
                    <div className={styles.textCenter}>
                      <div
                        className={`${styles.errorDiv} ${
                          errorMessage ? styles.visible : ""
                        }`}
                        id="error"
                      >
                        {errorMessage}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className={styles.textCenter}>
                      <button
                        type="submit"
                        className={`${styles.btn} ${styles.redGradient} ${
                          styles.btnLg
                        } ${loading ? styles.disabled : ""}`}
                        id="dologin"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <i className="fa fa-spinner fa-spin"></i> Ingresar
                          </>
                        ) : (
                          "Ingresar"
                        )}
                      </button>
                    </div>

                    {/* Maintenance Text Notice (Hidden as per original HTML) */}
                    <div className={styles.maintenanceText}>
                      <div>
                        Se realizara una actualizacion del sistema el dia 29-04-2025 10:00 (UTC)
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        El servicio sera interrumpido durante aproximadamente 3 horas
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
