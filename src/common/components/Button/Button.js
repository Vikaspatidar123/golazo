import React from "react";
import styles from "./style.module.scss";
import { cn } from "@/utils/cn";

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        styles.button,
        variantClass,
        fullWidth && styles.fullWidth,
        className
      )}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      <span>{children}</span>
    </button>
  );
}
