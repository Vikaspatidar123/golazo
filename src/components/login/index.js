import React from "react";
import styles from "./style.module.scss";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";

export default function LoginView() {
  const {
    formData,
    errors,
    loading,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className={styles.loginPage}>
      <LoginForm
        formData={formData}
        errors={errors}
        loading={loading}
        errorMessage={errorMessage}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
