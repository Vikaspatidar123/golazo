import React, { useState } from "react";
import styles from "./style.module.scss";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cn";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  isRequired = false,
  showPasswordToggle = false,
  readOnly = false,
  leftIcon = null,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password" || showPasswordToggle;
  const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn(styles.inputGroup, className)}>
      {label && (
        <div className={styles.labelWrapper}>
          <label htmlFor={name} className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        </div>
      )}

      <div className={styles.inputWrapper}>
        {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}

        <input
          id={name}
          name={name}
          type={currentType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(
            styles.input,
            error && styles.hasError,
            leftIcon && styles.withLeftIcon,
            showPasswordToggle && styles.withRightIcon
          )}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className={styles.iconRight}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
