import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Autofill from query parameters if present
  useEffect(() => {
    if (router.query.username || router.query.user) {
      setFormData((prev) => ({
        ...prev,
        username: router.query.username || router.query.user || "",
        password: router.query.password || "",
      }));
    }
  }, [router.query]);

  // Handle changes and clear errors when length rules are satisfied (matching original login-min.js)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username" && value.length >= 4 && value.length <= 16) {
      setErrors((prev) => ({ ...prev, username: false }));
    }
    if (name === "password" && value.length >= 6 && value.length <= 32) {
      setErrors((prev) => ({ ...prev, password: false }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;

    let hasError = false;
    const newErrors = { username: false, password: false };

    // Validations matching login-min.js:
    // a.val().length < 4 || a.val().length > 16
    if (formData.username.length < 4 || formData.username.length > 16) {
      newErrors.username = true;
      hasError = true;
    }

    // t.val().length < 6 || t.val().length > 32
    if (formData.password.length < 6 || formData.password.length > 32) {
      newErrors.password = true;
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Simulate login request or call services/login.php
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Successful redirect
      window.location.href = "/";
    } catch (err) {
      setErrorMessage("Usuario o contraseña incorrectos");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
